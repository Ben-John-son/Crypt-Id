'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'next/image';
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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* All scrolling content goes here */}
      <Image src="/werewolfSilhouette.png" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
      {/* TWO CARD FILTER/INFO ROW */}
      <div className="twoContainers" style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px' }}>
        {/* INFO CARD 1 */}
        <div style={{ width: '400px', backgroundColor: 'rgb(76 204 106)', opacity: 0.6, borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(220, 88, 40)', WebkitTextStroke: '1px black' }}>Browse our cryptid library</h2>
          <Button
            id="allCryptids"
            value="allCryptids"
            onClick={handleClick}
            style={{
              display: 'block',
              margin: '20px auto 0',
              backgroundColor: 'rgb(220, 88, 40)',
              fontFamily: 'courier',
              color: 'rgb(76 204 106)',
              fontWeight: 'bold',
              border: '1px solid black',
            }}
          >
            All Cryptids
          </Button>
        </div>

        {/* FILTER CARD */}
        <div style={{ width: '400px', backgroundColor: 'rgb(220, 88, 40)', opacity: 0.6, borderRadius: '10px', padding: '20px', border: '3px solid grey' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(76 204 106)', WebkitTextStroke: '1px black' }}>Filter by type or region</h2>
          <Dropdown style={{ display: 'block', marginLeft: '35%', marginTop: '5%' }}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                backgroundColor: 'rgb(76 204 106)',
                color: 'rgb(220, 88, 40)',
                fontFamily: 'courier',
                fontWeight: 'bold',
              }}
            >
              Options
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: 'black', border: '1px solid rgb(76 204 106)' }}>
              <Dropdown.Item id="aggressive" value="aggressive" onClick={handleClick} style={{ color: 'rgb(220, 88, 40)' }}>
                Aggressive
              </Dropdown.Item>
              <Link className="dropSelect" href="/Map" style={{ color: 'rgb(220, 88, 40)', marginLeft: '10%' }}>
                Map
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* ADD BUTTON */}
      <Link href="/Cryptids/new" passHref>
        <Button className="addCryptid" style={{ marginLeft: '44%', marginBottom: '5%' }}>
          Add Cryptid
        </Button>
      </Link>

      {/* CRYPTID CARDS */}
      <div
        className="displayCryptids"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {filtered.map((cryptid) => (
          <CryptidCard key={cryptid.firebaseKey} cryptObj={cryptid} onUpdate={getAllCreatures} />
        ))}
      </div>
    </div>
  );
}
