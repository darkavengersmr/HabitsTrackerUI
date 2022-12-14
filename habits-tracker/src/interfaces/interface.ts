export interface ITracker {
    [key: string]: number    
}

export interface IHabit {
    _id: string
    title: string
    category: string
    tracker: {
        [key: string]: number
    }
}

export interface ICategory {
    _id: string
    title: string
    file: string    
}

export interface ICatalog {
    _id: string
    title: string
    category: string 
    detail: string       
}

export interface IChartData {    
    label: string
    data: {
        primary: string
        secondary: number
    }[]
    [key: string]: any
}

export interface IUser {
    id: string
    username: string
    email: string
    token: string
    isLogIn: boolean
}

export interface IUserClass {
    data: IUser
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
    getUserInfo: () => Promise<boolean>
}

export interface IEditHabit {
    title?: string,
    category?: string
    tracker?: {
        [key: string]: number
    }
}