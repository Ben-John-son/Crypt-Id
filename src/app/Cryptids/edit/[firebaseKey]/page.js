'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import CryptidForm from '../../../../components/forms/CryptidForm';
import { getSingleCryptid } from '../../../../api/cryptidApi';

export default function EditPage({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleCryptid(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (
    <div>
      <div>
        <Image src="/formImageWoods.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1, position: 'absolute' }} priority />
      </div>
      <div style={{ marginTop: '10%' }}>
        <CryptidForm obj={editItem} />
      </div>
    </div>
  );
}

EditPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
