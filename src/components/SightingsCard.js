import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function SightingsCard({ sightObj, onEdit }) {
  return (
    <div>
      <Card style={{ width: '20rem', backgroundColor: 'black ', height: '65vh', border: '2px solid rgb(220, 88, 40)', marginBottom: '2rem' }}>
        <Card.Img variant="top" src={sightObj.image} style={{ height: '35%' }} />
        <Card.Body>
          <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.description}</Card.Text>
          <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.city}</Card.Text>
          <Card.Text style={{ fontSize: '11px', fontFamily: 'courier', color: 'rgb(76 204 106)' }}>{sightObj.state}</Card.Text>
          <br />

          <Button onClick={() => onEdit(sightObj)} className="cardBtn" style={{ marginTop: '20px' }}>
            EDIT
          </Button>

          <Button className="cardBtnDelete" style={{ marginTop: '20px', marginLeft: '25px' }}>
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
  }),
  onEdit: PropTypes.func.isRequired,
};
