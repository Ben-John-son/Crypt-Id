'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { getSingleSighting } from '../../../../api/sightingsApi';
import SightingsForm from '../../../../components/forms/SightingsForm';

export default function EditSightingPage({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleSighting(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <Image src="/formImageWoods.jpg" />
      <SightingsForm obj={editItem} />
    </div>
  );
}

EditSightingPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string,
    cryptidKey: PropTypes.string,
  }).isRequired,
};
