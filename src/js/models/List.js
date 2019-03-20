import uniqid from 'uniqid'
export default class List {
    constructor() {
        this.items = []
    }
    addItem(count, unit, ingredient) {
        let item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item)
        return item
    }
    deleteItem(id) {
        let index = this.items.findIndex(el => el.id === id)
        this.items.splice(index, 1)
    }
    addCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount
    }
}