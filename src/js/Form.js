import { createRootElement } from './helper'
import Input from './components/Input'
import ButtonComponent from './components/ButtonComponent'

// To create signin and register forms
export default class Form {
    constructor(heading, description, formObj, hookNode) {
        this.hookNode = hookNode
        this.heading = heading
        this.description = description
        this.formObj = formObj
        this.render()
    }

    render() {
        let formWrapper = createRootElement("article", "form", this.hookNode)

        let formInfo = createRootElement("section", "form__left", formWrapper)
        formInfo.innerHTML = `
            <h2 class="form__heading mb-3">${this.heading}</h2>
            <p class="form__description">${this.description}</p>
        `
        let formContainer = createRootElement("form", "form__right", formWrapper)

        this.formObj.forEach((el) => {
            formContainer.append(new Input(el.label, el.type))
        })
        
        formContainer.append(new ButtonComponent(this.heading, "w-100 mt-2 mb-2"))
    }

}