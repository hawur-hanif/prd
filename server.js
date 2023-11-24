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
const signinRoutes = require('./routes/signin')
const homeRoutes = require('./routes/home')
const profileRoutes = require('./routes/profile')
const pembelianRoutes = require('./routes/pembelian')
app.use(loginRoutes)
app.use(signinRoutes)
app.use(homeRoutes)
app.use(profileRoutes)
app.use(pembelianRoutes)

app.get('/', (req,res)=>{
    if (req.session.userId){
        res.redirect('/home')
    }else{
        res.redirect('/login')
    }
})

app.get('/cart',(req,res) => {
    res.render('pages/cart');
});



app.get('/checkout',(req,res) => {
  res.render('pages/checkout');
});

app.get('/tes',(req,res) => {
  res.render('pages/tes');
});

app.get('/chat',(req,res) => {
  res.render('pages/chat');
});

app.get('/admin-dash',(req,res) => {
  res.render('pages/admin_dash');
});

app.get('/admin-transaksi',(req,res) => {
  res.render('pages/admin_transaksi');
});

app.get('/admin-ongoing',(req,res) => {
  res.render('pages/admin_ongoing');
});

app.get('/admin-toko',(req,res) => {
  res.render('pages/admin_profile');
});

app.get('/admin-produk',(req,res) => {
  res.render('pages/admin_produk');
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
    console.log(`Connected to ${result.connection.db.databaseName} database`)
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.info(`listening in port ${port}`))
