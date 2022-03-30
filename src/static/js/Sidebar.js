import cartegories from '../../../server/categories/index.get.json'

export default class Sidebar extends HTMLElement {
    constructor(fetchProducts) {
      super();
      this.fetchProducts = fetchProducts
      this.shouldDisplay = false 
      this.selectedCategory = "Select category"
      this.categoryIndex = 0
      this.getCategory()
    }

    getCategory() {
        const currentId = sessionStorage.getItem("currentCategoryId")
        if (currentId) {
            const currentCategory = cartegories.filter(el => el.id === currentId)
            this.selectedCategory = currentCategory[0].name
            this.categoryIndex = cartegories.findIndex(x => x === currentCategory[0])
        }
    }

    clickHandler(id) {
        this.fetchProducts('/products', id)  
        this.getCategory()

        const sidebarItems = document.querySelectorAll(".sidebar__item")
        for (let item of sidebarItems) {
            item.classList.remove("active")
        }
        sidebarItems[this.categoryIndex].classList.add("active")

        if (window.innerWidth <= 500) {
            document.querySelector(".sidebar-mobile__text").textContent = this.selectedCategory
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

        const sidebarEl = document.createElement("nav");
        sidebarEl.setAttribute("class", "sidebar")

        const sidebarList = document.createElement("ul");
        for (const category of cartegories) {
            const sidebarListItem = document.createElement('li')
            sidebarListItem.setAttribute("class", "sidebar__item")
            sidebarListItem.textContent = category.name

            sidebarListItem.addEventListener('click', 
                () => this.clickHandler(category.id))

            if (category.name === this.selectedCategory) {
                sidebarListItem.classList.add("active")
            }

            sidebarList.append(sidebarListItem)
        }

        sidebarEl.append(sidebarList)

        if (window.innerWidth <= 500) {
            const sidebarMobile = document.createElement('div')
            sidebarMobile.setAttribute("class", "sidebar-mobile")
            sidebarMobile.addEventListener("click", this.sidebarHandler)

            sidebarMobile.innerHTML = `
                <span class="sidebar-mobile__text">${this.selectedCategory}</span>
            `
            const sidebarWrapper = document.createElement("div")
            sidebarWrapper.setAttribute("class", "sidebar-wrapper")
            sidebarWrapper.append(sidebarEl)

            sideBox.append(sidebarMobile)
            sideBox.append(sidebarWrapper)
        } else {
            sideBox.append(sidebarEl)
        }

        this.appendChild(sideBox);
    }
}

customElements.define("sidebar-element", Sidebar);