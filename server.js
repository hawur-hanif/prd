var express = require('express');
const ejs = require('ejs');
const port = 8080

var app = express();
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/picture',express.static(__dirname + 'public/picture '))
app.use(express.urlencoded({extended:true}))

//routes
const loginRoutes = require('./routes/login')


app.set('view engine','ejs')
app.set('views','views')

app.use(loginRoutes)

app.get('/signin',(req,res) => {
    res.render('pages/signin');
});

app.get('/home',(req,res) => {
    res.render('pages/home');
});

app.listen(port, () => console.info(`listening in port ${port}`))
