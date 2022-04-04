export function createRootElement(tag, cssClasses, hookNode, attributes) {
    const rootElement = document.createElement(tag)
    if (cssClasses) {
        rootElement.className = cssClasses
    }
    if (attributes && attributes.length > 0) {
        for (const attr of attributes) {
            rootElement.setAttribute(attr.name, attr.value)
        }
    }
    
    if (hookNode) {
        hookNode.append(rootElement)
    }
    
    return rootElement
}

export function toggleClass(elements, classname, index) {
    for (let el of elements) {
        el.classList.remove(classname)
    }
    elements[index].classList.add(classname)

    return
}

export function displayResult(result, clickCallback, container, Obj) {
    container.innerHTML = ''
    
    for (let r of result) {
      new Obj(r, clickCallback, container)
    }
}