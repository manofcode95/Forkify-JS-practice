import axios from 'axios'
import { key, proxy } from '../config'
export default class Search {
    constructor(query) {
        this.query = query
    }
    async getResults() {
        try {
            let recipes = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = recipes.data.recipes
        } catch (error) {
            alert(error)
        }

    }
}
