import ButtonComponent from "./components/ButtonComponent"
import { createRootElement } from "./helper"

export default class CategoryCard {
    constructor(category, clickCallback, hookNode) {
        this.category = category
        this.hookNode = hookNode
        this.render()
    }

    clickHandler(id) {
        window.location.href = `/products`
        sessionStorage.setItem('currentCategoryId', id)
    }

    // create a category element and render it on home page
    render() {
        const categoryCard = createRootElement("section", "category", this.hookNode)

        categoryCard.innerHTML = `
            <img src=${this.category.imageUrl} alt=${this.category.name} class="category__image"/>
            <div class="category__right">
                <h2 class="category__right-heading">${this.category.name}</h2>
                <p class="category__right-description">${this.category.description}</p>
                <button-element text="Explore ${this.category.name}"></button-element>
            </div>
        `

        const btn = categoryCard.querySelector("button-element")
        btn.addEventListener('click', () => this.clickHandler(this.category.id))
    }
}