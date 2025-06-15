'use client';

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';

import { createCryptid, updateCryptid } from '../../api/cryptidApi';

const initialState = {
  cryptidName: '',
  image: '',
  description: '',
  states: [],
  aggressive: Boolean,
  otherStates: {},
  votes: 0,
};

export default function CryptidForm({ obj = initialState }) {
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

  const [formInput, setFormInput] = useState(initialState);
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // ✅ Normalize `states` in useEffect
  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    const normalizedStates = obj?.states ? (Array.isArray(obj.states) ? obj.states : Object.keys(obj.states)) : [];

    setFormInput({ ...initialState, ...obj, states: normalizedStates });
    setChecked(!!obj.aggressive);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (selectedOptions) => {
    const selectedStates = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFormInput((prev) => ({ ...prev, states: selectedStates }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normalize the states array to ensure it's an array of strings
    const stateArray = Array.isArray(formInput.states) ? formInput.states.map((state) => (typeof state === 'string' ? state : state.value)) : [];

    const stateObj = Object.fromEntries(stateArray.map((state) => [state, true]));

    const payload = { ...formInput, states: stateObj, otherStates: stateObj };

    if (obj.firebaseKey) {
      updateCryptid(payload).then(() => router.push('/Cryptids'));
    } else {
      createCryptid({ ...payload, uid: user.uid }).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCryptid(patchPayload).then(() => {
          router.push('/Cryptids');
        });
      });
    }
  };

  const handleCheck = () => {
    const newChecked = !isChecked;
    setChecked(newChecked);
    setFormInput((prevState) => ({
      ...prevState,
      aggressive: newChecked,
    }));
  };

  const labelStyle = {
    color: 'rgb(76 204 106)',
    fontWeight: 'bold',
    fontSize: '25px',
    WebkitTextStroke: '1px',
    WebkitTextStrokeColor: 'black',
    textDecoration: 'none',
    fontFamily: 'courier',
  };

  const inputStyle = {
    backgroundColor: 'rgb(220, 88, 40)',
    border: 'none',
    opacity: '.8',
    color: 'rgb(76 204 106)',
    fontWeight: 'bold',
    fontSize: '25px',
    WebkitTextStroke: '1px',
    WebkitTextStrokeColor: 'black',
    textDecoration: 'none',
    fontFamily: 'courier',
    boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)',
    WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)',
    MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)',
  };

  const buttonStyle = {
    backgroundColor: 'rgb(220, 88, 40)',
    border: 'none',
    color: 'rgb(76 204 106)',
    fontWeight: 'bold',
    fontSize: '25px',
    WebkitTextStroke: '1px',
    WebkitTextStrokeColor: 'black',
    textDecoration: 'none',
    fontFamily: 'courier',
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label style={labelStyle}>Cryptid Name</Form.Label>
          <Form.Control onChange={handleChange} type="text" name="cryptidName" value={formInput.cryptidName} style={inputStyle} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label style={labelStyle}>Photo Evidence</Form.Label>
          <Form.Control onChange={handleChange} type="text" name="image" value={formInput.image} style={inputStyle} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label style={labelStyle}>Cryptid Description</Form.Label>
        <Form.Control onChange={handleChange} name="description" value={formInput.description} placeholder="It was..." style={inputStyle} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridStates">
        <Form.Label style={labelStyle}>States Sighted In</Form.Label>
        <Select
          isMulti
          name="states"
          options={states.map((state) => ({ value: state, label: state }))}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleStateChange}
          value={(formInput.states || []).map((state) => ({
            value: state,
            label: state,
          }))}
          style={{
            control: (provided) => ({
              ...provided,
              backgroundColor: 'rgb(220, 88, 40)',
              border: 'none',
              opacity: '.8',
              color: 'rgb(76 204 106)',
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              color: 'rgb(76 204 106)',
            }),
          }}
        />
      </Form.Group>
      <Form.Check type="checkbox" aria-label="option 1" label="Aggressive" style={{ height: '15px', width: '30px' }} value={formInput.aggressive} checked={isChecked} onChange={handleCheck} />
      <br />
      <Button variant="primary" type="submit" style={buttonStyle}>
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
    states: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.object]),
    firebaseKey: PropTypes.string,
  }),
};
