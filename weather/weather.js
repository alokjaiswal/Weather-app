
var getWeather = (latitude,longitude,callback)=>{
  const request = require('request');

  request({
    url : `https://api.darksky.net/forecast/API_KEY/${latitude},${longitude}`,
    json : true
  },(error,response,body)=>{
    if(error){
      callback("unable to connect to forcast.io servers");
    }
    else if(response.statusCode === 403 || response.statusCode === 404){
      callback("invalid api key  or invalid url");
    }
    else if(response.statusCode === 200){
      callback(undefined,{
        temperature :body.currently.temperature,
        apparentTemperature : body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
