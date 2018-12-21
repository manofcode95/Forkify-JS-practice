export default class Likes {
    constructor() {
        this.likes = []
    }
    addLike(recipe) {
        let likedItem = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            publisher: recipe.publisher
        }
        this.likes.push(likedItem)
        this.updateStorage()
        return likedItem
    }
    deleteLike(id) {
        let deleteId = this.likes.findIndex(el => el.id === id)
        this.likes.splice(deleteId, 1)
        this.updateStorage()
    }
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1

    }
    getNumLike() {
        return this.likes.length
    }
    updateStorage() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }
}