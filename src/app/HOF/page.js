'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CryptidCard from '../../components/CryptidCard';
import { famousCryptids } from '../../api/cryptidApi';

export default function HallOfFamePage() {
  const [cryptids, setCryptids] = useState([]);

  const infamousCryptids = () => {
    famousCryptids().then(setCryptids);
  };

  useEffect(() => {
    infamousCryptids();
  }, []);

  return (
    <>
      <div className="relative w-full" style={{ height: 'calc(105vh - 60px)', paddingTop: '10px' }}>
        <Image src="/bigFootInWoodsWithLight.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1 }} priority />
        <div>
          <h2 style={{ textAlign: 'center', color: 'rgb(76 204 106)', fontFamily: 'courier', fontWeight: 'bold', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', marginTop: '3%' }}>Infamous Cryptids</h2>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {cryptids.map((cryptid) => (
              <CryptidCard key={cryptid.firebaseKey} cryptObj={cryptid} onUpdate={infamousCryptids} />
            ))}
          </div>
        </div>
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
