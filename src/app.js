const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')



const app = express()

const port = process.env.PORT || 3000

//Define pathes for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static diretory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Evyatar',
       
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Evyatar',
        
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'You are in Help Page',
         title : 'Help',
         name: 'Evyatar Peretz',
         
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: ' You must provide an address',
        }) 
    }
        geocode(req.query.address,(error,{latitude,longitude,location} = {} )=>{
            if(error){
               return res.send({error})
            }
            forecast(latitude,longitude,(error,foreCastdata)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: foreCastdata,
                    location,
                    address:req.query.address
                })
            })
            })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
     return res.send({
        error: 'You must provide search term'
      })
    }

    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Evyatar Peretz',
        errorMassage : 'Help artical not found' ,
     })
})

app.get('*', (req,res)=>{
  res.render('404',{
     title : '404',
     name : 'Evyatar Peretz',
     errorMassage : 'Page not found' 
  })
})
app.listen(port,()=>{
console.log('app listening at ' + port)
})