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
                temperature: body.currently.temperature
            })
        }

    })

}
module.exports=forecast