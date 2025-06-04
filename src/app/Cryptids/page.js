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
  const [filtered, setFiltered] = useState([]);

  const getAllCreatures = () => {
    getCryptids().then((data) => {
      setCryptids(data);
      setFiltered(data); // default to all
    });
  };
  useEffect(() => {
    getAllCreatures();
  }, []);
  const handleClick = (event) => {
    if (event.target.value === 'allCryptids') {
      setFiltered(cryptids);
    } else if (event.target.id === 'aggressive') {
      setFiltered(cryptids.filter((cryptid) => cryptid.aggressive === true));
    }
  };

  // const handleTerrestrial = () => {

  // }

  return (
    <>
      <div style={{ height: '100%', width: '1200px' }}>
        <Image src="/werewolfSilhouette.png" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
        <div className="twoContainers" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div className="allCryptids" style={{ width: '400px', height: '300px', backgroundColor: 'rgb(76 204 106)', opacity: '.6', color: 'rgb(76 204 106)', marginTop: '5%', borderRadius: '2%' }}>
            <div>
              <h2 style={{ textAlign: 'center', padding: '20px', fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(220, 88, 40)', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>Have a look at our extensive cryptid library that includes every creature in our database</h2>
              <Button id="allCryptids" value="allCryptids" style={{ marginLeft: '30%', backgroundColor: 'rgb(220, 88, 40)', fontFamily: 'courier', color: 'rgb(76 204 106)', fontWeight: 'bold', border: '1px solid black' }} onClick={handleClick}>
                All Cryptids
              </Button>
            </div>
          </div>
          <div style={{ width: '400px', height: '300px', backgroundColor: 'rgb(220, 88, 40)', opacity: '.6', color: 'rrgb(76 204 106)', marginTop: '5%', marginLeft: '10%', borderRadius: '2%', border: '3px solid grey' }}>
            <h2 style={{ textAlign: 'center', padding: '20px', fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(76 204 106)', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>Want to view cryptids by type or location?</h2>
            <Dropdown style={{ marginLeft: '35%', marginTop: '29%' }}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'rgb(76 204 106)', color: 'rgb(220, 88, 40)', fontFamily: 'courier', fontWeight: 'bold' }}>
                Options
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item id="aggressive" value="aggressive" onClick={handleClick}>
                  Aggressive
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-2">Extraterrestrial</Dropdown.Item> */}
                <Link href="/Map">Map</Link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Link href="/Cryptids/new" passHref>
          <Button style={{ marginLeft: '50%', marginTop: '8%' }}>Add Cryptid</Button>
        </Link>
        <div className="displayCryptids" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', justifyItems: 'center', flexWrap: 'wrap', gap: '60px', padding: '10px', marginTop: '50px' }}>
          {filtered.map((cryptid) => (
            <CryptidCard key={cryptid.firebaseKey} cryptObj={cryptid} onUpdate={getAllCreatures} />
          ))}
        </div>
      </div>
      {/* <footer style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
        <Link href='/' className="nav-link">About</Link>
        <Link href='/' className="nav-link">Definitions</Link>
      </footer> */}
    </>
  );
}
