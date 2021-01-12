const request = require("request");

const forecast = (lat, long, cb) => {
    const url =
        "http://api.weatherstack.com/current?access_key=9d9335a4e3c87cfa59c9195215bbeced&query=" +
        lat +
        "," +
        long;
    request({ url: url, json: true }, (error, response) => {
        const data = response.body;

        if (error) {
            cb(error);
        } else {
            cb(undefined, {
                temp: data.current.temperature,
                feel: data.current.feelslike,
            });
        }
    });
};

module.exports = forecast;
