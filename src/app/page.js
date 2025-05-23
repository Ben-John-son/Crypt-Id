/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import { getCryptids } from '../api/cryptidApi';

function Home() {
  // TODO: Set a state for books
  const [cryptids, setCryptids] = useState([]);

  // TODO: make the call to the API to get all the books on component render
  const getAllCryptids = () => {
    getCryptids().then(setCryptids);
  };

  useEffect(() => {
    getAllCryptids();
  });

  return (
    <>
      <div className="relative w-full" style={{ height: 'calc(105vh - 60px)', paddingTop: '10px' }}>
        <Image src="/1000001063.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1 }} priority />
        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', width: '410px', marginTop: '100px', fontFamily: 'courier', border: 'rgb(76 204 106) solid 2px', backgroundColor: 'rgb(93, 93, 93)', opacity: '.6', borderRadius: '2%' }}>
          <h4 style={{ padding: '15px', marginLeft: '15px', marginRight: ' 15px', paddingRight: '20px', color: 'rgb(76 204 106)', fontWeight: 'bold' }}>Are you ready to explore the world of cryptozoology?</h4>
          <Link href="/Cryptids" className="nav-linkOne" style={{ fontSize: '30px', color: 'orange', fontWeight: 'bold' }}>
            Explore
          </Link>
        </div>
        <div style={{ position: 'absolute', top: '2', left: '4', marginTop: '140px', fontFamily: 'courier', color: 'rgb(76 204 106)', fontWeight: '800', textDecoration: 'underline' }}>
          <h2>Recent Sightings</h2>
        </div>
        <div className="cryptid-carousel" style={{ maxWidth: '300px', margin: '50px auto', position: 'absolute', top: '2', left: '2', border: '20px solid rgba(195, 195, 194, 0.958)', marginTop: '200px', borderRadius: '2%', borderBottom: '40px solid rgba(195, 195, 194, 0.958)' }}>
          <Carousel data-bs-theme="dark">
            {cryptids.map((cryptid) => (
              <Carousel.Item>
                <Carousel.Caption style={{ fontFamily: 'courier', fontWeight: 'bold', color: 'orange', marginTop: '200px !important' }}>
                  <Link href="/Explore">{cryptid.cryptidName}</Link>

                  <br />
                  {cryptid.city}
                  <br />
                  {cryptid.state}
                </Carousel.Caption>
                <img className="d-block w-100" src={cryptid.image} alt="First slide" style={{ height: '300px', width: '500px !important' }} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="randomPics">
          <Image src="/1000001064.jpg" width={250} height={200} position="fixed" style={{ marginLeft: '88%', borderRadius: '2%', transform: 'skew(-0.06turn, 18deg)', zIndex: 1 }} />
          <Image src="/1000001049.jpg" width={250} height={200} position="absolute" style={{ marginLeft: '85%', borderRadius: '2%', transform: 'skew(0.06turn, 0deg)', top: '3', zIndex: 2 }} />
        </div>
      </div>

      <footer style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Link href="/" className="nav-link" style={{ color: 'rgb(220, 88, 40)', fontSize: '30px', fontFamily: 'courier' }}>
          About
        </Link>
        <Link href="/" className="nav-link" style={{ color: 'rgb(220, 88, 40)', fontSize: '30px', fontFamily: 'courier' }}>
          Definitions
        </Link>
      </footer>
    </>
  );
}

export default Home;
