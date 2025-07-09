import SidebarItem from './SidebarItem';

export default function Sidebar() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minWidth: '225px',
        maxWidth: '250px',
        marginRight: '1.5rem',
        padding: '1rem',
        textAlign: 'left',
        boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)',
        // outline: '2px solid red',
      }}
      className='sidebar-wrapper bg-success  '
    >
      <h3
        style={{ width: '100%', textAlign: 'center' }}
        className='text-primary'
      >
        Helpful Links
      </h3>

      <SidebarItem
        // style={{ border: '2px solid red' }}
        sectionTitle='Getting Started'
        //
        link_1_title='What is Sage Overflow'
        link_1=''
        //
        link_2_title="FAQ's"
        link_2=''
        //
        link_3_title=''
        link_3=''
      />

      <SidebarItem
        // style={{ border: '2px solid red' }}
        sectionTitle='My Articles'
        //
        link_1_title='My Bookmarks'
        link_1=''
        //
        link_2_title='Recently Viewed'
        link_2=''
        //
        link_3_title='Recommended'
        link_3=''
      />

      <SidebarItem
        // style={{ border: '2px solid red' }}
        sectionTitle='Support'
        //
        link_1_title='Request an Article'
        link_1=''
        //
        link_2_title='Submit a Ticket'
        link_2=''
        //
        link_3_title='Report a Bug'
        link_3=''
        //
        link_4_title='Feedback'
        link_4=''
      />
    </div>
  );
}
