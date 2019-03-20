import { element, elementString } from './base'


export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
};

export const renderLikes = item => {
    const likeMarkup = `
        <li>
            <a class="likes__link" data-id=${item.id} href="#">
                <figure class="likes__fig">
                    <img src="${item.image}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${item.title}</h4>
                    <p class="likes__author">${item.publisher}</p>
                </div>
            </a>
        </li>
    `

    element.likesList.insertAdjacentHTML('beforeend', likeMarkup)
}

export const deleteLikes = id => {
    let itemDeleted = element.likesContainer.querySelector(`a[data-id="${id}"]`).parentElement
    itemDeleted.parentElement.removeChild(itemDeleted)
}