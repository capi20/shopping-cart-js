import CategoryCard from '../CategoryCard'
import { displayResult } from '../helper'

export default async function loadHomePage() {
    let response, result
  
    response = await fetch(`/categorydata`)
    
    result = await response.json()

    const container = document.querySelector('main article')
  
    displayResult(result, ()=>{},  container, CategoryCard)
}