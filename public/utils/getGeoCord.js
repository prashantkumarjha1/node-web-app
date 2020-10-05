const request = require('request')

const getGeoCord = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoicHJhc2hhbnRrdW1hcmpoYTEiLCJhIjoiY2tma3h5bGxxMDR3ZzJ6cDIxYm9nOTJpcyJ9.lvtThbO2JMLULniDBZJXMg' 
    request({url, json:true}, (error,response) => {
        if(error){
            callback('Error with connection', undefined)
        }else if(response.body.features.lenght === 0){
            callback('No coordinates with address: '+ address, undefined)
        } else {
            callback(undefined, { lattitude : response.body.features[0].center[0],
                                longitude : response.body.features[0].center[1] })
        }
    })
}

module.exports = getGeoCord
