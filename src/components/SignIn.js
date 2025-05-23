import React from 'react';
import { Button } from 'react-bootstrap';
import { Creepster } from 'next/font/google';
import { signIn } from '../utils/auth';

const creep = Creepster({
  weight: '400',
  subsets: ['latin'],
  size: '90px',
});

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        fontFamily: 'courier new',
        color: 'green',
      }}
    >
      <h1>
        Welcome, truth seeker, to{' '}
        <span>
          <h1 className={creep.className}>Crypt-Id</h1>
        </span>
      </h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
