export default class ButtonComponent extends HTMLElement {
    constructor(text) {
      super();
      this.text = text
    }
  
    connectedCallback() {
      if (this.hasAttribute("text")) {
        this.text = this.getAttribute("text");
      }

      var buttonElement = document.createElement("button");
      buttonElement.setAttribute("class", "button")
      buttonElement.innerHTML = this.text;
      this.appendChild(buttonElement);
    }
}

customElements.define("button-element", ButtonComponent);