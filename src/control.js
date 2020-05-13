const express = require('express')
const hbs= require('hbs');
const path = require('path');
const passport = require('passport');
const localStrategy = require('passport-local');
const pasportLocalMongoose = require('passport-local-mongoose');
const pathdir=path.join(__dirname,'../public/atm/partials');

const atm = require('./mongodb')
const router =  new express.Router()
const app = express();

hbs.registerPartials(pathdir);

// app.use(require('express-session')({
//     secret:"laxmi chit fund",
//     resave:false,
//     saveUninitialized:false
// }));
app.use(express.static("../public/atm"));
app.set("views","../public/atm");
app.set('view engine',"hbs");
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(atm.serializeUser());
// passport.deserializeUser(atm.deserializeUser());
app.use(express.json())





router.get('/transc/deposit/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
        
        res.render('deposit.hbs',{user:user});
        }
    }).catch((e)=>{
        //res.status(500).render('login',{error:"User Not Found !"});
            res.send(e);
    })
})

router.get('/transc/with/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
           // console.log(user);
        
        res.render('with.hbs',{user:user});
        }
    }).catch((e)=>{
        res.send(e)
        //res.status(500).render('login',{error:"User Not Found !"});

    })
})

router.get('/transc/pin/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
           // console.log(user);
          res.render('pin.hbs',{user:user});
        }
    }).catch((e)=>{
       // res.status(500).render('login',{error:"User Not Found !"});
        res.send(e);
    })
})



router.get('/transc/bal/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
       
       //     console.log(user);
        res.render('bal.hbs',{user:user});
        }
    }).catch((e)=>{
        res.send(e)
        //res.status(500).render('login',{error:"User Not Found !"});

    })
})



router.get('/bal/transc/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
       
           // console.log(user);
        res.render('transc.hbs',{user:user});
        }
    }).catch((e)=>{
        res.send(e)
        //res.status(500).render('login',{error:"User Not Found !"});

    })
})




router.get('/transc/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
       
          //  console.log(user);
        res.render('transc.hbs',{user:user});
        }
    }).catch((e)=>{
        res.send(e)
        //res.status(500).render('login',{error:"User Not Found !"});

    })
})


router.get('/deposit/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
        
        res.render('deposit.hbs',{user:user});
        }
    }).catch((e)=>{
        res.status(500).render('login',{error:"User Not Found !"});

    })
})

router.get('/with/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
           // console.log(user);
        
        res.render('with.hbs',{user:user});
        }
    }).catch((e)=>{
        res.send(e)
        //res.status(500).render('login',{error:"User Not Found !"});

    })
})

router.get('/pin/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
           // console.log(user);
          res.render('pin.hbs',{user:user});
        }
    }).catch((e)=>{
        res.status(500).render('login',{error:"User Not Found !"});

    })
})

router.get('/bal/:id',(req,res)=>{
    let _id = req.params.id;
    atm.findById(_id).then((user)=>{
        if(!user){
            res.status(500).render('login',{error:"User Not Found !"});

        }
        else{
           // console.log(user);
           res.render('bal.hbs',{user:user});
        }
    }).catch((e)=>{
        res.send(e)
        
    })
})




router.post('/register',(req,res)=>{
   const user = new atm(req.body)
    //res.send(req.body);

   
   user.save().then(()=>{
         res.render('register',{msg:'success'})
 

   }).catch((e)=>{
       res.status(400).send(e);
   })

});


router.post('/transclog',(req,res)=>{

    //console.log(req.body)
    const cardno = req.body.cardno;
    const pin = req.body.pin;
    
    atm.find({card:cardno}).then((user)=>{
        if(user=={}){
            res.status(500).render('login',{error:"Usert Found !"});

        }
        else{

        if(pin==user[0].pin)
        {
           // res.status(200).json({user:user[0]});
            //res.redirect('transc');
            res.render('transc.hbs',{user:user[0]});
        }
        else{
            res.render('login',{error:"Incorrect Pin !"})
        }
    }
       // console.log(user[0].pin);

    }).catch((e)=>{
       // res.send(e)
        res.status(500).render('login',{error:"User Not Found !"});
    })
    


    //res.render("transc.hbs");
});



router.post('/deposit/:id',(req,res)=>{
    // console.log(req.body)
    // res.send("submit");
    atm.findById(req.params.id).then((user)=>{
        //console.log(user);
        user.balance = user.balance + Number(req.body.amount);
        user.save().then(()=>{
            res.render('deposit',{user:user,msg:'success'})
            //console.log("save");

        }).catch((e)=>{
            console.log("error in save");
        })

    }).catch((e)=>{
        console.log("err");
        res.send(e);
    })

    
})

router.post('/with/:id',(req,res)=>{
    // console.log(req.body)
    // res.send("submit");

    atm.findById(req.params.id).then((user)=>{
        //console.log(user);
        if(user.balance>=Number(req.body.amount)){
        user.balance = user.balance - Number(req.body.amount);
    }
    else{
        console.log("balance error");
    }
  
        user.save().then(()=>{
            //console.log("save");
            res.render('with',{user:user,msg:'success'})
        }).catch((e)=>{
            console.log("error in save");
        })

    }).catch((e)=>{
        console.log("err");
        res.send(e);
    })
})

router.post('/pin/:id',(req,res)=>{
    const pin = req.body.pin;
    const cpin = req.body.cpin;
    if(pin==cpin){
        //console.log(req.params.id);
        atm.findByIdAndUpdate(req.params.id,{$set:{pin:pin}}).then(()=>{
           // console.log("update"+pin);

        }).catch((e)=>{
            console.log("err");
            res.send(e);
        })
    }
    
    //res.send("submit");

})


// router.post("/redirect",(req,res)=>{
//     console.log(req.body);
//     if(req.body.deposit=='')
//     {
//         res.render('deposit',{user:user[0]});
//     }
// })


module.exports = router