import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function SidebarItem(props) {
  return (
    <div className='app-section-wrapper mb-4 d-flex flex-column justify-content-start align-items-start'>
      <h4 className='mt-4'>{props.appTitle}</h4>
      <Nav.Link href={props.article_1_link || '/'}>{props.article1}</Nav.Link>
      <Nav.Link href={props.article_2_link || '/'}>{props.article2}</Nav.Link>
      <Nav.Link href={props.article_3_link || '/'}>{props.article3}</Nav.Link>
      <Nav.Link href={props.article_4_link || '/'}>{props.article4}</Nav.Link>
    </div>
  );
}
