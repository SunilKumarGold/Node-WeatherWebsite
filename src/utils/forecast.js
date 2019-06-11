const request=require('request')

const forecast= (lati,long,callback) => {
    const url="https://api.darksky.net/forecast/69f4d1ed6001abf7c9ab96cdf856752b/"+lati+','+long+"?units=si"

    request({ url, json: true}, (error, {body}) => {
        if(error){
            
            
        }
        else if (body.error)
        {
            callback("Unable to find the location",undefined)
            
        }
        else{
            callback(undefined, {
                summary:body.daily.data[0].summary,
                temperature: 'It is currently ' +body.currently.temperature+' degrees out. The high today is '+body.daily.data[0].temperatureHigh +
                ' degrees & a low of '+body.daily.data[0].temperatureLow+' degrees.'
            })
        }

    })

}
module.exports=forecast