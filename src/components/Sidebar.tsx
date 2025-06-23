import React from 'react';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  return (
    <div
      style={{ boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)' }}
      className='sidebar-wrapper me-4 pt-2 ps-2 w-25 min-w-fit d-flex flex-column justify-content-start align-items-start bg-success  '
    >
      <h3>Common Articles</h3>

      <SidebarItem
        // style={{ border: '2px solid red' }}
        appTitle='Clever'
        article1='Login'
        article_1_link=''
        article2='Password Reset'
        article_2_link=''
        article3='Missing Apps'
        article_3_link=''
        article4='Sections & Enrollments'
        article_4_link=''
      />

      <SidebarItem
        appTitle='Canvas'
        article1='Editing Assignments'
        article_1_link=''
        article2='Using the Rich Content Editor'
        article_2_link=''
        article3='Logging in to the mobile app'
        article_3_link=''
        article4='Troubleshooting browser issues'
        article_4_link=''
      />

      <SidebarItem
        appTitle='Hapara'
        article1='...'
        article_1_link=''
        article2='...'
        article_2_link=''
        article3='...'
        article_3_link=''
        article4='...'
        article_4_link=''
      />

      <SidebarItem
        appTitle='Bright Thinker'
        article1='...'
        article_1_link=''
        article2='...'
        article_2_link=''
        article3='...'
        article_3_link=''
        article4='...'
        article_4_link=''
      />
    </div>
  );
}
