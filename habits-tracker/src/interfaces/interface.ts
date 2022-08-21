export interface ITracker {
    [key: string]: number    
}

export interface IHabit {
    id: number
    title: string
    category: string
    tracker: {
        [key: string]: number
    }
}

export interface ICategory {
    id: number
    title: string
    file: string    
}

export interface ICatalog {
    id: number
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