import ButtonComponent from './ButtonComponent'
import { Component } from './helper'

export default class Product extends Component {

    constructor(product, renderHookId) {
        super(renderHookId)
        this.product = product
        this.render()
    }

    // addToCart() {
    //     App.addProductToCart(this.product)
    // }

    render() {
        let productItem = this.createRootElement("div", "product");
        productItem.innerHTML = `
            <h3 class="product__name">${this.product.name}</h3>
            <div class="product__info">
                <img src=${this.product.imageURL} alt=${this.product.name} class="product__info-image"/>
                <div>
                    <p class="product__info-description">${this.product.description}</p>
                    <div class="product__info-bottom">
                        <span class="product__info-bottom--price">MRP Rs.${this.product.price}</span>
                        <button-element text="Buy now"></button-element>
                    </div>    
                </div>
            </div>
        `

        const addCartButton = productItem.querySelector('button');
        // addCartButton.addEventListener('click', this.addToCart.bind(this));
    }
}