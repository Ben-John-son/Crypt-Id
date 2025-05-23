'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { getCryptidSightings } from '../../../api/cryptidApi';
import SightingsCard from '../../../components/SightingsCard';

export default function SightingsByCryptid({ params }) {
  const [sightings, setSightings] = useState([]);
  const { firebaseKey } = params;

  useEffect(() => {
    getCryptidSightings(firebaseKey).then(setSightings);
  }, [firebaseKey]);

  return (
    <div>
      <Image src="/sightingsPage2.png" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
      <div style={{ fontFamily: 'courier', color: 'rgb(220, 88, 40)', textAlign: 'center', marginTop: '10%', fontWeight: 'bold' }}>
        <h1>Sightings</h1>
      </div>
      <div className="sightingsCards" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {sightings.map((sighting) => (
          <SightingsCard key={sighting.cryptidKey} sightObj={sighting} />
        ))}
      </div>
    </div>
  );
}

SightingsByCryptid.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
