import { makeAutoObservable } from "mobx"
import { IHabbit } from "../interfaces/interface"

const initialHabbits: IHabbit[] = [
    {id: 0, title: "Встать до 6 утра", category: "Здоровье", tracker: { "2022-08-05": 3, "2022-08-06": 3} },
    {id: 1, title: "Пройти 10000 шагов", category: "Здоровье", tracker: { "2022-08-05": 4, "2022-08-06": 4} },
    {id: 2, title: "Отжиматься N раз", category: "Здоровье", tracker: { "2022-08-05": 5, "2022-08-06": 5} },
]

class Habbits {
    data: IHabbit[] = initialHabbits // []

    constructor() {
        makeAutoObservable(this)
    }

    addHabbit(habbit: IHabbit): void {
        this.data.push(habbit)
    }
    
    removeHabbit(id: number): void {
        this.data = this.data.filter((habbit) => {return habbit.id !== id})
    }
}

export default new Habbits()