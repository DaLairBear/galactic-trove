
const loginForm = document.querySelector('#login')

const baseURL = `http://localhost:4545/api`

const login = body => axios.post(`${baseURL}/login`, body).then( res => {
    console.log(res.data)
    }).catch(err => {
    console.log(err)
    alert('Uh oh. Your request did not work.')
    })

function loginSubmitHandler(e) {
    e.preventDefault()

    let username = document.querySelector('#login-username')
    let password = document.querySelector('#login-password')

    let bodyObj = {
        username: username.value,
        password: password.value
    }

    login(bodyObj)

    username.value = ''
    password.value = ''
}

loginForm.addEventListener('submit', loginSubmitHandler)