import axios from 'axios'
import { key, proxy } from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id
    }
    async getRecipe() {
        try {
            const recipe = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
            this.image = recipe.data.recipe.image_url
            this.ingredients = recipe.data.recipe.ingredients
            this.publisher = recipe.data.recipe.publisher
            this.title = recipe.data.recipe.title
            this.source_url = recipe.data.recipe.source_url
        } catch (error) {
            alert(error)
        }
    }
    parseIngredients() {
        let longUnit = ['cups', 'teaspoons', 'teaspoon', 'jars', 'packages', 'ounces', 'ounce', 'tablespoons', 'tablespoon', 'slices', 'wholes']
        let shortUnit = ['cup', 'ts', 'ts', 'jar', 'package', 'oz', 'oz', 'tbsp', 'tbsp', 'slice', 'whole']
        let allUnit = [...shortUnit, 'g', 'kg']
        let newIngredient = this.ingredients.map(el => {
            let ingredient = el.toLowerCase()
            // 1. apply short unit
            longUnit.forEach((el2, index) => {
                ingredient = ingredient.replace(el2, shortUnit[index])
            })

            // 2. Remove characters betweern parenthesses
            ingredient = ingredient.replace(/ *\([.\w\s]+\)/g, '')

            // 3. Parse ingredient into count, unit, ingredient
            let objIng;

            let splitIng = ingredient.split(' ')
            let match = splitIng.findIndex(el => allUnit.includes(el))
            if (match === -1) {
                if (parseInt(splitIng[0], 10)) {
                    objIng = {
                        count: eval(ingredient.match(/^[\d\s/-]+/)[0].replace('-', '+')),
                        unit: '',
                        ingredient: ingredient.match(/[a-zA-Z]+/g)[0]
                    }
                } else {
                    objIng = {
                        count: 1,
                        unit: '',
                        ingredient
                    }
                }
            } else if (match > -1) {
                objIng = {
                    count: parseInt(splitIng[0], 10) ? eval(splitIng.slice(0, match).join(' ').replace(/[ -]/, '+')) : 1,
                    unit: splitIng[match],
                    ingredient: splitIng.splice(match + 1).join(' ')
                }
            }
            return objIng
        })
        this.ingredients = newIngredient
    }

    calcTime() {
        const period = Math.ceil(this.ingredients.length / 3)
        this.time = period * 15
    }
    calcServing() {
        this.serving = 4
    }
    updateServing(type) {
        let newServing = type === 'inc' ? this.serving + 1 : this.serving - 1
        this.ingredients.forEach(el => {
            el.count *= newServing / this.serving
        })
        this.serving = newServing
    }
}

