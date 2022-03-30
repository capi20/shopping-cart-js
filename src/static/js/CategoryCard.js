import ButtonComponent from "./ButtonComponent"

export default class CategoryCard extends HTMLElement {
    constructor(category, fetchData) {
        super()
        this.category = category
        this.fetchData = fetchData
    }

    clickHandler(id) {
        this.fetchData('/products', id)  
    }

    connectedCallback() {
        const categoryCard = document.createElement('section')
        categoryCard.setAttribute("class", "category")

        categoryCard.innerHTML = `
            <img src=${this.category.imageUrl} alt=${this.category.name} class="category__image"/>
            <div class="category__right">
                <h2 class="category__right-heading">${this.category.name}</h2>
                <p class="category__right-description">${this.category.description}</p>
                <button-element text="Explore ${this.category.name}" classes=''></button-element>
            </div>
        `

        
        const btn = categoryCard.querySelector("button-element")
        console.log(this.category.id)
        btn.addEventListener('click', () => this.clickHandler(this.category.id))

        this.appendChild(categoryCard);
    }
}

customElements.define("categorycard-element", CategoryCard);