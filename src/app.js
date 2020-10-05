const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeoCord = require('../public/utils/getGeoCord')
const weatherDetails = require('../public/utils/weatherDetails')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000
app.use (express.static(path.join(__dirname,'../public')))

app.set('view engine','hbs')

const viewsPath = path.join(__dirname,'../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (request,response) => {
    response.render('index',{
        title:"Weather"
    })
})

app.get('/weather', (request,response) => {
    response.render('index',{
        title:"Weather"
    })
})

app.get('/about', (request,response) => {
    response.render('about',{
        name: "Prashant Kumar",
        hobby : "reading"
    })
})

app.get('/api/weather', (request,response) => {
    const location = request.query.loc
    if(!location){
        response.send({
            location: 'Not Present',
            curr_weather : 'NA'
        })
    } else {
        const coord = getGeoCord(location, (error,data) => {
            if(error){
                console.log("Error: ", error )
                response.send({
                    location: error,
                    curr_weather : 'NA'
                })
            }else{
                console.log('data: ', data)
        
                const weatherData = weatherDetails(data, (err, resp)=>{
                    if(err){
                        console.log("err : ", err)
                        response.send({
                            location: err,
                            curr_weather : 'NA'
                        })
                    }else{
                        console.log('resp: ', resp)
                        response.send({location,
                            curr_weather : resp.weather_description+ '\, temperature is: ' + resp.temperature + 'C\, feels like temperature is: '+ resp.feelslike + 'C and wind speed is: ' + resp.windspeed
                        })
                    }
                })
            }
        })
    }
})
app.get('/*', (req,resp) => {
    console.log('test')
    resp.render('error', {errormsg : 'URL is not supported'})
})

app.listen(port,()=>{
    console.log('Starting server on port: ' + port)
})

