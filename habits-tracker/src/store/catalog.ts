import { makeAutoObservable, runInAction } from "mobx"
import { ICatalog } from "../interfaces/interface"
import user from "./user"

const initialCatalog: ICatalog[] = [    
    {_id: "0", title: "Не забудь про зарядку", category: "fitness", detail: "Посвятите первые 10 минут с утра зарядке. Оживлённая прогулка или 10-минутный комплекс упражнений — идеальный способ ускорить метаболизм" },
    {_id: "1", title: "Почитай вслух", category: "books", detail: "Читайте вслух. Запишите основные моменты на диктофон и прослушивайте запись перед сном" },
    {_id: "2", title: "Не пей кофе после обеда", category: "health", detail: "Не употребляйте напитки с высоким содержанием кофеина после 14:00" },
    {_id: "3", title: "Позитивное общение", category: "meditation", detail: "Общайтесь с позитивными людьми"},
    {_id: "4", title: "Запиши, что у тебя хорошего", category: "meditation", detail: "Ежедневно записывайте три хорошие вещи, которые случились с вами за день"},
    {_id: "5", title: "Удели время своему проекту", category: "meditation", detail: "Посвятите некоторое время перед сном работе над своим творческим проектом. Это также поможет расслабиться"},
    {_id: "6", title: "Не захламляй пространство", category: "meditation", detail: "Всегда возвращайте вещи на их места. Каждый день выбрасывайте хотя бы один ненужный предмет, чтобы не накапливать хлам"},
    {_id: "7", title: "Не забывай про зубную нить", category: "health", detail: "Пользуйтесь зубной нитью"},
]

class Catalog {
    data: ICatalog[] = []

    constructor() {
        makeAutoObservable(this)
        try {
            this.data = JSON.parse(localStorage.getItem('habits-tracker-catalog') || "") as ICatalog[]
        }
        catch {
            this.data = [] as ICatalog[]
        }
        
    }
    
    getFilteredByCategory(category: string) : ICatalog[] {
        if (category === 'all') return this.data
        return this.data.filter((el) => el.category === category)
    }

    getDescriptionByTitle(title: string) : string {        
        return this.data.find((el) => el.title === title)?.detail || ""
    }

    updateCatalog = async () => {
        const response = await fetch('/api/catalog', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.data.token}`
            }            
            });
            if (response.ok) {
            const data: ICatalog[] = await response.json();
            runInAction(() => {
                this.data = data.map(el => {return {_id: el._id, 
                                            title: el.title, 
                                            category: el.category.trim(), 
                                            detail: el.detail
                                        }})
            })                
            localStorage.setItem('habits-tracker-catalog', JSON.stringify(this.data));
                        
            } else if (response.status === 401) {
            user.logout()         
            } else if (this.data.length === 0) {
                runInAction(() => {
                    this.data = initialCatalog
                })
            }
    }
}

export default new Catalog()