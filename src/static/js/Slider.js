import sliderData from '../../../server/banners/index.get.json'

export default class Slider extends HTMLElement {
    constructor() {
        super()
        this.sliderIndex = 0
        this.totalSlides = sliderData.length
    }

    nextSlide = () => this.updateSlide(this.sliderIndex === this.totalSlides - 1 ? 0 : this.sliderIndex + 1)

    prevSlide = () => this.updateSlide(this.sliderIndex === 0 ? this.totalSlides - 1 : this.sliderIndex - 1)

    currentSlide = (n) => this.updateSlide(n)

    updateSlide = (val) => {
        this.sliderIndex = val

        const slides = document.querySelectorAll('.slide')
        for (let slide of slides) {
            slide.classList.remove('active')
        }
        slides[this.sliderIndex].classList.add('active')

        const dots = document.querySelectorAll('.dot')
        for (let dot of dots) {
            dot.classList.remove('dot-active')
        }
        dots[this.sliderIndex].classList.add('dot-active')
    }

    connectedCallback() {
        const slider = document.createElement('section')
        slider.setAttribute("class", "slider")

        const prevButton = document.createElement('button')
        prevButton.setAttribute("class", "slider__btn slider__btn-left")
        prevButton.textContent = "prev"
        prevButton.addEventListener('click', this.prevSlide)

        const nextButton = document.createElement('button')
        nextButton.setAttribute("class", "slider__btn slider__btn-right")
        nextButton.textContent = "next"
        nextButton.addEventListener('click', this.nextSlide)

        slider.append(prevButton)
        slider.append(nextButton)

        const sliderDots = document.createElement('div')
        sliderDots.setAttribute("class", "slider__dots")

        sliderData.map((el, i) => {
            const bannerBox = document.createElement('div')
            bannerBox.setAttribute("class", "slide")

            const dot = document.createElement('div')
            dot.setAttribute("class", "dot")
            dot.addEventListener('click', () => this.currentSlide(i))

            if (i===0) {
                bannerBox.classList.add('active')
                dot.classList.add('dot-active')
            }

            const banner = document.createElement('img')
            banner.setAttribute("class", "slider__img")
            banner.setAttribute("src", `${el.bannerImageUrl}`)
            banner.setAttribute("alt", `${el.bannerImageAlt}`)

            bannerBox.append(banner)
            slider.append(bannerBox)

            sliderDots.append(dot)
        })

        slider.append(sliderDots)

        this.appendChild(slider)
    }
}

customElements.define("slider-element", Slider)