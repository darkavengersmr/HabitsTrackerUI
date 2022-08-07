import { makeAutoObservable } from "mobx"
import { IHabbit } from "../interfaces/interface"
import dateNow from "../helpers/helpers"

const initialHabbits: IHabbit[] = [
    {id: 0, title: "Встать до 6 утра", category: "meditation", tracker: { "2022-08-05": 3, "2022-08-07": 3} },
    {id: 1, title: "Пройти 10000 шагов", category: "fitness", tracker: { "2022-08-05": 4, "2022-08-07": 4} },
    {id: 2, title: "Читать 20 страниц", category: "books", tracker: { "2022-08-05": 5, "2022-08-06": 5, "2022-08-07": 2} },
    {id: 3, title: "Гимнастика для глаз", category: "health", tracker: { "2022-08-05": 5, "2022-08-07": 4} },
]

class Habbits {
    data: IHabbit[] = []

    constructor() {
        makeAutoObservable(this)
        try {
            this.data = JSON.parse(localStorage.getItem('habbits-tracker-habbits') || "") as IHabbit[]
        }
        catch {
            this.data = initialHabbits
        }
        
    }

    addHabbit(habbit: IHabbit): void {
        this.data.push(habbit)
        localStorage.setItem('habbits-tracker-habbits', JSON.stringify(this.data));
    }
    
    removeHabbit(id: number): void {
        this.data = this.data.filter((habbit) => {return habbit.id !== id})
        localStorage.setItem('habbits-tracker-habbits', JSON.stringify(this.data));
    }

    setRating(id: number, rating: number): void {
        this.data.map((habbit) => {
            if (habbit.id === id) habbit.tracker[dateNow(0)] = rating
        })
        localStorage.setItem('habbits-tracker-habbits', JSON.stringify(this.data));
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

export default new Habbits()