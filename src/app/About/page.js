import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Image src="/aboutPage.webp" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
      <div style={{ fontFamily: 'courier', fontWeight: 'bold', color: 'rgb(76 204 106)', WebkitTextStroke: '1px black', fontSize: '50px' }}>
        <p>Crypt-Id was created by Ben Johnson. The mission was to create a website that cryptid believers and skeptics could visit to explore the world of cryptozoology.</p>
      </div>
    </div>
  );
}
