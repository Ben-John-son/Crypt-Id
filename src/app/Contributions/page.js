'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { userCryptids } from '../../api/cryptidApi';
import { userSightings } from '../../api/sightingsApi';
import CryptidCard from '../../components/CryptidCard';
import SightingsCard from '../../components/SightingsCard';
import { useAuth } from '../../utils/context/authContext';

export default function ContributionsPage() {
  const [things, setThings] = useState([]);
  const [cryptids, setCryptids] = useState([]);
  const [sightings, setSightings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    userCryptids(user.uid).then(setCryptids);
  }, []);

  useEffect(() => {
    userSightings(user.uid).then(setSightings);
  }, []);

  const handleClick = (e) => {
    if (e.target.value === 'cryptids') {
      setThings(cryptids.map((cryptid) => <CryptidCard key={cryptid.id} cryptObj={cryptid} />));
    }
    if (e.target.value === 'sightings') {
      setThings(sightings.map((sighting) => <SightingsCard sightObj={sighting} />));
    }
  };
  return (
    <>
      <div className="relative w-full" style={{ height: 'calc(100vh - 60px)', paddingTop: '10px', gap: '20px' }}>
        <Image src="/hallOfFame.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1 }} priority />
        <h2 className="" style={{ textAlign: 'center', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '35px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', marginTop: '2%' }}>
          {' '}
          <span className="typewriter-container">
            <span className="typewriter-animation">Your contributions to cryptozoology</span>
          </span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', justifyItems: 'center', gap: '20px' }}>
          <Button name="cryptids" value="cryptids" onClick={handleClick} style={{ backgroundColor: 'rgb(220, 88, 40)', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', marginTop: '2%', boxShadow: '-14px 19px 24px -11px rgba(76,204,106,0.61)', WebkitBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', MozBoxShadow: ' -14px 19px 24px -11px rgba(76,204,106,0.61)', border: '1px solid black' }}>
            My Cryptids
          </Button>
          <Button name="sightings" value="sightings" onClick={handleClick} style={{ backgroundColor: 'rgb(76 204 106)', color: 'rgb(220, 88, 40)', fontFamily: 'courier', fontWeight: 'bold', fontSize: '25px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', height: '55px', marginTop: '2%', border: '1px solid black' }}>
            My Sightings
          </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: '2%', marginTop: '2%' }}>{things}</div>
      </div>
      <footer style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Link href="/" className="nav-link">
          About
        </Link>
        <Link href="/" className="nav-link">
          Definitions
        </Link>
      </footer>
    </>
  );
}
