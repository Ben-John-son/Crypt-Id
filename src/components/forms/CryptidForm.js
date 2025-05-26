'use client';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext'; // ✅ named import

import { createCryptid, updateCryptid } from '../../api/cryptidApi';

const initialState = {
  cryptidName: '',
  image: '',
  description: '',
  states: [],
};

export default function CryptidForm({ obj = initialState }) {
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
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = (stateOptions) => {
    // Extract just the values (state names) from the select options
    const selectedStates = stateOptions ? stateOptions.map((option) => option.value) : [];
    setFormInput((prev) => ({ ...prev, states: selectedStates }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCryptid(formInput).then(() => router.push(`/Cryptids/${obj.firebaseKey}`));
    } else {
      const stateObj = Object.fromEntries(formInput.states.map((state) => [state, true]));
      const payload = { ...formInput, states: stateObj, uid: user.uid };
      createCryptid(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCryptid(patchPayload).then(() => {
          router.push('/Cryptids');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Cryptid Name</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="" name="cryptidName" value={formInput.cryptidName} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Photo Evidence</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="" name="image" value={formInput.image} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Cryptid Description</Form.Label>
        <Form.Control onChange={handleChange} name="description" value={formInput.description} placeholder="It was..." style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridStates">
        <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>States Sighted In</Form.Label>
        <Select isMulti name="states" options={states.map((state) => ({ value: state, label: state }))} className="basic-multi-select" classNamePrefix="select" onChange={handleStateChange} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} value={formInput.states.map((state) => ({ value: state, label: state }))} />
      </Form.Group>

      {/* <Row>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
      </Row> */}
      <Button variant="primary" type="submit" style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>
        Submit
      </Button>
    </Form>
  );
}

CryptidForm.propTypes = {
  obj: PropTypes.shape({
    cryptidName: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    states: PropTypes.arrayOf(PropTypes.string),
    firebaseKey: PropTypes.string, // optional, used to determine edit mode
  }),
};
