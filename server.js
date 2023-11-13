var express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose')
const session = require('express-session')
const port = 8080
require('dotenv').config()

var app = express();
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/picture',express.static(__dirname + 'public/picture '))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"thisissimplyatestandyoushouldnthackitplease",
    saveUninitialized:true,
    cookie: { maxAge: 1000*3600*24 },
    resave: false 
}))

app.set('view engine','ejs')
app.set('views','views')

//routes
const loginRoutes = require('./routes/login')
app.use(loginRoutes)

app.get('/', (req,res)=>{
    if (req.session.userId){
        res.redirect('/home')
    }else{
        res.redirect('/login')
    }
})

app.get('/signin',(req,res) => {
    res.render('pages/signin');
});

app.get('/home',(req,res) => {
    res.render('pages/home');
});

app.get('/desession', (req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

// connecting to database
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log('Connected to database')
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.info(`listening in port ${port}`))
