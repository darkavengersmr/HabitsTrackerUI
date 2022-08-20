import { makeAutoObservable } from "mobx"
import { IHabit } from "../interfaces/interface"
import {dateNow} from "../helpers/helpers"

const initialhabits: IHabit[] = [
    {id: 0, title: "Встать до 6 утра", category: "meditation", tracker: { "2022-08-05": 3, "2022-08-07": 3} },
    {id: 1, title: "Пройти 10000 шагов", category: "fitness", tracker: { "2022-08-05": 4, "2022-08-07": 4} },
    {id: 2, title: "Читать 20 страниц", category: "books", tracker: { "2022-08-05": 5, "2022-08-06": 5, "2022-08-07": 2} },
    {id: 3, title: "Гимнастика для глаз", category: "health", tracker: { "2022-08-05": 5, "2022-08-07": 4} },
]

interface IEditHabit {
    title: string,
    category: string
}

class habits {
    data: IHabit[] = []

    constructor() {
        makeAutoObservable(this)
        try {
            this.data = JSON.parse(localStorage.getItem('habits-tracker-habits') || "") as IHabit[]
        }
        catch {
            this.data = initialhabits
        }
        
    }

    addHabit(habit: IHabit): void {
        this.data.push(habit)
        localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));
    }
    
    removeHabit(id: number): void {
        this.data = this.data.filter((habit) => {return habit.id !== id})
        localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));
    }

    editHabit(id: number, newData: IEditHabit): void {
        this.data.forEach((habit) => {
            if (habit.id === id) {
                habit.title = newData.title
                habit.category = newData.category
            }
        })        
        localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));
    }
    
    habitById(id: number): IHabit {
        const habit = this.data.find((el) => el.id === id)        
        if (habit) return habit
        else return {} as IHabit
    }

    setRating(id: number, rating: number): void {

        this.data.forEach((habit) => {
            if (habit.id === id) habit.tracker[dateNow(0)] = rating
        })
        localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));
    }

    daysWithoutPass(id: number): number {
        let bias = -1
        const index = this.data.findIndex(el => el.id === id)
        let result = 0

        while(true) {
            if (this.data[index].tracker[dateNow(bias)]) {
                result++
                bias--
            } else {
                break
            }
        }

        if (this.data[index].tracker[dateNow(0)]) result++

        return result;
    }
}

export default new habits()