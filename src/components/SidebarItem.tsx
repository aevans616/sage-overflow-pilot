import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import arrowDown from '../assets/icons/arrowDown.png';
import arrowRight from '../assets/icons/arrowRight.png';

export default function SidebarItem(props) {
  const [showLinks, setShowLinks] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        marginBottom: '1.5rem',
      }}
      className='app-section-wrapper'
    >
      <div
        className='title-icon Wrapper'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: '0.5rem',
          // borderBottom: '1px solid black',

          cursor: 'pointer',
        }}
        onClick={() => {
          setShowLinks(!showLinks);
        }}
      >
        <h4
          style={{
            marginTop: '1.5rem',
            fontWeight: '400',
          }}
        >
          {props.sectionTitle}
        </h4>
        <img
          src={showLinks ? arrowDown : arrowRight}
          alt='arrow to open menu'
          style={{ margin: '0 0 14px 10px', width: '14px', height: '16px' }}
          className=''
        />
      </div>
      {/*  */}
      <div
        className='links-wrapper'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          gap: '0.25rem',
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        <Nav.Link
          href={props.link_1 || '*'}
          className={`${showLinks ? '' : 'd-none'}`}
        >
          {props.link_1_title}
        </Nav.Link>
        {/*  */}
        <Nav.Link
          href={props.link_2 || '*'}
          className={`${showLinks ? '' : 'd-none'}`}
        >
          {props.link_2_title}
        </Nav.Link>
        {/*  */}
        <Nav.Link
          href={props.link_3 || '*'}
          className={`${showLinks ? '' : 'd-none'}`}
        >
          {props.link_3_title}
        </Nav.Link>
        {/*  */}
        <Nav.Link
          href={props.link_4 || '*'}
          className={`${showLinks ? '' : 'd-none'}`}
        >
          {props.link_4_title}
        </Nav.Link>
      </div>
    </div>
  );
}
