const request = require("request");

const geocode = (address, cb) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
        ".json?limit=2&access_token=pk.eyJ1Ijoibml3aW5za2kiLCJhIjoiY2tpZ3E0czF5MDRnNjJxdWZmcjRrNXNzcSJ9.uOck8dyuoUp_ohxmmxSJhg";
    request({ url, json: true }, (error, response) => {
        if (error) {
            cb("unable to connect", undefined);
        } else if (response.body.features.length == 0) {
            cb("no location", undefined);
        } else {
            cb(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                name: response.body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
