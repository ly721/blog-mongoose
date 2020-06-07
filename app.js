var express = require('express')
var router=require('./router')
var path=require('path')
var session=require('express-session')
var bodyParser=require('body-parser')

var app=express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('html',require('express-art-template'))

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUnintialized: true
}))

app.use(router)

app.listen(3000,function(){
	console.log('3000 port running')
})