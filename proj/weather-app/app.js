const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode(process.argv[2], (error, data) => {
    forecast(data.lat, data.long, (error, { temp, feel }) => {
        //console.log(error);
        //console.log(data);
        console.log(
            "it is " + temp + " degrees out, feels like " + feel + " degrees"
        );
    });
});
