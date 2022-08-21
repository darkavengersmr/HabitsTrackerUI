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

    getCategories = (): {[key: string]: string} => {
        let res: {[key: string]: string} = {'all': 'Все категории'}
        this.data.map(el => res[el.file] = el.title)        
        return res        
    }
}

export default new Categories()