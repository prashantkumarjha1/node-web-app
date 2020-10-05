const getGeoCord = require ('../public/utils/getGeoCord')
const weatherDetails = require ('../public/utils/weatherDetails')

const coord = getGeoCord('Bangalore', (error,data) => {
    if(error){
        console.log("Error: ", error )
    }else{
        console.log('data: ', data)

        const weatherData = weatherDetails(data, (err, resp)=>{
            if(err){
                console.log("err : ", err)
            }else{
                console.log('resp: ', resp)
            }
        })
    }
})