import { element, elementString } from './base'

export const clearInput = () => { element.searchInput.value = '' }
export const clearRecipes = () => {
    element.resultsList.innerHTML = ''
    element.resPage.innerHTML = ''
}
export const getInput = () => element.searchInput.value

const limitTitleRecipe = (title, limit) => {
    if (title.length > limit) {
        let newTitle = []
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur)
                return acc + cur.length
            }
        }, 0)
        return `${newTitle.join(' ')}...`
    }
    return title
}



const showRecipe = recipe => {
    const markup = `
    <li>
        <a class=${elementString.resultLink} href="#" data-id="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="#">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitleRecipe(recipe.title, 17)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
    element.resultsList.insertAdjacentHTML('beforeend', markup)
}


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'next' ? page + 1 : page - 1}>
        <span>Page ${type === 'next' ? page + 1 : page - 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left'}"></use>
        </svg>      
    </button >
`

const renderButtons = (page, resultPerPage, totalResults) => {
    let pages = Math.ceil(totalResults / resultPerPage)
    let btnMarkup;
    if (page === 1 && pages > 1) {
        // add next-page btn
        btnMarkup = createButton(page, 'next')
    } else if (page > 1 && page < pages) {
        // add next-page, prev-page btns
        btnMarkup = `${createButton(page, 'next')} ${createButton(page, 'prev')}`

    } else if (page === pages && pages > 1) {
        // add prev-page btn
        btnMarkup = createButton(page, 'prev')
    }
    element.resPage.insertAdjacentHTML('afterBegin', btnMarkup)
}

export const showAllRecipes = (recipes, page = 1, resultPerPage = 10) => {
    let start = (page - 1) * 10
    let end = page * 10

    recipes.slice(start, end).forEach(showRecipe)
    renderButtons(page, resultPerPage, recipes.length)
}