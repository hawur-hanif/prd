var express = require('express');
const ejs = require('ejs');
const port = 8080

var app = express();
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/picture',express.static(__dirname + 'public/picture '))

app.set('view engine','ejs')
app.set('views','views')

app.get('/signin',(req,res) => {
    res.render('pages/signin');
});
app.get('/login',(req,res) => {
    res.render('pages/login', {
        pageTitle: "Login",
        path: "login"
    });
});
app.post('/home',(req,res) => {
    res.render('pages/home');
});

app.listen(port, () => console.info(`listening in port ${port}`))
