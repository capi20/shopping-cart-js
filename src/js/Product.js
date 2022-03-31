import ButtonComponent from './components/ButtonComponent'
import { createRootElement } from './helper'

export default class Product {

    constructor(product, addProductToCart, hookNode) {
        this.product = product
        this.addProductToCart = addProductToCart
        this.hookNode = hookNode
        this.render()
    }

    addToCart() {
        this.addProductToCart(this.product)
    }

    render() {
        let productItem = createRootElement("div", "product", this.hookNode);

        const buyButton = window.innerWidth <= 500 ?
            `<button-element 
                text="Buy now @ Rs.${this.product.price}"
                classes="w-100">
            </button-element>` :
            `
                <span class="product__info-bottom--price">MRP Rs.${this.product.price}</span>
                <button-element text="Buy now"></button-element>
            `

        productItem.innerHTML = `
            <h3 class="product__name">${this.product.name}</h3>
            <div class="product__info">
                <img src=${this.product.imageURL} alt=${this.product.name} class="product__info-image"/>
                <div>
                    <p class="product__info-description">${this.product.description}</p>
                    <div class="product__info-bottom">
                        ${buyButton}
                    </div>    
                </div>
            </div>
        `

        const addProductBtn = productItem.querySelector('button-element button');
        addProductBtn.addEventListener('click', this.addToCart.bind(this));
    }
}