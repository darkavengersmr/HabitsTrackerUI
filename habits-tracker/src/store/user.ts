import { makeAutoObservable } from "mobx"
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
            body: JSON.stringify({email: username, password: password})
          });
          if (response.ok) {
            this.data.isLogIn = true
            const data = await response.json()
            this.data.token = data.token
            this.getUserInfo()
            return true
          } else {
            this.data.isLogIn = false
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
            this.data = {...this.data, ...data}
            localStorage.setItem('habits-tracker-user', JSON.stringify(this.data));
            return true            
          } else if (response.status === 401) {
            this.data.isLogIn = false
            localStorage.removeItem('habits-tracker-user')          
          }
          return false
    }
}

export default new User()