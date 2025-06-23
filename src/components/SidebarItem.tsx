import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function SidebarItem(props) {
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
      <h4 className='mt-4'>{props.appTitle}</h4>
      <Nav.Link style={{ fontSize: '16px' }} href={props.article_1_link || '*'}>
        {props.article1}
      </Nav.Link>
      <Nav.Link href={props.article_2_link || '*'}>{props.article2}</Nav.Link>
      <Nav.Link href={props.article_3_link || '*'}>{props.article3}</Nav.Link>
      <Nav.Link href={props.article_4_link || '*'}>{props.article4}</Nav.Link>
    </div>
  );
}
