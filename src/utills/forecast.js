const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9dde15881029c1111942b17364f9223f&query=' + 
    latitude + 
    ',' + 
    longitude + 
    '&units=f'
    request({ url, json:true}, (error,{body} = {} )=>{
    if(error){
        callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error){
            callback('Unable to find locations try with another features!',undefined)
          
        }
       else{
         callback(undefined,body.current.weather_descriptions[0] +','+'its currently ' + ((body.current.temperature-32)*5/9).toFixed(1) + ' degrees outside' +
         ' and its feels like ' +((body.current.feelslike-32)*5/9).toFixed(1) + ' ,And the local time is: '+  body.location.localtime) 
        }
      })
    }

    module.exports = forecast