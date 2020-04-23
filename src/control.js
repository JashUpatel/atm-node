const express = require('express')
const hbs= require('hbs');
const path = require('path');
const pathdir=path.join(__dirname,'../public/atm/partials');

const atm = require('./mongodb')
const router =  new express.Router()
const app = express();
hbs.registerPartials(pathdir);

app.use(express.static("../public/atm"));
app.set("views","../public/atm");
app.set('view engine',"hbs");

app.use(express.json())


router.get('/test',(req,res)=>{
    res.send('router')
    console.log("hjd");
    //console.log(req);
})

router.post('/register',(req,res)=>{
   const user = new atm(req.body)
    //res.send(req.body);

   res.render('register',{msg:'success'})
   
//    user.save().then(()=>{
//        res.render('register?msg=success')

//    }).catch((e)=>{
//        res.send(e)
//    })

})

module.exports = router