import axios from 'axios';

export async function getPlaceDetails(place) {
  const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

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
