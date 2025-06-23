import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';

//TODO create a "new article" btn
//TODO:

export default function Admin() {
  return (
    <div
      style={{
        width: '75%',
        height: 'fit-content',
        // border: '2px solid red'
      }}
      className='admin-page-wrapper'
    >
      <h2>Admin Dashboard</h2>
      <div
        className='admin-content-wrapper'
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          margin: '2rem 0',
        }}
      >
        <div
          className='left-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderRight: '2px solid #eee',
            width: '70%',
            padding: '0 1rem',
          }}
        >
          <h3>SOME CONTENT</h3>
          <p style={{ textAlign: 'left' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            quis deserunt ratione voluptatum similique sint omnis molestias
            aliquid tenetur nemo possimus animi dolorum, cumque voluptate ut! Ex
            velit delectus blanditiis modi? Nesciunt odio repellendus suscipit!
            Illum alias dolore dolores, et minima, debitis dolor sapiente odio
            ut quo excepturi numquam iusto in quam, ex sint pariatur ratione
            corrupti nulla natus quas illo? Et in, est quisquam natus harum
            cumque consectetur, iure asperiores sit iste maiores. Alias possimus
            ad nostrum provident, excepturi neque? Laborum similique aperiam,
            dolorem voluptatibus quas magni sint quod totam reprehenderit facere
            qui voluptatum quia eligendi sed adipisci facilis eos a temporibus
            repellendus vero repudiandae vitae ipsum accusantium tempore? Ullam
            nihil aperiam dolor minima, quas tempore facere nostrum assumenda
            amet mollitia est ex id aspernatur fugit suscipit. Nam voluptate rem
            quisquam, alias a aliquid quae commodi. Repellendus, exercitationem
            voluptates, consequuntur quae nihil illo, quo quia quam inventore
            aliquam ullam quod minus aspernatur. Corporis, esse necessitatibus
            minima consectetur ipsa asperiores veniam eligendi laborum dolor
            voluptates voluptatum aliquam sequi id odit quod accusamus sunt
            nostrum ad laboriosam voluptate recusandae obcaecati mollitia fugit.
            Labore maiores, non ut fuga asperiores illo laborum assumenda odio
            nulla, velit molestiae praesentium hic? Numquam minus, fugit fugiat
            eligendi iure porro totam at ducimus, dolorem necessitatibus quae
            nesciunt culpa nam nemo soluta, dolore officia dignissimos similique
            asperiores pariatur reiciendis dolores incidunt. Atque, totam nemo?
            Saepe consectetur velit, voluptatibus incidunt quibusdam itaque
            explicabo est quisquam dolor ipsa doloremque pariatur sequi, enim
            commodi praesentium, debitis sapiente molestiae vel autem eum!
            Cupiditate iusto ratione hic vitae cumque quisquam laborum iste
            excepturi accusamus laudantium accusantium fugit blanditiis quam
            quibusdam culpa natus, sed maxime magni repudiandae consectetur
            ipsum veniam cum enim? Tempore sunt fuga recusandae est dicta
            voluptate adipisci magni itaque illo nobis ipsum debitis dolores qui
            officiis quis porro cum voluptatem necessitatibus doloribus,
            numquam, beatae dignissimos veniam. Fugiat rerum, quo labore veniam
            vitae cupiditate porro illum eum libero explicabo quasi, aperiam
            corporis ipsam, minus laboriosam. Hic, repudiandae ad. Veniam
            deserunt, molestiae quas recusandae eaque aliquam laborum aut animi
            tempora? Expedita non vitae, ad nulla fugit ducimus hic, architecto
            quibusdam ea neque itaque facere dolorem adipisci praesentium libero
            delectus explicabo laboriosam aut minima soluta doloribus
          </p>
        </div>
        <div
          className='right-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'canter',
            alignItems: 'center',
            width: '40%',
            padding: '0 1rem',
          }}
        >
          <Link to='/form' style={{ width: '100%', marginBottom: '2rem' }}>
            <Button
              style={{
                width: '100%',
                height: '37px',
                backgroundColor: '389a08b',
              }}
              type='button'
            >
              Publish New Article
            </Button>
          </Link>
          <Dropdown style={{ width: '100%' }}>
            <Dropdown.Toggle
              style={{ width: '100%' }}
              variant='success'
              id='dropdown-basic'
            >
              My Articles
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>name</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>name</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>name</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
