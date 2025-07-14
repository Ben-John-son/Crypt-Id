import React, { useEffect, useState } from 'react';
// import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Creepster } from 'next/font/google';
import { useAuth } from '../utils/context/authContext';
import deleteCryptidSightings from '../api/mergedData';
import { allUserVotes, upVoteCryptid, userVoteCount } from '../api/cryptidApi';

const creep = Creepster({
  weight: '400',
  subsets: ['latin'],
  size: '90px',
  outline: '6px solid black',
});
export default function CryptidCard({ cryptObj, onUpdate }) {
  const { user } = useAuth();
  const [button, setButton] = useState(true);
  const [message, setMessage] = useState('');
  const [uVotes, setUVotes] = useState({});
  const [voteExists, setVoteExists] = useState(false);
  const [localVotes, setLocalVotes] = useState(cryptObj.votes);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteThisCryptid = () => {
    if (window.confirm(`Delete ${cryptObj.cryptidName}?`)) {
      deleteCryptidSightings(cryptObj.firebaseKey).then(() => onUpdate());
    }
  };

  const getAllUserVotes = () => {
    allUserVotes(user.uid).then(setUVotes);
  };

  useEffect(() => {
    getAllUserVotes();
  }, []);

  useEffect(() => {
    if (uVotes && Object.keys(uVotes).some((key) => key === cryptObj.firebaseKey || cryptObj.votes >= 20)) {
      setVoteExists(true);
      setButton(false);
      setMessage('Vote Counted!');
    }
  }, [uVotes, cryptObj.firebaseKey]);

  const handleVote = () => {
    const updatedVotes = localVotes + 1;
    const payload = {
      firebaseKey: cryptObj.firebaseKey,
      votes: updatedVotes,
    };

    upVoteCryptid(payload)
      .then(() => userVoteCount(user.uid, cryptObj.firebaseKey))
      .then(() => {
        setLocalVotes(updatedVotes); //
        setButton(false);
        setMessage('Vote Counted!');
      });
  };

  return (
    <Card className="cryptid-card mb-3" style={{ display: 'flex', width: '550px', backgroundColor: 'rgb(76 204 106) ', height: '40vh', boxShadow: '-14px 19px 24px -11px rgba(220,88,40,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(220,88,40,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(220,88,40,0.61)' }} horizontal>
      <div className="d-flex flex-row">
        <Card.Img className="cryptid-img" variant="top" src={cryptObj.image} style={{ display: 'flex', height: '39.8vh', width: '270px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title className="title" style={{ fontFamily: 'courier', color: 'rgb(220, 88, 40)', fontSize: '25px', fontWeight: 'bold', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>
            {cryptObj.cryptidName}
          </Card.Title>
          <Card.Text className="description" style={{ fontSize: '10px', fontFamily: 'courier', marginBottom: '3px' }}>
            {cryptObj.description}
          </Card.Text>

          <Link className="sightingsHover" href={`/Sightings/${cryptObj.firebaseKey}`} style={{ fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(220, 88, 40)' }} passHref>
            Sightings
          </Link>

          <br />
          {cryptObj.aggressive === true && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '2%', color: 'rgb(131, 0, 0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
              </svg>
              <p style={{ color: 'black', fontSize: '15px', marginLeft: '6px', marginBottom: 0 }}>Aggressive</p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginLeft: '5px', marginTop: '8px', color: 'purple' }}>
              <br />
              {message}

              <p style={{ fontSize: '14px' }}>Total votes: {localVotes}</p>
              {!voteExists && button && (
                <>
                  <Button onClick={handleShow} style={{ width: '60px', height: '40px', marginTop: '20%', backgroundColor: 'purple', color: 'orange', fontFamily: 'courier', fontSize: '14px' }}>
                    Vote
                  </Button>
                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header style={{ backgroundColor: 'rgb(220, 88, 40)', fontFamily: 'courier', color: 'rgb(76 204 106)', fontWeight: 'bold' }} closeButton>
                      <Modal.Title style={{ backgroundColor: 'rgb(220, 88, 40)', fontFamily: 'courier', color: 'rgb(76 204 106)', fontWeight: 'bold' }}>Vote for Hall of Fame!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: 'rgb(220, 88, 40)', fontFamily: 'courier', color: 'rgb(76 204 106)', fontWeight: 'bold' }}>
                      A cryptid will need 20 votes to enter the hall of fame. Click the vote button to vote for this cryptid.
                      <br />
                    </Modal.Body>
                    <Modal.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgb(220, 88, 40)' }}>
                      {' '}
                      <Button id="voteBtn" style={{ backgroundColor: 'black', color: 'green', width: '80px' }} onClick={handleVote}>
                        <BsArrowUpCircleFill />
                      </Button>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: 'rgb(220, 88, 40)' }}>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </div>
            {localVotes >= 20 && (
              <p id="creepy" className={creep.className} style={{ fontSize: '14px', marginLeft: '25%', marginTop: '15%', height: '40px', color: 'rgb(220, 88, 40)', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', border: '1px solid black', width: '50px', textAlign: 'center', backgroundColor: 'purple', borderRadius: '50%', lineHeight: '19px', boxShadow: '-14px 19px 24px -11px rgba(5, 5, 5, 0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(6, 6, 6, 0.61)', MozBoxShadow: ' -14px 19px 24px -11prgba(48, 46, 46, 0.61)1)' }}>
                Hall of Fame!
              </p>
            )}
          </div>
          {user.uid === cryptObj.uid && (
            <Link href={`/Cryptids/edit/${cryptObj.firebaseKey}`}>
              <div className="button-wrapper">
                <button type="button" id="editButton" className="cardBtn">
                  EDIT
                </button>
                <div className="drip drip-1" />
                <div className="drip drip-2" />
                <div className="drip drip-3" />
                <div className="drip drip-4" />
                <div className="drip drip-5" />
              </div>
            </Link>
          )}
          {user.uid === cryptObj.uid && (
            <div className="btnWrapperDelete">
              <button type="button" className="cardBtnDelete" style={{ marginTop: '20px', marginLeft: '25px' }} onClick={deleteThisCryptid}>
                DELETE
              </button>
              <div className="drip drip-1d" />
              <div className="drip drip-2d" />
              <div className="drip drip-3d" />
              <div className="drip drip-4d" />
              <div className="drip drip-5d" />
            </div>
          )}
        </Card.Body>
      </div>
    </Card>
  );
}

CryptidCard.propTypes = {
  cryptObj: PropTypes.shape({
    cryptidName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    uid: PropTypes.string,
    aggressive: PropTypes.bool,
    votes: PropTypes.number,
    video: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
