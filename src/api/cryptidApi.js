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

const cryptidsByState = (state) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          resolve([]);
        } else {
          const filtered = Object.values(data).filter((cryptid) => cryptid.states && cryptid.states[state]);
          resolve(filtered);
        }
      })
      .catch(reject);
  });

const updateCryptidStates = (cryptidKey, stateName) =>
  fetch(`${endpoint}/cryptids/${cryptidKey}/states.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [stateName]: true }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error updating cryptid states:', error);
    });

export { getCryptids, createCryptid, deleteCryptid, getSingleCryptid, updateCryptid, userCryptids, getCryptidSightings, cryptidsByState, updateCryptidStates };
