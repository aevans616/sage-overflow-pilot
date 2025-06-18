import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import sageLogo from '../assets/sage-logo.png';
import '../../custom-theme.scss';

const customLink = (name: string, styling?: string) => {
  // create link URL
  let linkURL = name.toLowerCase();
  // remove all white spaces
  linkURL = linkURL.replace(' ', '');

  // the URL for home is '', this function recognizes when the home link is pressed and ensures the url is correct
  if (linkURL === 'home') {
    linkURL = '';
  }

  return (
    <Nav.Link className={styling} href={`/${linkURL}`}>
      {name}
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
          style={{ width: '6rem', marginRight: '6.8rem' }}
        />
        <Navbar.Brand href='/'>Sage Overflow</Navbar.Brand>
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
              {customLink('Create Ticket')}
              {customLink('Report Bug')}

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
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
