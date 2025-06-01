import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteSighting } from '../api/sightingsApi';

export default function SightingsCard({ sightObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisSighting = () => {
    if (window.confirm(`Delete sighting?`)) {
      deleteSighting(sightObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '20rem', backgroundColor: 'black ', height: '65vh', border: '2px solid rgb(220, 88, 40)', marginBottom: '2rem' }}>
        <Card.Img variant="top" src={sightObj.image} style={{ height: '35%' }} />
        <Card.Body>
          <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.description}</Card.Text>
          <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.city}</Card.Text>
          <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.state}</Card.Text>
          <br />
          {user.uid === sightObj.uid && (
            <Link href={`/Sightings/edit/${sightObj.firebaseKey}`}>
              <Button className="cardBtn" style={{ marginTop: '20px' }}>
                EDIT
              </Button>
            </Link>
          )}
          <Button className="cardBtnDelete" onClick={deleteThisSighting} style={{ marginTop: '20px', marginLeft: '25px' }}>
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
SightingsCard.propTypes = {
  sightObj: PropTypes.shape({
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};
