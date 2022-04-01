import sliderData from '../../../server/banners/index.get.json'
import { createRootElement, toggleClass } from '../helper'

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

        const slides = document.querySelectorAll('.slider__container-banner')
        toggleClass(slides, 'active', this.sliderIndex)

        const slideImages = document.querySelectorAll('.slider__container-banner--img')
        toggleClass(slideImages, 'active', this.sliderIndex)

        const dots = document.querySelectorAll('.dot')
        toggleClass(dots, 'dot-active', this.sliderIndex)
    }

    connectedCallback() {

        const slider = document.createElement('section')
        slider.setAttribute("class", "slider")

        const prevButton = createRootElement("button", "slider__btn slider__btn-left", slider)
        prevButton.textContent = "prev"
        prevButton.addEventListener('click', this.prevSlide)

        const nextButton = createRootElement("button", "slider__btn slider__btn-right", slider)
        nextButton.textContent = "next"
        nextButton.addEventListener('click', this.nextSlide)

        const sliderContainer = createRootElement("div", "slider__container", slider)

        const sliderDots = createRootElement("div", "slider__dots", slider)

        sliderData.map((el, i) => {
            const banner = createRootElement("div", "slider__container-banner", sliderContainer)

            const dot = createRootElement("div", "dot", sliderDots)
            dot.addEventListener('click', () => this.currentSlide(i))

            const bannerImg = createRootElement("img", "slider__container-banner--img", banner, 
                [{name: "src", value: el.bannerImageUrl}, 
                {name: "alt", value: el.bannerImageAlt}])

            if (i===0) {
                banner.classList.add('active')
                bannerImg.classList.add('active')
                dot.classList.add('dot-active')
            }
        })

        this.appendChild(slider)
    }
}

customElements.define("slider-element", Slider)