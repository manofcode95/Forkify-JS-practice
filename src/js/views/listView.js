import { element } from './base'
export const renderList = ingredient => {
    let listMarkup = `
    <li class="shopping__item" data-id=${ingredient.id}>
        <div class="shopping__count">
            <input type="number" value="${ingredient.count}" step="${ingredient.count}" class="shoppingList-item">
            <p>${ingredient.unit}</p>
        </div>
        <p class="shopping__description">${ingredient.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `
    element.shoppingList.insertAdjacentHTML('afterbegin', listMarkup)
}

export const deleteList = id => {
    let item = document.querySelector(`li[data-id=${id}`)
    item.parentElement.removeChild(item)
}