import Form from '../Form'

// login form
const loginForm=[
    {
        label:"Email"
    },
    {
        label:"Password",
        type: "password"
    }
]
  
// signup form
const signupForm = [
    {
        label: "First Name",
    },
    {
        label: "Last Name",
    },
    ...loginForm,
    {
        label: "Confirm Password",
        type: "password"
    }
]

export default function loadAuthPage() {
    const mainContainer = document.querySelector("main")

    const isRegister = window.location.pathname === '/register' ? true : false
    const heading = isRegister ? 'Signup' : 'Login'
    const description = isRegister ? "We do not share your personal details with anyone." : "Get access to your Orders, Wishlist and Recommendations"
    const formObj = isRegister ? signupForm : loginForm

    new Form(heading, description, formObj, mainContainer)
}