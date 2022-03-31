import cartegories from '../../../server/categories/index.get.json'
import { createRootElement, toggleClass } from '../helper'

export default class Sidebar extends HTMLElement {
    constructor(fetchProducts) {
      super();
      this.fetchProducts = fetchProducts
      this.shouldDisplay = false 
      this.currentCategory = "Select category"
      this.categoryIndex = 0
      this.getCategory()
    }

    getCategory() {
        const currentId = sessionStorage.getItem("currentCategoryId")
        if (currentId) {
            const currentCategoryData = cartegories.filter(el => el.id === currentId)
            this.currentCategory = currentCategoryData[0].name
            this.categoryIndex = cartegories.findIndex(x => x === currentCategoryData[0])
        }
    }

    clickHandler(id) {
        this.fetchProducts('/products', id)  
        this.getCategory()

        const sidebarItems = document.querySelectorAll(".sidebar__item")
        toggleClass(sidebarItems, "active", this.categoryIndex)

        if (window.innerWidth <= 500) {
            document.querySelector(".sidebar-mobile__text").textContent = this.currentCategory
            this.sidebarHandler()
        }
    }

    sidebarHandler = () => {
        this.shouldDisplay = !this.shouldDisplay
        document.querySelector('.sidebar-wrapper').classList.toggle("sidebar-active")
    }
  
    connectedCallback() {
        const sideBox = document.createElement("aside");
        sideBox.style.height = '100%'

        const sidebarEl = createRootElement("nav", "sidebar")

        const sidebarList = createRootElement("ul", "sidebar__list", sidebarEl)
        for (const category of cartegories) {
            const sidebarListItem = createRootElement("li", "sidebar__item", sidebarList)
            sidebarListItem.textContent = category.name

            sidebarListItem.addEventListener('click', 
                () => this.clickHandler(category.id))

            if (category.name === this.currentCategory) {
                sidebarListItem.classList.add("active")
            }
        }

        if (window.innerWidth <= 500) {

            const sidebarMobile = createRootElement("div", "sidebar-mobile", sideBox)
            sidebarMobile.addEventListener("click", this.sidebarHandler)

            sidebarMobile.innerHTML = `
                <span class="sidebar-mobile__text">${this.currentCategory}</span>
            `

            const sidebarWrapper = createRootElement("div", "sidebar-wrapper", sideBox)
            sidebarWrapper.append(sidebarEl)
        } else {
            sideBox.append(sidebarEl)
        }

        this.appendChild(sideBox);
    }
}

customElements.define("sidebar-element", Sidebar);