require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT
const  conn = require('./db/conn');
conn() // calling the connection function

const fruitRoutes =  require('./routes/fruits')
const Fruit = require('./models/fruit')
const starterFruits = require('./db/seed')

//View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//MIDDLEWARE
app.use(express.json());
app.use('/api/fruits', fruitRoutes)
//ROUTES
app.get('/', (req,res)=>{
    res.send('Home route!')
})


app.get('/fruit/seed', async (req, res)=>{
    try{
        await Fruit.deleteMany({})
        await Fruit.create(starterFruits)
        res.json(starterFruits)
    }catch(error){
        console.log(`Something went wrong loading seed data ${error.message}`)
    }

})


app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})