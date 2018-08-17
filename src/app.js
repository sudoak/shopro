require('dotenv').config()

require('./config/db')()

var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
let shortid = require('shortid')
let mt  = require('moment-timezone')
var app = express()

mt.tz.setDefault('Asia/Kolkata');

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//logging
app.use(morgan('common'))

//Modal
let P = require('./modal/product.schema')
let T = require('./modal/transac.schema')


app.get('/',(req,res)=>{
    res.end("Welcome to shopro")
})

//add products 
app.post('/new', async (req,res)=>{
    try{
        let p = new  P(req.body)
        let o = await p.save()
        res.status(200).json({err:null,data:o})    
    }catch(e){
        res.status(500).json({err:e,data:null})
    }
})

//remove products 
app.post('/remove', async (req,res)=>{
    try{
        let o = await P.deleteOne({pname:req.body.pname})
        res.status(200).json({err:null,data:o})    
    }catch(e){
        res.status(500).json({err:e,data:null})
    }
})
//place order
app.post('/submit',async (req,res)=>{
    try{
        req.body.oid = shortid.generate()
        req.body.createdAt = mt().format()
        let t = new T(req.body)
        let  o = await t.save()
        res.status(200).json({err:null,data:o})    
    }catch(e){
        res.status(500).json({err:e,data:null})
    }
})

app.get('/info/:pname', async (req,res)=>{
    try{
        let o = await T.findOne({pname:req.params.pname})
        res.status(200).json({err:null,data:o})    
    }catch(e){
        res.status(500).json({err:e,data:null})
    }
})

// app.get('/price/:id',async (req,res)=>{
//     //fetch data from db
//     res.end("product data")
// })

app.get('/previous', async (req,res)=>{
    try{
        let o = await T.findOne().sort({createdAt:1})
        res.status(200).json({err:null,data:o})    
    }catch(e){
        res.status(500).json({err:e,data:null})
    }
})
app.listen(process.env.port,function(){})