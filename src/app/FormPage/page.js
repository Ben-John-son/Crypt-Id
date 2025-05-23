'use client';

import React from 'react';
import Image from 'next/image';
import CryptidForm from '../../components/forms/CryptidForm';

export default function formPage() {
  return (
    <>
      <div>
        <Image src="/formImageWoods.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
      </div>
      <div style={{ marginTop: '10%' }}>
        <CryptidForm style={{ marginTop: '10%', backgroundColor: 'rgb(220, 88, 40)' }} />
      </div>
    </>
  );
}
