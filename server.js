//import modules
const exp = require('express')
const { ObjectID } = require('mongodb')

//const bodyParser = require('body-parser')

//create an express js instance
const app = exp()

//config express js
app.use(exp.json())
const port = process.env.PORT || 3000
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    next()
})

//Connect to mongodb
const MongoClient = require('mongodb').MongoClient
let db
MongoClient.connect('mongodb+srv://Abubakarkachallah:Abba2001@cluster0.mhdye.mongodb.net', (err, client)=>{
    db = client.db('webstore')
})

//display a message or root path to show that API is working
app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., collection/messages')
})

//get collection
app.param('collectionName', (req, res, next, collectionName)=>{
    req.collection = db.collection(collectionName)
    return next()
})