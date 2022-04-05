import { displayResult } from "../helper"
import ProductItem from '../ProductItem'

let addProductToCart

export default function loadProductPage(id, addProductFn) {
    addProductToCart = addProductFn
    loadProductData(id)
} 

// To fetch products and display them
export async function loadProductData(id) {
    let response, result

    if (id) {
        sessionStorage.setItem('currentCategoryId', id)
        response = await fetch(`/products/${id}`)
    } else {
        sessionStorage.removeItem('currentCategoryId')
        response = await fetch("/productdata")
    }
  
    result = await response.json();

    const prodContainer = document.getElementById('prod-list')
    
    displayResult(result, addProductToCart, prodContainer, ProductItem)
}