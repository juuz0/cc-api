const express = require('express')
const app = express()
const puppeteer = require('puppeteer');


const user_rating = require('./controllers/user_rating')
const user_info = require('./controllers/user_info')
const user_submissions = require('./controllers/user_submissions')

app.get('/user.rating',user_rating)

app.get('/user.info', user_info)
app.get('/user.subs', user_submissions)

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Working at ${port}`))
