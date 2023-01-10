import axios from 'axios';

export async function getPlaceDetails(place) {
  // const accessToken = process.env.MAPBOX_API_KEY;
  const accessToken =
    'pk.eyJ1IjoicG5jc29hcmVzIiwiYSI6ImNsY3FkcnpmdDAybmczcHAzam4xZmtqZHAifQ.smHORCVQm_XTW3hG4aJQ7g';

  return await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=${accessToken}`
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
    latitude: center[0],
    longitude: center[1],
  };
}

function parsePlaceName({ features }) {
  const { place_name } = features[0];

  return {
    placeName: place_name,
  };
}
