import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import sageLogo from '../assets/sage-logo.png';
import '../../custom-theme.scss';

export default function Navigation() {
  return (
    <Navbar
      expand='lg'
      className='mb-5 bg-success '
      style={{ boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)' }}
    >
      <Container>
        <img
          src={sageLogo}
          alt='sage oak logo'
          style={{ width: '6rem', marginRight: '6.8rem' }}
        />
        <Navbar.Brand href=''>Sage Overflow</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <Nav.Link className='text-black text text-lg' href='/'>
              Home
            </Nav.Link>
            <Nav.Link className='text-black' href='/articles'>
              Articles
            </Nav.Link>
            <Nav.Link className='text-black' href='/categories'>
              Categories
            </Nav.Link>
            <Nav.Link className='text-black' href='/contact'>
              Contact
            </Nav.Link>
            <NavDropdown
              className='text-black'
              title='Account'
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item href='#action/3.1'>Login</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Settings</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Report a bug
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
