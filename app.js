const yargs=require('yargs');
const axios=require('axios');

const argv=yargs
.options({
    a:{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather for',
        string:true
    }
}).help()
.alias('help','h')
.argv;

address=encodeURIComponent(argv.address);
var geocodeUrl='https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext='+address+'&gen=9&apiKey=Bm_SSsLxeHfOQd0r8-WDSD-0TY46-mgCLZjlm2ld-jI'
axios.get(geocodeUrl).then((response)=>{
    if(response.data.Response.View.length===0){
        throw new Error('Unable to find that address')
    }
    var address= response.data.Response.View[0].Result[0].Location.Address.Label;

    var latitude=response.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;

    var longitude=response.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;

    var weatherUrl=`https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=${latitude}&longitude=${longitude}&oneobservation=true&apiKey=Bm_SSsLxeHfOQd0r8-WDSD-0TY46-mgCLZjlm2ld-jI`

    console.log(address);
    return axios.get(weatherUrl);
}).then((response)=>{
            temperature=response.data.observations.location[0].observation[0].temperature,
            apparentTemperature=response.data.observations.location[0].observation[0].highTemperature
            console.log(`Its currently ${temperature}.It feels like ${apparentTemperature}`)
}).catch((e)=>{
    if(e.code==='ENOTFOUND'){
        console.log('Unable to connect to API servers')
    }else{
        console.log(e.message);
    }
})
