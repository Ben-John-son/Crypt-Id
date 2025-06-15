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
      .then(resolve)
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

const famousCryptids = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          resolve([]);
        } else {
          const filtered = Object.values(data).filter((cryptid) => Number(cryptid.votes) >= 20);
          resolve(filtered);
        }
      })
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
          const filtered = Object.values(data).filter((cryptid) => {
            const inStates = cryptid.states && cryptid.states[state];
            const inOtherStates = cryptid.otherStates && cryptid.otherStates[state];
            return inStates || inOtherStates;
          });
          resolve(filtered);
        }
      })
      .catch(reject);
  });

const updateCryptidStates = (cryptidKey, stateName) =>
  fetch(`${endpoint}/cryptids/${cryptidKey}/otherStates.json`, {
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

const upVoteCryptid = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ votes: payload.votes }),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const removeCryptidState = (cryptidKey, stateName) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cryptids/${cryptidKey}/otherStates/${stateName}.json`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete state');
        resolve(true);
      })
      .catch((error) => {
        console.error('Error removing cryptid state:', error);
        reject(error);
      });
  });

// const userVoteCount = (uid, firebaseKey) =>
// new Promise((resolve, reject) => {
//   fetch(`${endpoint}/userVotes/${uid}.json`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ [firebaseKey]: true }),
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(Object.values(data)))
//     .catch(reject);
// });

// const userVoteCount = (uid, cryptidKey) =>
// new Promise((resolve, reject) => {
//   const payload = {
//     uid,
//     cryptidKey,
//   };

//   fetch(`${endpoint}/userVotes.json`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((res) => res.json())
//     .then(resolve)
//     .catch(reject);
// });
const userVoteCount = (uid, cryptidKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userVotes/${uid}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [cryptidKey]: true }),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

const allUserVotes = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userVotes/${uid}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => resolve(data || {}))
      .catch(reject);
  });

export { getCryptids, createCryptid, deleteCryptid, getSingleCryptid, updateCryptid, userCryptids, getCryptidSightings, cryptidsByState, updateCryptidStates, upVoteCryptid, famousCryptids, userVoteCount, allUserVotes, removeCryptidState };
