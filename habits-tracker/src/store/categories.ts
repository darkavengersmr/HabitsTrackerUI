import { makeAutoObservable, runInAction } from "mobx"
import { ICategory } from "../interfaces/interface"
import user from "./user"

const initialCategories: ICategory[] = [    
    {_id: "0", title: "Фитнес", file: "fitness" },
    {_id: "1", title: "Чтение", file: "books" },
    {_id: "2", title: "Здоровье", file: "health" },
    {_id: "3", title: "Медитация", file: "meditation" },
]

class Categories {
    data: ICategory[] = []

    constructor() {
        makeAutoObservable(this)
        try {
            this.data = JSON.parse(localStorage.getItem('habits-tracker-categories') || "") as ICategory[]
        }
        catch {
            this.data = [] as ICategory[]
        }
        
    }    

    getCategories = async (): Promise<{[key: string]: string}> => {        
        if (this.data.length === 0) {
            await this.updateCategories()
        } 
        let res: {[key: string]: string} = {'all': 'Все категории'}
        this.data.map(el => res[el.file] = el.title)        
        return res    
                       
    }

    updateCategories = async () => {
        const response = await fetch('/api/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.data.token}`
            }            
            });
            if (response.ok) {
            const data: ICategory[] = await response.json();
            runInAction(() => {
                this.data = data.map(el => {return {_id: el._id, 
                                                    title: el.title, 
                                                    file: el.file.trim()
                                    }})                
            })                
            localStorage.setItem('habits-tracker-categories', JSON.stringify(this.data));
                        
            } else if (response.status === 401) {
            user.logout()         
            } else if (this.data.length === 0) {
                runInAction(() => {
                    this.data = initialCategories
                })
            }             
    }
}

export default new Categories()