import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getCryptids = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const userCryptids = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids.json?orderBy="uid"&equalTo="${uid}"`, {
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
const deleteCryptid = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids/${firebaseKey}.json`, {
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
const getSingleCryptid = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids/${firebaseKey}.json`, {
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
const createCryptid = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids.json`, {
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
const updateCryptid = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids/${payload.firebaseKey}.json`, {
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

const getCryptidSightings = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sightings.json?orderBy="cryptidKey"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
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

export { getCryptids, createCryptid, deleteCryptid, getSingleCryptid, updateCryptid, userCryptids, getCryptidSightings };
