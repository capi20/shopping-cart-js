export default class ShoppingCart {
    state = {
        cart: {},
        amount: 0,
        count: 0
    }

    addProduct(product) {
        console.log(this.state)
        let updatedCart = {}

        if (Object.keys(this.state.cart).includes(product.id)) {
            const modifiedData = {...this.state.cart[product.id], itemCount: this.state.cart[product.id].itemCount + 1}

            updatedCart = {...this.state.cart, [product.id]: {...modifiedData}}
        } else {
            updatedCart = {...this.state.cart, [product.id]: {...product}}
        }
        
        const updatedState = {
            cart: updatedCart,
            amount: this.state.amount + product.price,
            count: this.state.count + 1
        }

        this.state = {...this.state, ...updatedState} 

        const cartCount = document.querySelector('.cart__count')
        cartCount.textContent = `${this.state.count} items`
    }
}