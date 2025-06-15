import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

export default function Videos({ video, name }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow} style={{ height: '20px', width: '50px', fontSize: '8px', backgroundColor: 'black' }}>
        Video
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: 'black', color: 'orange' }} closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'green', textAlign: 'center' }}>
          <iframe src={video} width="400px" height="400px" title="video" />
        </Modal.Body>
      </Modal>
    </div>
  );
}

Videos.propTypes = {
  video: PropTypes.string.isRequired, // expects a video URL string
  name: PropTypes.string.isRequired, // expects the name for the modal title
};
