const express=require('express')
const path=require('path')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// environment variables
const port = process.env.PORT || 3000


// Define paths for express config
const directoryName=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


// Setting up handler bar engine & views directory in case if we want ot use different directory name
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// If we want to use static files
app.use(express.static(directoryName))

app.get('',(req,res)=> {
    res.render('index',{
        title:'Weather App',
        createdBy:'Sunil'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'About me',
        name:'Sunil',
        createdBy:'Sunil'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'I am the help page',
        createdBy:'Sunil'
    })
})

app.get('/weather',(req,res)=> {

    if (!req.query.address){
        return res.send({
            error: 'No address is provided'
        })
    }
    
        geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            
            forecast(latitude,longitude, (error,{summary,temperature}={})=> {
        
                if(error){
                    return res.send({
                        error
                    })
                }
                return res.send({
                    location: place,
                    forecast: summary,
                    temperature
                })
                    
                
            })
        
        })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsg: 'Help artcicle not found',
        title:'404',
        createdBy:'Sunil'
    })
})



app.get('*',(req,res)=> {
    res.render('404',{
        errorMsg: 'Page Not found',
        title: '404',
        createdBy:'Sunil'
    })
})


app.listen(port, () => {
    console.log(" running on port 300")
})
