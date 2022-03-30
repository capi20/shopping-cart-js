export default class Input extends HTMLElement {
    constructor(label, type = "text") {
      super();
      this.label = label
      this.type = type
    }
  
    connectedCallback() {
      if (this.hasAttribute("label")) {
        this.label = this.getAttribute("label");
      }

      if (this.hasAttribute("type")) {
        this.type = this.getAttribute("type");
      }

      const inputWrapper = document.createElement("div");
      inputWrapper.setAttribute("class", "input-wrapper")
      inputWrapper.innerHTML = `
        <input type=${this.type} required/>
        <label class="input-wrapper__label">${this.label}</label>
      `

      this.appendChild(inputWrapper);
    }
}

customElements.define("input-element", Input);