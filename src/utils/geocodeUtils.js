const req = require("postman-request");

const geocodURL = (placeJson) =>
  "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  encodeURIComponent(placeJson) +
  ".json?access_token=pk.eyJ1IjoibWVnaG5hMTQ0IiwiYSI6ImNrbzVtOGRzcTBqb2oydnFucmU4aW40NnEifQ.bB07sQDcTPkbC8jxrBCeyA&limit=1";

const getLatLng = (search, callback) => {
  const url = geocodURL(search);
  console.log(url);
  req.get({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to fetch location!", undefined);
    } else if (body.features.length === 0) {
      callback("No location found!", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        placeName: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = getLatLng;
