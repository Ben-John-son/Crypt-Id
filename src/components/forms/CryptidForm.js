import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function CryptidForm() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Cryptid Name</Form.Label>
          <Form.Control type="text" placeholder="" style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Photo Evidence</Form.Label>
          <Form.Control type="text" placeholder="" style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Cryptid Description</Form.Label>
        <Form.Control placeholder="It was..." style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Sighting Description</Form.Label>
        <Form.Control placeholder="I was..." style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>City</Form.Label>
          <Form.Control style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', opacity: '.8', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>State</Form.Label>
          <Form.Select defaultValue="" style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none' }}>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Alabama</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Alaska</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Arizona</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Arkansas</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>California</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Colorado</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Connecticut</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Delaware</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Florida</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Georgia</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Hawaii</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Idaho</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Illinois</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Indiana</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Iowa</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Kansas</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Louisiana</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Maine</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Maryland</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Massachusetts</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Michigan</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Minnesota</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Mississippi</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Missouri</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Montana</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Nebraska</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Nevada</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>New Hampshire</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>New Jersey</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>New Mexico</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>New York</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>North Carolina</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>North Dakota</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Ohio</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Oklahoma</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Oregon</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Pennsylvania</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Rhode Island</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>South Carolina</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>South Dakota</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Tennessee</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Texas</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Utah</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Vermont</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Virginia</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Washington</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>West Virgina</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Wisconsin</option>
            <option style={{ color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '18px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>Wyoming</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ backgroundColor: 'rgb(220, 88, 40)', border: 'none', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier' }}>
        Submit
      </Button>
    </Form>
  );
}
