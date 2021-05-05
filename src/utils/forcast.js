const req = require("postman-request");

const tempURL =
  "http://api.weatherstack.com/current?access_key=0305083ef476e7076be029b9e7499bde";

const forcast = ({ latitude, longitude }, callback) => {
  const finalTempUrl = tempURL + "&query=" + latitude + "," + longitude;
  console.log(finalTempUrl);
  req(
    {
      url: finalTempUrl,
      json: true,
    },
    function (error, { body }) {
      if (error) {
        callback("Unable to find temp!", undefined);
      } else if (body.error) {
        callback("Location is not found!", undefined);
      } else {
        const result = {
          temperature: body.current.temperature,
          feelLikeTemp: body.current.feelslike,
        };
        callback(undefined, result);
      }
    }
  );
};
module.exports = forcast;
