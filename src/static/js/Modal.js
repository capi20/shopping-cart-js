const template = document.createElement('template')
template.innerHTML = `
    <style>
        .backdrop {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal {
            position: fixed;
            left: calc((100% - 40vw) / 2);
            top: 20vh;
            z-index: 500;
            width: 40vw;
            border: none;
            background-color: white;
            box-shadow: 1px 1px 1px black;
        
            height: 100px;

            transform: translateY(-100vh);
            opacity: 0;
            transition: all 0.3s ease-out;
        }

        .modal__btn {
            position: absolute;
            right: 15px;
            top: 15px;
            font-weight: bold;
            font-size: 2rem;
            color: $color-grey-light-2;
            cursor: pointer;
        }

        .modal__btn:hover {
            color: $color-grey-light-3;
        }
    
        .modal__animate {
            transform: translateY(0);
            opacity: 1;
            transition: all 0.3s ease-in;
        }

    </style>
    <div class="backdrop"></div>
    <div class="modal">
        <span class="modal__btn">
            x
        </span>
    </div>
`

export default class Modal extends HTMLElement {
    constructor(isOpen) {
      super();
      this.isOpen = isOpen

      this.attachShadow({mode: 'open'})
      this.shadowRoot.appendChild(template.content.cloneNode(true))

    }

    open = () => {
        this.isOpen = true

        this.toggleElement()
    }

    close = () => {
        console.log('Modal closed')
        this.isOpen = false

        this.toggleElement()
    }

    toggleElement = () => {
        const backdrop = this.shadowRoot.querySelector('.backdrop') 
        const modal = this.shadowRoot.querySelector('.modal')

        if (this.isOpen) {
            backdrop.style.display = "block"
            //modal.style.display = "block"
            modal.classList.add('modal__animate')
        } else {
            backdrop.style.display = "none"
            //modal.style.display = "none"
            modal.classList.remove('modal__animate')
        }
    }
  
    connectedCallback() {
        const backdrop = this.shadowRoot.querySelector('.backdrop')
        backdrop.addEventListener('click', this.close)

        const modalBtn = this.shadowRoot.querySelector('.modal__btn')
        modalBtn.addEventListener('click', this.close)
    }
}

customElements.define("modal-element", Modal);