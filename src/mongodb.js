const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/atm-db',{useNewUrlParser:true,useCreateIndex:true});

const atm = mongoose.model('atm',
{
    name : {
        type : String,
        required:true,
        trim: true
    },

    card : {
        type: Number,
        required:true,
        trim:true
    },

    account : {
        type: Number,
        required:true,
        trim:true
    },

    balance : {
        type: Number,
        required:true,
        trim:true

    },

    pin : {
        type : Number,
        required:true,
        trim:true
    }

});


module.exports=atm