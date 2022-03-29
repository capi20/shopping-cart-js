// const template = document.createElement('template')
// template.innerHTML = `
//     <style>
//         .backdrop {
//             display: none;
//             width: 100%;
//             height: 100%;
//             position: fixed;
//             z-index: 100;
//             left: 0;
//             top: 0;
//             background-color: rgba(0, 0, 0, 0.5);
//         }
        
//         .modal {
//             position: absolute;
//             left: calc((100% - 40vw) / 2);
//             top: 20vh;
//             z-index: 500;
//             width: 40vw;
//             border: none;
//             background-color: white;
//             box-shadow: 1px 1px 1px black;
//             overflow-y: auto;
        
//             min-height: 100px;

//             transform: translateY(-100vh);
//             opacity: 0;
//             transition: all 0.3s ease-out;
//         }

//         .modal__btn {
//             position: absolute;
//             right: 15px;
//             top: 15px;
//             font-weight: bold;
//             font-size: 2rem;
//             color: $color-grey-light-2;
//             cursor: pointer;
//         }

//         .modal__btn:hover {
//             color: $color-grey-light-3;
//         }
    
//         .modal__animate {
//             transform: translateY(0);
//             opacity: 1;
//             transition: all 0.3s ease-in;
//         }

//     </style>
//     <div class="backdrop"></div>
//     <div class="modal" id="modal-wrapper">
//         <span class="modal__btn">
//             x
//         </span>
//     </div>
// `

export default class Modal extends HTMLElement {
    constructor(isOpen) {
      super();
      this.isOpen = isOpen

    //   this.attachShadow({mode: 'open'})
    //   this.shadowRoot.appendChild(template.content.cloneNode(true))

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
        const removeProducts = this.querySelector('.modal-wrapper .modal').querySelectorAll('.productRow')
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
        const modalWrapper = document.createElement('div')
        modalWrapper.setAttribute("class", "modal-wrapper")

        modalWrapper.innerHTML = `
            <div class="backdrop"></div>
            <div class="modal" id="modal">
                <span class="modal__btn">
                    x
                </span>
                <div class="modal__top">
                    <h4>0 items</h4>
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

        const modalBtn = modalWrapper.querySelector('.modal__btn')
        modalBtn.addEventListener('click', this.close)

        this.appendChild(modalWrapper);
    }
}

customElements.define("modal-element", Modal);