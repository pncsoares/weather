import axios from 'axios';

export async function getPlaceDetails(place) {
  return await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoicG5jc29hcmVzIiwiYSI6ImNsY3JmOGdqNDA0cm0zc3AxMWRycnVqN2wifQ.RPtWQnFfBDD4_16IC23VhQ`
    )
    .then(({ data }) => {
      return {
        coordinates: parseCoordinates(data),
        placeName: parsePlaceName(data),
      };
    });
}

function parseCoordinates({ features }) {
  const { center } = features[0];

  return {
    latitude: center[1],
    longitude: center[0],
  };
}

function parsePlaceName({ features }) {
  const { place_name } = features[0];

  return {
    placeName: place_name,
  };
}
