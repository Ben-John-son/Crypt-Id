/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Creepster } from 'next/font/google';
import { signOut } from '../utils/auth';

const creep = Creepster({
  weight: '400',
  subsets: ['latin'],
  size: '90px',
  outline: '6px solid black',
});

export default function NavBar() {
  // const [searchTerm, setSearchTerm] = useState('')

  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   onSearch(e.target.value)
  // }

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'rgb(76 204 106)', opacity: '.7' }}>
      <Container style={{ marginLeft: '3%' }}>
        <Link id="creepy" passHref href="/" className={creep.className} style={{ fontSize: '35px', color: 'rgb(220, 88, 40)', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black', textDecoration: 'none' }}>
          Crypt-Id
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/Cryptids" style={{ marginLeft: '140px', fontFamily: 'courier', fontSize: '30px', fontWeight: 'bold', color: 'rgb(220, 88, 40)', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>
              Explore
            </Link>
            <Link className="nav-link" href="/Contributions" style={{ marginLeft: '70px', fontFamily: 'courier', fontSize: '30px', fontWeight: 'bold', color: 'rgb(220, 88, 40)', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>
              Contributions
            </Link>
            <Link className="nav-link" href="/HOF" style={{ marginLeft: '70px', fontFamily: 'courier', fontSize: '30px', fontWeight: 'bold', color: 'rgb(220, 88, 40)', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>
              Hall of Fame
            </Link>
            <Link href="#">
              <input type="text" style={{ width: '10rem', marginLeft: '20px', marginTop: '8%' }} />
            </Link>
          </Nav>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
