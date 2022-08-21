import { makeAutoObservable } from "mobx"
import { IHabit } from "../interfaces/interface"
import {dateNow} from "../helpers/helpers"
import { IChartData } from "../interfaces/interface"
import { resultToPercentage } from "../helpers/helpers"

const initialhabits: IHabit[] = [
    {id: 0, title: "Встать до 6 утра", category: "meditation", tracker: { "2022-08-05": 3, "2022-08-07": 3} },
    {id: 1, title: "Пройти 10000 шагов", category: "fitness", tracker: { "2022-08-05": 1, "2022-08-06": 4, "2022-08-07": 3, "2022-08-08": 5, "2022-08-09": 4, "2022-08-10": 3, "2022-08-11": 5, "2022-08-12": 4, "2022-08-13": 3, "2022-08-14": 5} },
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

    chartData(id: number): IChartData[] {
        const habit = this.data.find((el) => el.id === id) || 
                      {id: 0, title: "нет данных", category: "нет данных", tracker: { "нет данных": 0} }
        
        const arr = Object.keys(habit.tracker).map((el) => ({primary: el, 
                                                             secondary: resultToPercentage(habit.tracker[el])}))
        let chartData = [{            
            label: habit.title,
            data: arr,  
        }]
        return chartData as IChartData[];
    }

    chartAllData(): IChartData[] {
        let chartData = []
        for (let i=0; i<this.data.length; i++) {
            const habit = this.data.find((el) => el.id === i) || 
                      {id: 0, title: "нет данных", category: "нет данных", tracker: { "нет данных": 0} }
                      const arr = Object.keys(habit.tracker).map((el) => ({primary: el, 
                        secondary: resultToPercentage(habit.tracker[el])}))
            chartData.push({            
            label: habit.title,
            data: arr,  
            })
        }        
        return chartData as IChartData[];
    }

    setRating(id: number, rating: number): void {

        this.data.forEach((habit) => {
            if (habit.id === id) habit.tracker[dateNow(0)] = rating
        })
        localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));
    }

    lastDaysWithoutPass(id: number): number {
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

    maxDaysWithoutPass(id: number): number {        
        const index = this.data.findIndex(el => el.id === id)
        let result = 0
        let record = 0
        
        for (let bias=-1; bias>-365; bias--) {
            if (this.data[index].tracker[dateNow(bias)]) {
                result++                
            } else {
                if (result > record) record = result
                result = 0
            }
        }

        if (this.data[index].tracker[dateNow(0)]) record++

        return record
    }

}

export default new habits()