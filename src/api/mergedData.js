import { deleteCryptid, getCryptidSightings } from './cryptidApi';
import { deleteSighting } from './sightingsApi';

const deleteCryptidSightings = (cryptidId) =>
  new Promise((resolve, reject) => {
    getCryptidSightings(cryptidId)
      .then((sightingsArray) => {
        console.warn(sightingsArray, 'Sightings');
        const deleteSightingPromises = sightingsArray.map((sighting) => deleteSighting(sighting.firebaseKey));

        Promise.all(deleteSightingPromises).then(() => {
          deleteCryptid(cryptidId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export default deleteCryptidSightings;
