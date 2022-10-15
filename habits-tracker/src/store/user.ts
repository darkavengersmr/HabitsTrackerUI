import { makeAutoObservable, runInAction } from "mobx"
import { IUser, IUserClass } from "../interfaces/interface"

const initialUser: IUser = {
    id: "",
    username: "",
    email: "",
    token: "",
    isLogIn: false
}

class User implements IUserClass {
    data: IUser = {} as IUser

    constructor() {
        makeAutoObservable(this)
        try {
            this.data = JSON.parse(localStorage.getItem('habits-tracker-user') || "") as IUser
        }
        catch {
            this.data = initialUser
        }
    }

    async login (username: string, password: string): Promise<boolean> {    
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: username, password})
          });
          if (response.ok) {                      
            const data = await response.json()
            runInAction(() => {
              this.data.isLogIn = true  
              this.data.token = data.token
              this.getUserInfo()
            })
            return true
          } else {
            this.logout()
            return false
          }                    
    }

    logout() {
        this.data.isLogIn = false
        localStorage.removeItem('habits-tracker-user')
    }

    async register (username: string, email: string, password: string): Promise<boolean> {
      if (!username || !email || !password) return false
      const response = await fetch('/api/registration', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, email, password})
        });
        if (response.ok) {          
          const data = await response.json()
          runInAction(() => {
            this.data.isLogIn = true  
            this.data.token = data.token
            this.getUserInfo()            
          })           
          return true
        } else {
          this.logout()
          return false
        }                    
    }

    async getUserInfo(): Promise<boolean> {
        const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.data.token}`
            }            
          });
          if (response.ok) {
            const data = await response.json();
            runInAction(() => {
              this.data = {...this.data, ...data}
              localStorage.setItem('habits-tracker-user', JSON.stringify(this.data));
            })
            return true            
          } else if (response.status === 401) {
            runInAction(() => {
              this.data.isLogIn = false
              localStorage.removeItem('habits-tracker-user')          
            })
          }
          return false
    }
}

export default new User()