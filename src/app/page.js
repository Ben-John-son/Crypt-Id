/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';

import { getSightings } from '../api/sightingsApi';

function Home() {
  const [sightings, setSightings] = useState([]);

  // Helper: split array into chunks of 3
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    getSightings().then(setSightings);
  }, []);

  const groupedSightings = chunkArray(sightings, 3);

  return (
    <>
      <div className="explore-box" style={{ height: 'calc(100vh - 60px)', paddingTop: '10px' }}>
        <Image src="/1000001063.jpg" alt="Bigfoot" fill style={{ objectFit: 'cover', zIndex: -1 }} priority />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '410px', marginTop: '4%', fontFamily: 'courier', border: 'rgb(76 204 106) solid 2px', backgroundColor: 'rgb(93, 93, 93)', opacity: '.6', borderRadius: '2%' }}>
          <h4 style={{ textAlign: 'center', padding: '0 10px', color: 'rgb(76 204 106)', fontWeight: 'bold' }}>Are you ready to explore the world of cryptozoology?</h4>
          <Link href="/Cryptids" className="nav-linkOne" style={{ fontSize: '30px', color: 'orange', fontWeight: 'bold' }}>
            Explore
          </Link>
        </div>

        <div style={{ position: 'absolute', top: '', left: '2', marginTop: '8%', fontFamily: 'courier', color: 'rgb(76 204 106)', fontWeight: '800', textDecoration: 'underline', marginLeft: '3%' }}>
          <h2>Recent Sightings</h2>
        </div>

        <div
          className="cryptid-carousel"
          style={{
            maxWidth: '450px',
            margin: '50px auto',
            position: 'absolute',
            top: '2',
            left: '2',

            marginTop: '10%',
            borderRadius: '2%',
          }}
        >
          <Carousel data-bs-theme="dark">
            {groupedSightings.map((group) => (
              <Carousel.Item
                key={group.map((s) => s.firebaseKey).join('-')} // build a key from IDs
              >
                <div className="d-flex justify-content-center gap-1 p-2">
                  {group.map((sighting) => (
                    <div
                      key={sighting.firebaseKey} // use stable id here
                      style={{
                        textAlign: 'center',
                        width: '300px',
                        backgroundColor: 'black',
                        borderRadius: '2px',
                        border: '2px solid rgb(76, 204, 106, .8)',
                        marginLeft: '10px',
                      }}
                    >
                      <img
                        className="d-block"
                        src={sighting.image}
                        alt={`slide-${sighting.firebaseKey}`}
                        style={{
                          height: '150px',
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '10px 10px 0 0',
                        }}
                      />
                      <div
                        style={{
                          fontFamily: 'courier',
                          fontWeight: 'bold',
                          color: 'orange',
                          padding: '10px',
                        }}
                      >
                        <Link href="/Explore">{sighting.cryptidName}</Link>
                        <br />
                        {sighting.city}
                        <br />
                        {sighting.state}
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="randomPics" style={{ position: 'relative' }}>
          <Image
            src="/1000001048.jpg"
            width={250}
            height={200}
            alt=""
            style={{
              marginLeft: '90%',
              borderRadius: '2%',
              transform: 'skew(0.05turn, 0deg)',
              top: '2',
              zIndex: 3,
              position: 'absolute',
              left: '0px',
              marginTop: '15%',
            }}
          />
          <Image
            src="/1000001064.jpg"
            width={250}
            height={200}
            alt=""
            style={{
              position: 'absolute',
              left: '20px',
              top: '10px',
              marginLeft: '95%',
              borderRadius: '2%',
              transform: 'skew(-0.06turn, 18deg)',
              zIndex: 1,
            }}
          />
          <Image
            src="/1000001049.jpg"
            width={250}
            height={200}
            alt=""
            style={{
              position: 'absolute',
              left: '10px',
              top: '5px',
              marginLeft: '80%',
              borderRadius: '2%',
              transform: 'skew(0.06turn, 0deg)',
              zIndex: 2,
            }}
          />
        </div>
      </div>

      <footer
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          height: '50px',
          margin: '10px',
          padding: '2px',
        }}
      >
        <Link
          href="/About"
          className="nav-link"
          style={{
            color: 'rgb(220, 88, 40)',
            fontSize: '30px',
            fontFamily: 'courier',
          }}
        >
          About
        </Link>
        <Link
          href="/Definitions"
          className="nav-link"
          style={{
            color: 'rgb(220, 88, 40)',
            fontSize: '30px',
            fontFamily: 'courier',
          }}
        >
          Definitions
        </Link>
      </footer>
    </>
  );
}

export default Home;
