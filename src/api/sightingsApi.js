import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getSightings = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sightings.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const userSightings = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sightings.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// TODO: DELETE BOOK
const deleteSighting = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sightings/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: GET SINGLE BOOK
const getSingleSighting = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sightings/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: CREATE BOOK
const createSighting = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sightings.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: UPDATE BOOK
const updateSighting = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sightings/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// const getBooksByAuthor = (firebaseKey) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(Object.values(data)))
//       .catch(reject);
//   });

// const booksOnSale = (uid) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const onSale = Object.values(data).filter((item) => item.sale);
//         resolve(onSale);
//       })
//       .catch(reject);
//   });

export { getSightings, createSighting, deleteSighting, updateSighting, getSingleSighting, userSightings };
