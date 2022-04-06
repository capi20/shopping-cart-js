export default class ShoppingCart {
    /*cart structure
    cart = {
        cart: {
            product_1_id: {
                name: "",
                description: "",
                imageUrl: "",
                itemCount: "",
                ...
            },
            product_2_id: {
                name: "",
                description: "",
                imageUrl: "",
                itemCount: "",
                ...
            }
        }
        amount: "", -- total amount to pay
        count: "" -- total items inside the cart
    }*/
    state = {
        cart: {},
        amount: 0,
        count: 0
    }

    // update cart data and item count after each add/remove item 
    updateCartData(cartData = this.state) {
        this.state = cartData
        const cartCount = document.querySelector('.cart__count')
        cartCount.textContent = `${this.state.count} items`

        sessionStorage.setItem("CartData", JSON.stringify(this.state))
    }

    /* To add a product in the cart --> will accept complete product object and check if
    a) product already exists inside the cart --> update count of that product by 1
    b) otherwise add that product object in the cart */
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

        this.updateCartData()

        return this.state
    }

    // To remove a product from the cart --> will accept only product id and will remove 1 unit of that product from the cart if exists
    removeProduct(productId) {
        const itemObj = this.state.cart[productId]
    
        let updatedCart = {}
        let updatedAmount = 0
        let updatedCount = 0
    
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
        } else {
            console.warn(`Can't remove product (id: ${productId}) as it's not in cart!`)
        }
    
        const updatedState = {
            cart: updatedCart,
            amount: updatedAmount,
            count: updatedCount
        }
        
        this.state = {...this.state, ...updatedState} 

        this.updateCartData()

        return this.state
    }
}