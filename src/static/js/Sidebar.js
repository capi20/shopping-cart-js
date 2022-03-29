import cartegories from '../../../server/categories/index.get.json'

export default class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
        const sidebarEl = document.createElement("aside");
        sidebarEl.setAttribute("class", "sidebar")

        const sidebarList = document.createElement("ul");
        for (const category of cartegories) {
            const sidebarListItem = document.createElement('li')
            sidebarListItem.setAttribute("class", "sidebar__item")
            sidebarListItem.textContent = category.name

            sidebarListItem.addEventListener('click', () => {
                window.location.href = `/products/${category.id}`
            })

            sidebarList.append(sidebarListItem)
        }

        sidebarEl.append(sidebarList)
        this.appendChild(sidebarEl);
    }
}

customElements.define("sidebar-element", Sidebar);