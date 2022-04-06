import { createRootElement } from '../helper'

export default class ButtonComponent extends HTMLElement {
    constructor(text, classes = "") {
      super();
      this.text = text
      this.classes = classes
    }
  
    connectedCallback() {
      if (this.hasAttribute("text")) {
        this.text = this.getAttribute("text");
      }

      if (this.hasAttribute("classes")) {
        this.classes = this.getAttribute("classes");
      }

      const buttonElement = document.createElement("button")
      buttonElement.setAttribute("class", `button ${this.classes}`)
      buttonElement.innerHTML = this.text;

      this.appendChild(buttonElement);
    }
}

customElements.define("button-element", ButtonComponent);