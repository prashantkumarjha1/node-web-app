const request = require('request')

const weatherDetails = (coordinates={}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=58e951aa3a880a0f7cfa2afb6f737525&query=' + coordinates.longitude +',' +coordinates.lattitude

    request({url, json:true}, (error,response) => {
            if(error){
                callback('No weather retrieved', undefined)
            }else{
                console.log('response.body.current : ',response.body.current.weather_descriptions)
                callback(undefined, {weather_description : response.body.current.weather_descriptions,
                                    temperature : response.body.current.temperature,
                                    feelslike : response.body.current.feelslike,
                                    windSpeed : response.body.current.wind_speed})
            }
    })
}

module.exports = weatherDetails