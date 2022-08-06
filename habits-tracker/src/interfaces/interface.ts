export interface ITracker {
    [key: string]: number    
}

export interface IHabbit {
    id: number
    title: string
    category: string
    tracker: {
        [key: string]: number
    }
}
