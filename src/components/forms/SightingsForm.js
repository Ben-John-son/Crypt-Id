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
import { checkStatesOfSightings, createSighting, updateSighting } from '../../api/sightingsApi';
import { removeCryptidState, updateCryptidStates } from '../../api/cryptidApi';

const initialState = {
  city: '',
  image: '',
  description: '',
  state: '',
};

export default function SightingsForm({ obj = initialState, params }) {
  // eslint-disable-next-line max-len
  const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      await updateSighting(formInput);
      await updateCryptidStates(obj.cryptidKey, formInput.state);

      if (obj.state !== formInput.state) {
        const stillUsed = await checkStatesOfSightings(obj.cryptidKey, obj.state);
        if (!stillUsed) {
          await removeCryptidState(obj.cryptidKey, obj.state);
        }
      }

      router.back();
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSighting(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, cryptidKey: params };
        updateSighting(patchPayload).then(() => {
          updateCryptidStates(params, formInput.state).then(() => {
            router.back();
          });
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>City</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="" name="city" value={formInput.city} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)' }} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label value={formInput.state} style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)' }}>
            State
          </Form.Label>
          <FormGroup>
            <Form.Select
              name="state"
              value={formInput.state}
              onChange={handleChange}
              aria-label="State select"
              style={{
                color: 'rgb(76 204 106)',
                fontWeight: 'bold',
                fontSize: '25px',
                WebkitTextStroke: '1px',
                WebkitTextStrokeColor: 'black',
                textDecoration: 'none',
                fontFamily: 'courier',
                backgroundColor: 'rgb(220, 88, 40)',
              }}
            >
              <option value="">Select a state</option>
              {states.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </Form.Select>
          </FormGroup>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Sighting Description</Form.Label>
        <Form.Control onChange={handleChange} name="description" value={formInput.description} placeholder="It was..." style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)' }} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Photo Evidence</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="It looked like..." name="image" value={formInput.image} style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)' }} />
      </Form.Group>

      {/* <Row>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
      </Row> */}
      <Button variant="primary" type="submit" style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', marginTop: '2%', boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)' }}>
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
