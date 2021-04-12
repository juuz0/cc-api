const express = require('express')
const app = express()

const user_rating = require('./controllers/user_rating')

app.get('/user.rating',user_rating)

app.get('/user.info', user_info)

app.get('/user.subs', user_submissions)

const port = process.env.port || 3000
app.listen(port, ()=> console.log(`Working at ${port}`))