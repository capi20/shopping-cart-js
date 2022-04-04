import ButtonComponent from "../components/ButtonComponent"
import { createRootElement } from "../helper"

export function addCartElements(modal, cartData) {
    const modalTop = modal.querySelector(".modal__top")
    const cartTop = createRootElement("div", "cart__top", modalTop)
    createRootElement("h3", "", cartTop)

    createRootElement("div", "cart", modal.querySelector(".modal__middle"))

    const modalBottom = modal.querySelector('.modal__bottom')
    const cartBottom = createRootElement("div", "cart__bottom", modalBottom)
    createRootElement("p", "mb-2 text-center cart__bottom-text", cartBottom)
    cartBottom.append(new ButtonComponent("", "w-100"))

    updateCartElements(modal, cartData)
}

export function updateCartElements(modal, cartData) {

    modal.querySelector(".modal__top .cart__top h3").textContent = `${cartData.count} items`

    const cartBottomText = modal.querySelector('.modal__bottom .cart__bottom .cart__bottom-text')
    cartBottomText.textContent = "Promo code can be applied on payment page"

    const cart = modal.querySelector('.modal__middle .cart')

    if (cartData.count === 0) {
        cart.innerHTML = `
          <div class="cart__emptyMsg">
              <h3 class="mb-3">No items in your cart</h3>
              <p>Your favourite items are just a click away</p> 
          </div>
        `
        cartBottomText.style.display = "none"
        modal.querySelector('.modal__bottom .cart__bottom button-element button').innerHTML = "Start shopping"
    } else {
        if (cart.querySelector(".cart__emptyMsg")) {
            cart.querySelector(".cart__emptyMsg").remove()
        }

        if (!cart.querySelector(".cart-wrapper")) {
            createRootElement("div", "cart-wrapper", cart)
        }

        if (!cart.querySelector('.offer-wrapper')) {
            const offer = createRootElement("div", "offer-wrapper", cart)
            offer.innerHTML = `
                <img src="/static/images/lowest-price.png" alt="Offer"/>
                <span>You won't find it cheaper anywhere</span>
                `
        }

        if (document.getElementById("total-amount")) {
            document.getElementById("total-amount").textContent = `Rs.${cartData.amount}`
        } else {
            cartBottomText.style.display = "block"
            modal.querySelector('.modal__bottom .cart__bottom button-element button').innerHTML = `
                <div class="d-flex justify-content-between">
                    <span>Proceed to Checkout</span>
                    <span id="total-amount">Rs.${cartData.amount}</span>
                </div>
            `
        }
    }
}