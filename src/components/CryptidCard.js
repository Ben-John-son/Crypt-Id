import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
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
    <Card style={{ width: '20rem', backgroundColor: 'rgb(76 204 106) ', height: '65vh' }}>
      <Card.Img variant="top" src={cryptObj.image} style={{ height: '35%' }} />
      <Card.Body>
        <Card.Title style={{ fontFamily: 'courier', color: 'rgb(220, 88, 40)', fontWeight: 'bold' }}>{cryptObj.cryptidName}</Card.Title>
        <Card.Text style={{ fontSize: '11px', fontFamily: 'courier' }}>{cryptObj.description}</Card.Text>
        <Card.Link href="#" style={{ fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(220, 88, 40)' }}>
          Mythos
        </Card.Link>
        <Card.Link href={`/Sightings/${cryptObj.firebaseKey}`} style={{ fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(220, 88, 40)' }} passHref>
          Sightings
        </Card.Link>
        <br />
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
