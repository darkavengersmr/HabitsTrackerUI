import { makeAutoObservable } from "mobx"
import { ICatalog } from "../interfaces/interface"

const initialCatalog: ICatalog[] = [    
    {id: 0, title: "Не забудь про зарядку", category: "fitness", detail: "Посвятите первые 10 минут с утра зарядке. Оживлённая прогулка или 10-минутный комплекс упражнений — идеальный способ ускорить метаболизм" },
    {id: 1, title: "Почитай вслух", category: "books", detail: "Читайте вслух. Запишите основные моменты на диктофон и прослушивайте запись перед сном" },
    {id: 2, title: "Не пей кофе после обеда", category: "health", detail: "Не употребляйте напитки с высоким содержанием кофеина после 14:00" },
    {id: 3, title: "Позитивное общение", category: "meditation", detail: "Общайтесь с позитивными людьми"},
    {id: 4, title: "Запиши, что у тебя хорошего", category: "meditation", detail: "Ежедневно записывайте три хорошие вещи, которые случились с вами за день"},
    {id: 5, title: "Удели время своему проекту", category: "meditation", detail: "Посвятите некоторое время перед сном работе над своим творческим проектом. Это также поможет расслабиться"},
    {id: 6, title: "Не захламляй пространство", category: "meditation", detail: "Всегда возвращайте вещи на их места. Каждый день выбрасывайте хотя бы один ненужный предмет, чтобы не накапливать хлам"},
    {id: 7, title: "Не забывай про зубную нить", category: "meditation", detail: "Пользуйтесь зубной нитью"},
]

class Catalog {
    data: ICatalog[] = initialCatalog

    constructor() {
        makeAutoObservable(this)
    }    
}

export default new Catalog()