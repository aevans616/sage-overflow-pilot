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
        marginBottom: '1rem',
        borderBottom: '2px solid #e1e1e1',
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
        <h5
          style={{
            margin: '0.5rem 0 0 0',
            fontWeight: '400',
          }}
        >
          {props.sectionTitle}
        </h5>
        <img
          src={showLinks ? arrowDown : arrowRight}
          alt='arrow to open menu'
          style={{
            margin: '0 0 4px 10px',
            width: '11px',
            height: '13px',
            opacity: '70%',
          }}
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
          fontSize: '16px',
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
