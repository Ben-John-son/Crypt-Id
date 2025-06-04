import React from 'react';
// import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import deleteCryptidSightings from '../api/mergedData';

export default function CryptidCard({ cryptObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisCryptid = () => {
    if (window.confirm(`Delete ${cryptObj.cryptidName}?`)) {
      deleteCryptidSightings(cryptObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ display: 'flex', width: '20rem', backgroundColor: 'rgb(76 204 106) ', height: '65vh', boxShadow: '-14px 19px 24px -11px rgba(220,88,40,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(220,88,40,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(220,88,40,0.61)' }} horizontal>
      <Card.Img variant="top" src={cryptObj.image} style={{ display: 'flex', flexBasis: '', height: '35%' }} />
      <Card.Body>
        <Card.Title style={{ fontFamily: 'courier', color: 'rgb(220, 88, 40)', fontWeight: 'bold' }}>{cryptObj.cryptidName}</Card.Title>
        <Card.Text style={{ fontSize: '11px', fontFamily: 'courier' }}>{cryptObj.description}</Card.Text>

        <Link href={`/Sightings/${cryptObj.firebaseKey}`} style={{ fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(220, 88, 40)' }} passHref>
          Sightings
        </Link>
        <br />
        {cryptObj.aggressive === true && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '2%' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
            </svg>
            <p style={{ color: 'black', fontSize: '15px', marginLeft: '6px', marginBottom: 0 }}>Aggressive</p>
          </div>
        )}

        {user.uid === cryptObj.uid && (
          <Link href={`/Cryptids/edit/${cryptObj.firebaseKey}`}>
            <Button className="cardBtn" style={{ marginTop: '20px' }}>
              EDIT
            </Button>
          </Link>
        )}
        {user.uid === cryptObj.uid && (
          <Button className="cardBtnDelete" style={{ marginTop: '20px', marginLeft: '25px' }} onClick={deleteThisCryptid}>
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

CryptidCard.propTypes = {
  cryptObj: PropTypes.shape({
    cryptidName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    uid: PropTypes.string,
    aggressive: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
