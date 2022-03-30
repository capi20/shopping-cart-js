class Footer extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const footer = document.createElement('footer')
        footer.setAttribute("class", "footer")
        footer.innerHTML = `
            <p>
                Copyright &copy; 2011-2018 Sabka Bazaar Grocery Supplies Pvt. Ltd. 
            </p>
        `
        this.appendChild(footer)
    }
}

customElements.define("footer-element", Footer)