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
      <div className="relative w-full" style={{ height: 'calc(100vh - 60px)', paddingTop: '10px' }}>
        <Image src="/hallOfFame.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1 }} priority />
        <div>
          <Button name="cryptids" value="cryptids" onClick={handleClick}>
            My Cryptids
          </Button>
          <Button name="sightings" value="sightings" onClick={handleClick}>
            My Sightings
          </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: '2%' }}>{things}</div>
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
