import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/home'>Sage Overflow</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <Nav.Link href='/home'>Home</Nav.Link>
            <Nav.Link href='/articles'>Articles</Nav.Link>
            <Nav.Link href='/categories'>Categories</Nav.Link>
            <Nav.Link href='/contact'>Contact</Nav.Link>
            <NavDropdown title='Account' id='basic-nav-dropdown'>
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
