import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import sageLogo from '../assets/sage-logo.png';
import '../../custom-theme.scss';

const customLink = (name: string, className?: string) => {
  // create link URL
  let linkURL = name.toLowerCase();
  // remove all white spaces
  linkURL = linkURL.replace(' ', '');

  //TODO this decision tree will ensure that home, create ticket and report bug links are correct
  if (linkURL === 'home') {
    linkURL = '';
  }

  return (
    <Nav.Link
      href={`/${linkURL}`}
      className={className}
      style={{
        fontSize: '14px',
        minWidth: 'fit-content',
        margin: '0 0.5rem',
        padding: '0',
      }}
    >
      {name.toUpperCase()}
    </Nav.Link>
  );
};

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
          style={{ width: '6rem', marginRight: '2rem' }}
        />
        <Navbar.Brand
          href='/'
          className='text-primary fw-bold'
          style={{ fontSize: '24px' }}
        >
          Sage Overflow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav
            className='me-auto'
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // border: '2px solid red',
              }}
              className='links-left-wrapper'
            >
              {customLink('Home', 'text-black')}
              {customLink('Articles', 'text-black')}
              {customLink('Categories', 'text-black')}
              {customLink('Contact', 'text-black')}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // border: '2px solid blue',
              }}
              className='links-right-wrapper'
            >
              {/* //^ link to iiQ create-a-ticket */}
              {/* {customLink('Create Ticket')}
              {customLink('Report Bug')} */}

              <NavDropdown
                style={{ fontSize: '14px' }}
                className='text-black'
                title='ACCOUNT'
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Settings</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href='/admin'>Admin</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
