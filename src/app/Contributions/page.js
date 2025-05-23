import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
  return (
    <>
      <div className="relative w-full" style={{ height: 'calc(100vh - 60px)', paddingTop: '10px' }}>
        <Image src="/hallOfFame.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1 }} priority />
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
