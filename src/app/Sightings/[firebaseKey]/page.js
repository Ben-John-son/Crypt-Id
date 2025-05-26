'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Image, FormGroup, Form, Row, Col } from 'react-bootstrap';
// import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { getCryptidSightings } from '../../../api/cryptidApi';
import { createSighting, updateSighting } from '../../../api/sightingsApi';
// import SightingsForm from '../../../components/forms/SightingsForm';
import SightingsCard from '../../../components/SightingsCard';
import { useAuth } from '../../../utils/context/authContext';

const initialState = {
  city: '',
  image: '',
  description: '',
  state: '',
};

export default function SightingsByCryptid({ params, obj = initialState }) {
  // eslint-disable-next-line max-len
  const states = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const [sightings, setSightings] = useState([]);
  const [show, setShow] = useState(false);
  const { firebaseKey } = params;
  const [formInput, setFormInput] = useState(obj);
  const [editMode, setEditMode] = useState(false);
  //  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCryptidSightings(firebaseKey).then(setSightings);
  }, [firebaseKey]);

  const handleShow = (sighting = null) => {
    if (sighting) {
      setFormInput(sighting);
      setEditMode(true);
    } else {
      setFormInput(initialState);
      setEditMode(false);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formInput, [name]: value };
    setFormInput(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateSighting(formInput).then(() => {
        getCryptidSightings(firebaseKey).then(setSightings); // refresh the list
        setShow(false);
      });
    } else {
      const payload = { ...formInput, uid: user.uid, cryptidKey: firebaseKey };
      createSighting(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateSighting(patchPayload).then(() => {
          getCryptidSightings(firebaseKey).then(setSightings); // refresh the list
          setShow(false);
        });
      });
    }
  };

  return (
    <div style={{ width: '100%', margin: '0px', padding: '1px', display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
      <Image src="/sightingsPage2.png" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />

      <h1 style={{ fontFamily: 'courier', color: 'rgb(220, 88, 40)', textAlign: 'center', marginTop: '5%', fontWeight: 'bold' }}>Sightings</h1>
      <Button variant="primary" onClick={handleShow} style={{ width: '10%' }}>
        Add Sighting
      </Button>

      <div className="sightingsCards" style={{ marginTop: '2%', display: 'flex', flexDirection: 'row', justifyContent: 'center', justifyItems: 'center', flexWrap: 'wrap', gap: '2%', marginBottom: '2%' }}>
        {sightings.length ? sightings.map((sighting) => <SightingsCard key={sighting.firebaseKey} sightObj={sighting} onEdit={handleShow} />) : <h2>No sightings added yet</h2>}
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Sighting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>City</Form.Label>
                <Form.Control onChange={handleChange} type="text" placeholder="" name="city" value={formInput.city} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>State</Form.Label>
                <FormGroup>
                  <Form.Select aria-label="Default select example" name="state" value={formInput.state} onChange={handleChange} style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', backgroundColor: 'rgb(220, 88, 40)' }}>
                    {states.map((state) => (
                      <option value={state} style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', backgroundColor: 'rgb(220, 88, 40)' }}>
                        {state}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Sighting Description</Form.Label>
              <Form.Control onChange={handleChange} name="description" value={formInput.description} placeholder="It was..." style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Photo Evidence</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="It looked like..." name="image" value={formInput.image} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
            </Form.Group>

            {/* <Row>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
      </Row> */}
            <Button variant="primary" type="submit" style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', marginTop: '2%' }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

SightingsByCryptid.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
    cryptidKey: PropTypes.string,
  }).isRequired,
  obj: PropTypes.shape({
    city: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
    firebaseKey: PropTypes.string,
    cryptidKey: PropTypes.string,
  }),
};
