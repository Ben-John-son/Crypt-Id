'use client';

import React, { useState, useEffect } from 'react';
import UsMap from '../../components/Map'; // or whatever the path is
import { cryptidsByState } from '../../api/cryptidApi';
import CryptidCard from '../../components/CryptidCard';

export default function MapPage() {
  const [selectedState, setSelectedState] = useState(null);
  const [allCryptids, setAllCryptids] = useState([]);

  useEffect(() => {
    if (!selectedState) return;

    cryptidsByState(selectedState).then(setAllCryptids);
  }, [selectedState]);

  return (
    <div>
      <UsMap onStateClick={setSelectedState} />

      <div className="cards-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
        {allCryptids.map((cryptid) => (
          <CryptidCard key={cryptid.firebaseKey} cryptObj={cryptid} />
        ))}
      </div>
    </div>
  );
}
