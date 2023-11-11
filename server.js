var express = require('express');
const ejs = require('ejs');
const port = 8080

var app = express();
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/picture',express.static(__dirname + 'public/picture '))

app.set('views','./views')
app.set('view engine','ejs')

app.get('/signin',(req,res) => {
    res.render('signin');
});
app.get('/login',(req,res) => {
    res.render('login');
});
app.post('/home',(req,res) => {
    res.render('home');
});

app.listen(port, () => console.info('port {port}'))
