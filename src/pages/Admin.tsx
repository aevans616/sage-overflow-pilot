import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import { getArticle } from '../utilities/utilityFunctions';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticle(setArticles, supabase);
  }, []);

  console.log(articles);

  return (
    <div
      style={{
        width: '75%',
        height: 'fit-content',
        // border: '2px solid red',
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
            width: '70%',
            padding: '0 1rem',
            borderRight: '2px solid #eee',
          }}
        >
          <h3 style={{ marginBottom: '2rem' }}>My Published Articles</h3>
          {/* TODO: show list of the users published article*/}
          <p style={{ color: 'red', textAlign: 'left' }}>
            currently set to only display articles written by author_id: 101.
            Make dynamic once users are setup
          </p>
          {articles.map((entry: any) =>
            entry.author_id === 101 && entry.is_published === true ? (
              <div
                className='article-entry-wrapper'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  margin: '0.25rem 0',
                }}
              >
                <a
                  href=''
                  style={{
                    fontSize: '18px',
                    textDecoration: 'none',
                  }}
                >
                  {entry.title}
                </a>
              </div>
            ) : null
          )}
          <h3 style={{ margin: '3rem 0 2rem 0' }}>My Drafts</h3>
          <p style={{ color: 'red', textAlign: 'left' }}>
            currently set to only display drafts written by author_id: 101. Make
            dynamic once users are setup
          </p>
          {articles.map((entry: any) =>
            entry.is_published === false && entry.is_deleted === false ? (
              <div
                className='article-entry-wrapper'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  margin: '0.25rem 0',
                }}
              >
                <a
                  href=''
                  style={{
                    fontSize: '18px',
                    textDecoration: 'none',
                  }}
                >
                  {entry.title}
                </a>
              </div>
            ) : null
          )}
        </div>
        <div
          className='right-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'canter',
            alignItems: 'center',
            gap: '2rem',
            width: '30%',
            padding: '0 1rem',
          }}
        >
          <Link to='/form' style={{ width: '100%' }}>
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
          {/* <Dropdown style={{ width: '100%' }}>
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
          </Dropdown> */}
          {/*  */}
        </div>
      </div>
    </div>
  );
}
