import { createRootElement } from '../helper'

export default class Modal extends HTMLElement {
    constructor(isOpen) {
      super();
      this.isOpen = isOpen
    }

    open = () => {
        this.isOpen = true

        this.toggleElement()
    }

    close = () => {
        this.isOpen = false

        this.toggleElement()
        this.clearCart()
    }

    clearCart = () => {
        const removeProducts = this.querySelector('.modal-wrapper .modal').querySelectorAll('.cartElement')
        for (let eachNode of removeProducts) {
            eachNode.parentNode.removeChild(eachNode)
        }
    }

    toggleElement = () => {
        const backdrop = this.querySelector('.backdrop') 
        const modal = this.querySelector('.modal')

        if (this.isOpen) {
            backdrop.style.display = "block"
            modal.classList.add('modal__animate')
        } else {
            backdrop.style.display = "none"
            modal.classList.remove('modal__animate')
        }
    }
  
    connectedCallback() {
        const modalWrapper = createRootElement("div", "modal-wrapper")

        modalWrapper.innerHTML = `
            <div class="backdrop"></div>
            <div class="modal" id="modal">
                <span class="modal__btn">
                    x
                </span>
                <div class="modal__top">
                    <h3>0 items</h3>
                </div>
                <div class="modal__middle">
                    <div class="modal__emptyMsg">
                        <h3 class="mb-3">No items in your cart</h3>
                        <p>Your favourite items are just a click away</p> 
                    </div>
                </div>
                <div class="modal__bottom">
                    <button-element text="Start shopping" classes="w-100"></button-element>
                </div>
            </div>
        `

        const backdrop = modalWrapper.querySelector('.backdrop')
        backdrop.addEventListener('click', this.close)

        const modalCloseBtn = modalWrapper.querySelector('.modal__btn')
        modalCloseBtn.addEventListener('click', this.close)

        this.appendChild(modalWrapper);
    }
}

customElements.define("modal-element", Modal);