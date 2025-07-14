import React from 'react';
import Image from 'next/image';

export default function Definitions() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Image src="/definitionsPage.jpeg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
      <div style={{ fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(76 204 106)', WebkitTextStroke: '1px black', fontSize: '50px' }}>
        <p style={{ fontSize: '70px' }}>
          cryptid <span style={{ fontSize: '40px' }}>noun</span>{' '}
        </p>
        <p>: an animal (such as Sasquatch or the Loch Ness Monster) that has been claimed to exist but never proven to exist</p>
      </div>
    </div>
  );
}
