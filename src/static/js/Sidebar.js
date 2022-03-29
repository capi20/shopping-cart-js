import cartegories from '../../../server/categories/index.get.json'

export default class Sidebar extends HTMLElement {
    constructor(fetchProducts) {
      super();
      this.fetchProducts = fetchProducts
    }

    clickHandler(id) {
        this.fetchProducts(id)  
    }
  
    connectedCallback() {
        const sidebarEl = document.createElement("aside");
        sidebarEl.setAttribute("class", "sidebar")

        const sidebarList = document.createElement("ul");
        for (const category of cartegories) {
            const sidebarListItem = document.createElement('li')
            sidebarListItem.setAttribute("class", "sidebar__item")
            sidebarListItem.textContent = category.name

            sidebarListItem.addEventListener('click', () => this.clickHandler(category.id))

            sidebarList.append(sidebarListItem)
        }

        sidebarEl.append(sidebarList)
        this.appendChild(sidebarEl);
    }
}

customElements.define("sidebar-element", Sidebar);