import { createRootElement } from '../helper'

export default class Modal extends HTMLElement {
    constructor(isOpen = false) {
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

        // modalWrapper.innerHTML = `
        //     <div class="backdrop"></div>
        //     <div class="modal" id="modal">
        //         <span class="modal__btn">
        //         ✕
        //         </span>
        //         <div class="modal__top">
        //             <h3>0 items</h3>
        //         </div>
        //         <div class="modal__middle"></div>
        //         <div class="modal__bottom"></div>
        //     </div>
        // `

        const backdrop = createRootElement("div", "backdrop", modalWrapper)
        backdrop.addEventListener('click', this.close)

        const modal = createRootElement("div", "modal", modalWrapper)

        const modalCloseBtn = createRootElement("span", "modal__btn", modal)
        modalCloseBtn.textContent = "✕"
        modalCloseBtn.addEventListener('click', this.close)

        createRootElement("div", "modal__top", modal)
        createRootElement("div", "modal__middle", modal)
        createRootElement("div", "modal__bottom", modal)

        this.appendChild(modalWrapper);
    }
}

customElements.define("modal-element", Modal);