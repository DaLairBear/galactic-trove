const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
require('dotenv').config
const {SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())

const {
    seed
} = require('./controllers/database')

app.post('/api/seed', seed)

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../client/home.html'))
})

const {
    login,
    register
} = require('./controllers/auth')

app.post(`/api/login`, login)
app.post(`/api/register`, register)

app.listen(SERVER_PORT, ()=>{console.log(`Chewy hit port ${SERVER_PORT}.`)})

app.get('/css', function (req,res) {
    res.sendFile(path.join(__dirname, "../client/styles.css"))
})