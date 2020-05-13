const path = require('path');
const hbs= require('hbs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


//app.use('/',require('./control'));

const control = require('./control.js');
//console.log(path.join(__dirname,'../public'));
const pathdir=path.join(__dirname,'../public/atm/partials');


app.use(express.static("../public/atm"));
app.set("views","../public/atm");
hbs.registerPartials(pathdir);
app.set('view engine',"hbs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

//app.use(bodyParser.json())
//const  = __dirname;
// console.log(path);



app.use(control)

app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/login',(req,res)=>{
//    res.send("hy");
   res.render('login');
});

app.get('/register',(req,res)=>{
    res.render('register');
})


app.get('/transc',(req,res)=>{
    res.render('transc');
})

app.get('/deposit',(req,res)=>{
    res.render('deposit.hbs')
})

app.get('/with',(req,res)=>{
    res.render('with.hbs')
})

app.get('/pin',(req,res)=>{
    res.render('pin.hbs')
})

app.get('/bal',(req,res)=>{
    res.render('bal.hbs')
})

// app.post('/register',(req,res)=>{
               

// })
    
app.post('/add',(req,res)=>{
    console.log(req.body);
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log("server listening on port 3000...");
});