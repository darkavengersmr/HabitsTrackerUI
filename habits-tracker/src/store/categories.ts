import { makeAutoObservable } from "mobx"
import { ICategory } from "../interfaces/interface"

const initialCategories: ICategory[] = [    
    {id: 0, title: "Фитнес", file: "fitness" },
    {id: 1, title: "Чтение", file: "books" },
    {id: 2, title: "Здоровье", file: "health" },
    {id: 3, title: "Другое", file: "meditation" },
]

class Categories {
    data: ICategory[] = initialCategories

    constructor() {
        makeAutoObservable(this)
    }    
}

export default new Categories()