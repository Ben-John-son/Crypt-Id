import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteSighting } from '../api/sightingsApi';
import Videos from './Videos';

export default function SightingsCard({ sightObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisSighting = () => {
    if (window.confirm(`Delete sighting?`)) {
      deleteSighting(sightObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card className="mb-3" style={{ display: 'flex', width: '550px', backgroundColor: 'black ', height: '40vh', border: '2px solid rgb(220, 88, 40)', marginBottom: '2rem', boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)' }} horizontal>
        <div className="d-flex flex-row">
          <Card.Img variant="top" src={sightObj.image} style={{ display: 'flex', height: '39.5vh', width: '270px' }} />
          <Card.Body>
            <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.description}</Card.Text>
            <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.city}</Card.Text>
            <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.state}</Card.Text>
            {sightObj.video && <Videos video={sightObj.video} />}
            <br />
            {user.uid === sightObj.uid && (
              <Link href={`/Sightings/edit/${sightObj.firebaseKey}`}>
                <Button className="cardBtn" style={{ marginTop: '20px' }}>
                  EDIT
                </Button>
              </Link>
            )}
            {user.uid === sightObj.uid && (
              <Button className="cardBtnDelete" onClick={deleteThisSighting} style={{ marginTop: '20px', marginLeft: '25px' }}>
                DELETE
              </Button>
            )}
          </Card.Body>
        </div>
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
    video: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};
