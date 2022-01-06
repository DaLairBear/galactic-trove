
const registerForm = document.querySelector('#register')

const baseURL = `http://localhost:4545/api`


const register = body => axios.post(`${baseURL}/register`, body).then(res => {
    alert(`Thank you for registering with Galactic Trove ${res.data.username}`)
  }).catch(err => {
    alert('Uh oh. Your request did not work.')
  })

  

function registerSubmitHandler(e) {
    e.preventDefault()
    let name = document.querySelector('#register-name')
    let email = document.querySelector('#register-email')
    let username = document.querySelector('#register-username')
    let password = document.querySelector('#register-password')
    let passwordConfirm = document.querySelector('#register-password-confirm')
  
    if (password.value !== passwordConfirm.value) {
      alert("Your passwords need to match.")
      return
    }
  
    let bodyObj = {
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value
    }
  
    register(bodyObj)

    name.value = ''
    username.value = ''
    email.value = ''
    password.value = ''
    passwordConfirm.value = ''
}
registerForm.addEventListener('submit', registerSubmitHandler)