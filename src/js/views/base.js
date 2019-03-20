export const element = {
    searchInput: document.querySelector('.search__field'),
    searchSubmit: document.querySelector('.search'),
    resultsList: document.querySelector('.results__list'),
    resContainer: document.querySelector('.results'),
    resPage: document.querySelector('.results__pages'),
    recipeContainer: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesContainer: document.querySelector('.likes'),
    likesList: document.querySelector('.likes__list')
}

export const elementString = {
    loader: 'loader',
    resultLink: 'results__link',
    resultLinkActive: 'results__link--active',
    recipeLove: 'recipe__love'
}
export const showWaitingIcon = parent => {
    let iconHtml = `
    <div class = "${elementString.loader}">
        <svg>
            <use href='./img/icons.svg#icon-cw'></use>
        </svg>
    </div>
    `
    parent.insertAdjacentHTML('afterbegin', iconHtml)
}

export const delWaitingIcon = parent => {
    let icon = document.querySelector(`.${elementString.loader}`)
    parent.removeChild(icon)
}