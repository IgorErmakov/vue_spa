import { reactive } from 'vue'
import axios from "axios";

interface Items {
    items: Item[]
    addItem: (name: string) => void,
    setItems: (items: Item[]) => void,
    deleteItem: (id: number) => void,
    toggleCompleted: (id: number) => void,
    processing: boolean
}
interface Item {
    id: number
    item: string
    completed: boolean
}

export const store: Items = reactive({
    items: [] as Item[],
    processing: false as boolean,
    async addItem(name: string) {
        console.log(name)
        this.processing = true
        const item: Item = {id: 0, item: name, completed: false}
        this.items.push(item)

        const response = await axios.post('http://localhost:8000/api/todo', item)
        console.log(this.items)
        this.processing = false
    },
    setItems(items: Item[]) {
        this.items = items
    },
    async deleteItem(id: number) {
        this.items = this.items.filter((itm: Item) => itm.id !== id)
        this.processing = false
        await axios.delete('http://localhost:8000/api/todo/' + id)
    },
    async toggleCompleted(id: number) {
        console.log(id)
        this.processing = false
        const item: Item[] = this.items.filter((itm: Item) => itm.id === id)
        item[0].completed = !item[0].completed
        await axios.put('http://localhost:8000/api/todo/' + id)
    }
})