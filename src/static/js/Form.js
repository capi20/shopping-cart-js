import { Component } from './helper'
import Input from './Input'
import ButtonComponent from './ButtonComponent'

export default class Form extends Component {
    constructor(heading, description, formObj, renderHookId) {
        super(renderHookId)
        this.heading = heading
        this.description = description
        this.formObj = formObj
        this.render()
    }

    render() {
        let formWrapper = this.createRootElement("article", "form");

        let formInfo = document.createElement("section")
        formInfo.setAttribute("class", "form__left")
        formInfo.innerHTML = `
            <h2 className="form__heading mb-3">${this.heading}</h2>
            <p className="form__description">${this.description}</p>
        `
        let formContainer = document.createElement("form")
        formContainer.setAttribute("class", "form__right")

        this.formObj.map((el) => {
            formContainer.append(new Input(el.label, el.type))
        })
        
        formContainer.append(new ButtonComponent(this.heading, "w-100 mt-2 mb-2"))

        formWrapper.append(formInfo)
        formWrapper.append(formContainer)
    }

}