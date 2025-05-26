'use client';

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { FormGroup } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext'; // ✅ named import

import { createSighting, updateSighting } from '../../api/sightingsApi';

const initialState = {
  city: '',
  image: '',
  description: '',
  state: '',
};

export default function SightingsForm({ obj = initialState }) {
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
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formInput, [name]: value };
    setFormInput(updated);
  };

  useEffect(() => {
    setFormInput(obj); // Update form if a new `obj` is passed in
  }, [obj]);

  // const handleStateChange = (stateOptions) => {
  //   // Extract just the values (state names) from the select options
  //   const selectedStates = stateOptions ? stateOptions.map((option) => option.value) : [];
  //   setFormInput((prev) => ({ ...prev, states: selectedStates }));
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateSighting(formInput).then(() => router.push(`/Sightings/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSighting(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateSighting(patchPayload).then(() => {
          router.push('/Sightings');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>City</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="" name="city" value={formInput.city} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>State</Form.Label>
          <FormGroup>
            <Form.Select aria-label="Default select example" style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', backgroundColor: 'rgb(220, 88, 40)' }}>
              {states.map((state) => (
                <option value={formInput.state} style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', backgroundColor: 'rgb(220, 88, 40)' }}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </FormGroup>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Cryptid Description</Form.Label>
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
  );
}

SightingsForm.propTypes = {
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
