import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArticleCardSmall from './components/ArticleCardSmall';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticle();
  }, []);

  async function getArticle() {
    const { data } = await supabase.from('article').select();
    setArticle(data);
    //  console.log(data);
  }
  return (
    <div style={{ width: '75%' }} className='home-wrapper'>
      {/* //* Searchbar */}
      <Navbar
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)',
        }}
        className='bg-body-tertiary'
      >
        <Form
          style={{
            width: 'auto',
            maxWidth: '665px',
          }}
        >
          <Row
            style={{
              margin: '0',
              padding: '0',
            }}
          >
            <Col
              style={{
                margin: '0',
                width: '50%',
                maxWidth: '400px',
              }}
            >
              <Form.Control type='text' placeholder='Search for an article' />
            </Col>
            <Col xs='auto'>
              <Button type='submit'>Search</Button>
            </Col>
          </Row>
        </Form>
        {/* <Button type='button' variant='outline-primary' className='ms-3'>
          Report a new issue
        </Button> */}
      </Navbar>

      {/* //& Page Content */}
      <div
        className='page-content-wrapper'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '100%',
          // padding: '1rem 2rem',
          // border: '2px solid red',
        }}
      >
        <h2 style={{ padding: ' 0 2rem', textAlign: 'left' }}>
          Your recent articles
        </h2>
        <div
          className='row-1-wrapper'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem 0rem 1rem 2rem',
            // width: 'fit-content',
            // maxWidth: '100%',
            // border: '2px solid red',
          }}
        >
          {/* //^ Displays first 3 database entries for now */}
          {/* //TODO? add functionality to display recently accessed content */}

          {article.slice(0, 3).map((entry: any) => (
            <ArticleCardSmall key={entry.id} cardTitle={entry.title} />
          ))}
        </div>
        {/* //* Row 2 */}
        <h2 style={{ padding: '0 2rem', textAlign: 'left' }}>
          Popular articles
        </h2>
        <div
          className='row-2-wrapper'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem 2rem',
            // width: 'fit-content',
            // maxWidth: '100%',
            backgroundColor: '#f0f0f3',
          }}
        >
          {article.map((entry: any) =>
            entry.view_count >= 150 ? (
              <ArticleCardSmall key={entry.id} cardTitle={entry.title} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
