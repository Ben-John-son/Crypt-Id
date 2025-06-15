'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import SightingsForm from '../../../../components/forms/SightingsForm';
import { getSingleCryptid } from '../../../../api/cryptidApi';

export default function NewSightingsPage({ params }) {
  const [cryptids, setCryptid] = useState([]);
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleCryptid(firebaseKey).then(setCryptid);
  }, [firebaseKey]);

  // set cryptids by firebaseKey. Create function to filter, but setCryptid by firebaseKey

  // const name = () => {
  //   cryptids.filter(() => cryptids.firebaseKey === firebaseKey)
  // }

  return (
    <div>
      <Image src="/formImageWoods.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
      <h2 style={{ textAlign: 'center', color: 'rgb(76 204 106)', fontWeight: 'bold', fontSize: '45px', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none', fontFamily: 'courier', marginTop: '2%' }}>{cryptids.cryptidName}</h2>
      <div style={{ marginTop: '3%' }}>
        <SightingsForm params={firebaseKey} />
      </div>
    </div>
  );
}

NewSightingsPage.propTypes = {
  params: PropTypes.string.isRequired,
};
