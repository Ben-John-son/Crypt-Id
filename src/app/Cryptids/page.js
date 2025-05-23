'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { getCryptids } from '../../api/cryptidApi';
import CryptidCard from '../../components/CryptidCard';

export default function Cryptids() {
  const [cryptids, setCryptids] = useState([]);
  const [showCards, setShowCards] = useState([]);

  const getAllCreatures = () => {
    getCryptids().then((data) => {
      setCryptids(data);
    });
  };
  useEffect(() => {
    getAllCreatures();
  }, []);
  const handleClick = (event) => {
    if (event.target.value === 'allCryptids') {
      setShowCards(cryptids.map((cryptid) => <CryptidCard key={cryptid.firebaseKey} cryptObj={cryptid} onUpdate={getAllCreatures} />));
    }
  };

  // const handleTerrestrial = () => {

  // }

  return (
    <>
      <div className="relative w-full" style={{ height: '100%' }}>
        <Image src="/werewolfSilhouette.png" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
        <div className="twoContainers" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div className="allCryptids" style={{ width: '400px', height: '300px', backgroundColor: 'rgb(77.65% 98.04% 96.47%)', opacity: '.6', color: 'rgb(76 204 106)', marginTop: '5%', borderRadius: '2%' }}>
            <div>
              <h2 style={{ textAlign: 'center', padding: '20px', fontFamily: 'courier', fontWeight: 'bold' }}>Have a look at our extensive cryptid library that includes every creature in our database</h2>
              <Button id="allCryptids" value="allCryptids" style={{ marginLeft: '30%', backgroundColor: 'rgb(220, 88, 40)' }} onClick={handleClick}>
                All Cryptids
              </Button>
            </div>
          </div>
          <div style={{ width: '400px', height: '300px', backgroundColor: 'rgb(77.65% 98.04% 96.47%)', opacity: '.6', color: 'rgb(76 204 106)', marginTop: '5%', marginLeft: '10%', borderRadius: '2%' }}>
            <h2 style={{ textAlign: 'center', padding: '20px', fontFamily: 'courier', fontWeight: 'bold' }}>Want to view cryptids by type or location?</h2>
            <Dropdown style={{ marginLeft: '30%', marginTop: '29%' }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Terrestrial</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Extraterrestrial</Dropdown.Item>
                <Dropdown.Item href="/Map">Map</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Link href="/Cryptids/new" passHref>
          <Button style={{ marginLeft: '50%', marginTop: '8%' }}>Add Cryptid</Button>
        </Link>
        <div className="displayCryptids" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: '40px', padding: '40px', marginTop: '50px', width: '100%' }}>
          {showCards}
        </div>
      </div>
      {/* <footer style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
        <Link href='/' className="nav-link">About</Link>
        <Link href='/' className="nav-link">Definitions</Link>
      </footer> */}
    </>
  );
}
