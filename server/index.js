require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const auth = require('./authCtrl')
const pCtrl = require('./postCtrl')
const user = require('./userCtrl')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

const app = express()

app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`⇌  pulse ${SERVER_PORT}`)
    })
}).catch(err => console.log(err))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 100 * 60 * 60}
}))

// AUTH ENDPOINTS
app.post('/api/register', auth.register)
app.post('/api/login', auth.login)
app.get('/api/logout', auth.logout)

// POSTS ENPOINTS
app.post('/api/compose', pCtrl.createPost)
app.get('/api/homefeed', pCtrl.getPosts)
app.delete('/api/delete/:id', pCtrl.deletePost)

// USER ENDPOINTS
app.get('/api/users', user.getUsers)