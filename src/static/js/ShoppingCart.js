export default class ShoppingCart {
    state = {
        cart: {},
        amount: 0,
        count: 0
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart__count')
        cartCount.textContent = `${this.state.count} items`
    }

    addProduct(product) {
        let updatedCart = {}

        if (Object.keys(this.state.cart).includes(product.id)) {
            const modifiedData = {...this.state.cart[product.id], itemCount: this.state.cart[product.id].itemCount + 1}

            updatedCart = {...this.state.cart, [product.id]: {...modifiedData}}
        } else {
            updatedCart = {...this.state.cart, [product.id]: {...product, itemCount: 1}}
        }
        
        const updatedState = {
            cart: updatedCart,
            amount: this.state.amount + product.price,
            count: this.state.count + 1
        }

        this.state = {...this.state, ...updatedState} 

        this.updateCartCount()

        return this.state
    }

    removeProduct(productId) {
        const itemObj = this.state.cart[productId]
    
        let updatedCart = {}
        let updatedAmount = 0
        let updatedCount = 0
        let purchasingState = null
    
        if (itemObj) {
            updatedAmount = this.state.amount - itemObj.price
            updatedCount = this.state.count - 1
            let modifiedData = {...this.state.cart[productId], itemCount: this.state.cart[productId].itemCount - 1}
    
            if (modifiedData.itemCount === 0){
                updatedCart = {...this.state.cart}
                delete updatedCart[productId]
            } else {
                updatedCart = {...this.state.cart, [productId]: {...modifiedData}}
            }
            
            purchasingState = updatedCount > 0 ? true : false
        } else {
            console.warn(`Can't remove product (id: ${productId}) as it's not in cart!`)
        }
    
        const updatedState = {
            cart: updatedCart,
            amount: updatedAmount,
            count: updatedCount,
            purchasing: purchasingState
        }
        
        this.state = {...this.state, ...updatedState} 

        this.updateCartCount()

        return this.state
    }
}