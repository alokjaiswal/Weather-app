const yargs = require('yargs');

const geocode = require('./geo-location/geo-location.js');
const weather = require('./weather/weather.js');
const argv = yargs
  .options({
    a:{
      demand:true,
      alias:'address',
      describe:"address to fetch weather for",
      string : true
    }
  })
  .help()
  .alias('help','h')
  .argv;

console.log(argv.a);

geocode.geocodeAddress(argv.a,(error,results)=>{
  if(error){
    console.log(error);
  }
  else {
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude,(error,results)=>{
        if(error){
          console.log(error);
        }
        else{
          var tem = (results.temperature -32)*5/9;
          var atem = (results.apparentTemperature -32 )*5/9;
          console.log(`Current tempreture is ${tem} and it feels like ${atem}`);
        }
    });

  }
});
