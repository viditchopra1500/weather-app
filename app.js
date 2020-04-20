const request=require('request')
const yargs=require('yargs')

const argv=yargs
.options({
    a:{
        demand:true,
        alias:'adress',
        describe:'Address to fetch weather for',
        string:true
    }
}).help()
.alias('help','h')
.argv;

var address=argv.a;
encodeURIComponent(address);
console.log(address);
request({
    url:'https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext='+address+'&gen=9&apiKey=Bm_SSsLxeHfOQd0r8-WDSD-0TY46-mgCLZjlm2ld-jI',
    json:true
},(error,response,body)=>{
    if(error){
        console.log('Unable to connect to server.');
    }
    else if(body.Response.View.length!==0){
    var Address=body.Response.View[0].Result[0].Location.Address.Label;
    var latitude=body.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
    var longitude=body.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
    console.log(`Address: ${Address}.`);
    console.log(`Latitude: ${latitude}.`);
    console.log(`Longitude: ${longitude}.`);
    }
    else 
    console.log('Address not found.');
    
}) 