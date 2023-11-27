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
const cartRoutes = require('./routes/cart')
const profileTokoRoutes = require('./routes/admin_profile')
const tokoProdukRoutes = require('./routes/admin_produk')
const tokoDashRoutes = require('./routes/admin_dash')
const tokoOngoingRoutes = require('./routes/admin_ongoing')
const tokoTransaksiRoutes = require('./routes/admin_transaksi')
const checkoutRoutes = require('./routes/checkout')
const riwayatRoutes = require('./routes/riwayat')
app.use(loginRoutes)
app.use(signinRoutes)
app.use(homeRoutes)
app.use(profileRoutes)
app.use(pembelianRoutes)
app.use(cartRoutes)
app.use(profileTokoRoutes)
app.use(tokoProdukRoutes)
app.use(tokoDashRoutes)
app.use(tokoOngoingRoutes) 
app.use(tokoTransaksiRoutes) 
app.use(checkoutRoutes)
app.use(riwayatRoutes)

app.get('/', (req,res)=>{
    if (req.session.userId){
        res.redirect('/home')
    }else{
        res.redirect('/login')
    }
})

app.get('/tes',(req,res) => {
  res.render('pages/tes');
});

app.get('/chat',(req,res) => {
  res.render('pages/chat');
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
