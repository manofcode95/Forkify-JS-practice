import { element, elementString } from "./base";
import * as math from 'mathjs'


export const clearRecipe = () => {
    element.recipeContainer.innerHTML = ''
}
export const hightLightSelected = id => {
    document.querySelectorAll(`.${elementString.resultLinkActive}`).forEach(el => el.classList.remove(`${elementString.resultLinkActive}`))
    document.querySelector(`a[data-id="${id}"]`).classList.add('results__link--active')
}
const renderCount = num => {
    if (num) {
        // 1 2.5 1.333
        let fracNum = math.fraction(num)
        if (fracNum.n < fracNum.d) return `${fracNum.n}/${fracNum.d}`
        if (fracNum.d === 1) return `${fracNum.n}`
        if (fracNum.n > fracNum.d) return `${Math.floor(fracNum.n / fracNum.d)} ${fracNum.n % fracNum.d}/${fracNum.d}`
    }
    return num
}

export const renderNewServing = recipe => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.serving
    document.querySelectorAll('.recipe__count').forEach((el, index) => {
        console.log(recipe.ingredients[index])
        el.textContent = renderCount(recipe.ingredients[index].count)

    })
}

const renderIngredient = ingridients => {
    let allMarkup = '';
    ingridients.forEach(el => {
        let ingMarkup = `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${renderCount(el.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${el.unit}</span>
                ${el.ingredient}
            </div>
        </li>
        `
        allMarkup += ingMarkup
    })
    return allMarkup
}

export const renderRecipe = (recipe, isLiked) => {
    let markupRecipe = `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.serving}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-dec">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-inc">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg >
            </button >
        </div >



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${renderIngredient(recipe.ingredients)}
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
            </p>
        <a class="btn-small recipe__btn" href="${recipe.source_url}"
            target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `
    element.recipeContainer.insertAdjacentHTML('beforeend', markupRecipe)
}