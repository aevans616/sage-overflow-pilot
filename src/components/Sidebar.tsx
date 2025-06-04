import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function Sidebar() {
  return (
    <div className='sidebar-wrapper me-4 pt-2 ps-2 w-25 min-w-fit d-flex flex-column justify-content-start align-items-start bg-body-tertiary'>
      <h3>Common Articles</h3>
      <div className='app-section-wrapper mb-4 d-flex flex-column justify-content-start align-items-start'>
        <h4 className='mt-4'>Clever</h4>
        <Nav.Link href='/'>Login</Nav.Link>
        <Nav.Link href='/'>Password Reset</Nav.Link>
        <Nav.Link href='/'>Missing Apps</Nav.Link>
        <Nav.Link href='/'>Sections & Enrollments</Nav.Link>
      </div>

      <div className='app-section-wrapper mb-4 d-flex flex-column justify-content-start align-items-start'>
        <h4 className='mt-4'>Canvas</h4>
        <Nav.Link href='/'>Editing Modules and Assignments</Nav.Link>
        <Nav.Link href='/'>Using the Rich Content Editor</Nav.Link>
        <Nav.Link href='/'>Logging in to the mobile app</Nav.Link>
        <Nav.Link href='/'>Troubleshooting browser issues</Nav.Link>
      </div>

      <div className='app-section-wrapper mb-4 d-flex flex-column justify-content-start align-items-start'>
        <h4 className='mt-4'>Hapara</h4>
        <Nav.Link href='/'>Login</Nav.Link>
        <Nav.Link href='/'>Password Reset</Nav.Link>
        <Nav.Link href='/'>Missing Apps</Nav.Link>
        <Nav.Link href='/'>Sections & Enrollments</Nav.Link>
      </div>

      <div className='app-section-wrapper mb-4 d-flex flex-column justify-content-start align-items-start'>
        <h4 className='mt-4'>Bright Thinker</h4>
        <Nav.Link href='/'>Login</Nav.Link>
        <Nav.Link href='/'>Password Reset</Nav.Link>
        <Nav.Link href='/'>Missing Apps</Nav.Link>
        <Nav.Link href='/'>Sections & Enrollments</Nav.Link>
      </div>
    </div>
  );
}
