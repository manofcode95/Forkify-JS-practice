import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import { element, showWaitingIcon, delWaitingIcon } from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
let aaa = 123
let state = {
    //1. Search object

    //2. Current recipe

    //3. Shopping list

    //4. Liked recipes
}
/**
 * Search Controller
 */
const searchController = async () => {
    //1. Get query
    // let query = searchView.getInput()
    let query = 'pizza'
    if (query) {
        //2. Create search object
        state.search = new Search(query)
        //3. Prepare UI
        searchView.clearInput()
        searchView.clearRecipes()
        showWaitingIcon(element.resContainer)
        try {
            //4. Get recipes
            await state.search.getResults()
            //5. Show UI
            delWaitingIcon(element.resContainer)
            searchView.showAllRecipes(state.search.result)
        } catch (error) {
            alert('Processing result error')
            delWaitingIcon(element.resContainer)
        }
    }
}

element.searchSubmit.addEventListener('submit', event => {
    event.preventDefault()
    searchController()
})

element.resPage.addEventListener('click', event => {
    searchView.clearRecipes()
    let gotoPage = parseInt(event.target.closest('.btn-inline').dataset.goto, 10)
    searchView.showAllRecipes(state.search.result, gotoPage)
})


/**
 * Recipe Controller
 */
const recipeController = async (event) => {
    // 1. Get ID
    let recipeId;
    if (event.target.matches('.results__link, .results__link *')) {
        recipeId = event.target.closest('.results__link').dataset.id
    } else if (event.target.matches('.likes__link, .likes__link *')) {
        recipeId = event.target.closest('.likes__link').dataset.id
    }


    if (recipeId) {
        // 2. Create recipe object
        recipeView.hightLightSelected(recipeId)
        state.recipe = new Recipe(recipeId)
        try {
            // 3. Prepare UI
            recipeView.clearRecipe()
            showWaitingIcon(element.recipeContainer)

            // 4. Get data
            await state.recipe.getRecipe()
            state.recipe.calcTime()
            state.recipe.calcServing()
            state.recipe.parseIngredients()
            window.r = state.recipe
            // 5. Render UI
            delWaitingIcon(element.recipeContainer)
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(recipeId))
        } catch (error) {
            alert('Processing recipe error')
            console.log(error)
        }
    }
}
// element.resultsList
element.resultsList.addEventListener('click', event => {
    event.preventDefault()
    recipeController(event)
})

element.recipeContainer.addEventListener('click', event => {
    if (event.target.matches('.btn-inc, .btn-inc *')) {
        state.recipe.updateServing('inc')
        recipeView.renderNewServing(state.recipe)
    }
    if (event.target.matches('.btn-dec, .btn-dec *')) {
        if (state.recipe.serving > 1) {
            state.recipe.updateServing('dec')
            recipeView.renderNewServing(state.recipe)
        }
    }
})

/**
 * List Controller
 */
state.list = new List()
element.recipeContainer.addEventListener('click', () => {
    if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        state.recipe.ingredients.forEach(el => {
            let item = state.list.addItem(el.count, el.unit, el.ingredient)
            listView.renderList(item)
        })
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        likesController()
    }
})

element.shoppingList.addEventListener('click', event => {
    let element = event.target.closest('.shopping__item')
    let listId = element.dataset.id

    if (listId) {
        if (event.target.matches('.shopping__delete, .shopping__delete *')) {
            state.list.deleteItem(listId)
            listView.deleteList(listId)
        }
        else if (event.target.matches('.shoppingList-item')) {
            let newCount = parseFloat(event.target.value, 10)
            window.el = element
        }
    }
})

/**
 * Like Controller
 */
const likesController = () => {
    let currentId = state.recipe.id
    // If not liked yet
    if (!state.likes.isLiked(currentId)) {
        // 1.Add to likes list
        let likedItem = state.likes.addLike(state.recipe)
        // 2. Highlight icon
        likesView.toggleLikeBtn(true)
        element.likesContainer.style.visibility = state.likes.getNumLike() > 0 ? 'visible' : 'hidden'
        // 3. Show UI
        likesView.renderLikes(likedItem)

    } else { // If already liked   
        // 1. Delete from the liked list
        state.likes.deleteLike(state.recipe.id)
        // 2. Unhighlight icon
        likesView.toggleLikeBtn(false)
        element.likesContainer.style.visibility = state.likes.getNumLike() > 0 ? 'visible' : 'hidden'
        // 3. Delete UI
        likesView.deleteLikes(state.recipe.id)
    }

}

element.likesContainer.addEventListener('click', event => {
    event.preventDefault()
    recipeController(event)
})

window.addEventListener('load', event => {
    state.likes = new Likes()
    let persistStorage = localStorage.getItem('likes')
    if (persistStorage) {
        state.likes.likes = JSON.parse(persistStorage)
        element.likesContainer.style.visibility = state.likes.getNumLike() > 0 ? 'visible' : 'hidden'
        if (state.likes.likes) {
            state.likes.likes.forEach(el => likesView.renderLikes(el))
        }
    }
})
window.state = state


