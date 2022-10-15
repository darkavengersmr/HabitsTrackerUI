import { makeAutoObservable, runInAction } from "mobx"
import { dateNow, resultToPercentage } from "../helpers/helpers"
import { IChartData, IHabit, IEditHabit } from "../interfaces/interface"
import user from "./user"

/*
const initialHabits: IHabit[] = [
    { _id: "0", 
      title: "Встать до 6 утра", 
      category: "meditation", 
      tracker: 
                { 
                "2022-09-15": 3, 
                "2022-09-16": 5,  
                "2022-09-17": 4,
                "2022-09-18": 4, 
                "2022-09-19": 5, 
                "2022-09-20": 5, 
                "2022-09-21": 4, 
                "2022-09-22": 3, 
                "2022-09-23": 3, 
                "2022-09-24": 4,
                "2022-09-25": 4, 
                "2022-09-26": 5, 
                "2022-09-27": 5, 
                "2022-09-28": 5, 
                "2022-09-29": 4,
                "2022-09-30": 5,
                } 
    },
    { _id: "1", 
      title: "Пройти 10000 шагов", 
      category: "fitness", 
      tracker: 
                {               
                "2022-09-18": 1, 
                "2022-09-19": 1, 
                "2022-09-20": 2, 
                "2022-09-21": 3, 
                "2022-09-22": 4, 
                "2022-09-23": 3, 
                "2022-09-24": 5,
                "2022-09-25": 3, 
                "2022-09-26": 5, 
                "2022-09-27": 4, 
                "2022-09-28": 3, 
                "2022-09-29": 5,
                "2022-09-30": 5,
                } 
    },
    { _id: "2", 
      title: "Читать 20 страниц", 
      category: "books", 
      tracker: 
                { 
                "2022-09-26": 2,
                "2022-09-27": 3, 
                "2022-09-28": 4, 
                "2022-09-29": 4,
                "2022-09-30": 5,
                } 
},
    { _id: "3", 
      title: "Гимнастика для глаз", 
      category: "health", 
      tracker: 
                {                 
                "2022-09-20": 1,
                "2022-09-21": 2,                 
                "2022-09-22": 3, 
                "2022-09-23": 5, 
                "2022-09-24": 4,
                "2022-09-25": 5, 
                "2022-09-26": 4, 
                "2022-09-27": 4, 
                "2022-09-28": 5, 
                "2022-09-29": 5,
                "2022-09-30": 5,
                } 
    },
]
*/ 

class Habits {
    data: IHabit[] = []

    constructor() {
        makeAutoObservable(this)
        try {
            this.data = JSON.parse(localStorage.getItem('habits-tracker-habits') || "") as IHabit[]
        }
        catch {
            this.data = [] as IHabit[]
        }
        
    }

    async getHabits(): Promise<IHabit[]> {
        if (this.data.length === 0) {
            const response = await fetch('/api/habits', {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${user.data.token}`
                }            
              });
              if (response.ok) {
                const data = await response.json();
                runInAction(() => {
                    this.data = data
                })                
                localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));
                           
              } else if (response.status === 401) {
                user.logout()         
              }              
        }
        return this.data
    }

    async addHabit(title: string, category: string) {
        const tracker = {}
        Object.assign(tracker, {[dateNow(0)]: 0});        

        const response = await fetch('/api/habit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.data.token}`
            },
            body: JSON.stringify({title, category, tracker, user_id: user.data.id})
          });
          if (response.ok) {                
            const {_id} = await response.json()            
            runInAction(() => {                
                
                this.data.push({_id, title, category, tracker})
                localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));
                
            })                        
          }         
    }
    
    async removeHabit(id: string) {        
        const response = await fetch(`/api/habit/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',                
                'Authorization': `Bearer ${user.data.token}`
            },
            
          });
          if (response.ok) {                                    
            runInAction(() => {                
                this.data = this.data.filter(habit => habit._id !== id)                
                localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));                                    
            })                        
          }          
    }

    async editHabit(id: string, newData: IEditHabit) {
        const habit = this.habitById(id)
        const response = await fetch(`/api/habit/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.data.token}`
            },
            body: JSON.stringify({title: newData.title, 
                                  category: newData.category, 
                                  tracker: {...habit.tracker, ...newData.tracker},
                                  user_id: user.data.id
                                })
          });
          if (response.ok) {                
                    
            runInAction(() => {                
                this.data.forEach((habit) => {
                    if (habit._id === id) {
                        if (newData.title) habit.title = newData.title
                        if (newData.category) habit.category = newData.category
                        if (newData.tracker) habit.tracker = {...habit.tracker, ...newData.tracker}
                    }
                })        
                localStorage.setItem('habits-tracker-habits', JSON.stringify(this.data));                            
            })                        
          }
    }
    
    habitById(id: string): IHabit {
        const habit = this.data.find((el) => el._id === id)        
        if (habit) return habit
        else return {} as IHabit
    }

    chartData(id: string): IChartData[] {
        const habit = this.data.find((el) => el._id === id) || 
                      {_id: "0", title: "нет данных", category: "нет данных", tracker: { "нет данных": 0} }
        
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
            const habit = this.data.find((el) => el._id === i.toString()) || 
                      {_id: "0", title: "нет данных", category: "нет данных", tracker: { "нет данных": 0} }
                      const arr = Object.keys(habit.tracker).map((el) => ({primary: el, 
                        secondary: resultToPercentage(habit.tracker[el])}))
            chartData.push({            
            label: habit.title,
            data: arr,  
            })
        }        
        return chartData as IChartData[];
    }

    async setRating(id: string, rating: number) {
            const tracker = {}
            Object.assign(tracker, {[dateNow(0)]: rating}); 
            await this.editHabit(id, {tracker: tracker})                  
    }

    lastDaysWithoutPass(id: string): number {
        let bias = -1
        const index = this.data.findIndex(el => el._id === id)        
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

    maxDaysWithoutPass(id: string): number {        
        const index = this.data.findIndex(el => el._id === id)
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

export default new Habits()