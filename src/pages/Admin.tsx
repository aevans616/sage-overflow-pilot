import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {
  getArticles,
  supabase,
  incrementViewCount,
} from '../utilities/utilityFunctions';

export default function Admin() {
  const [articles, setArticles] = useState([]);

  const linkToArticle = (props) => {
    <Link
      to={`/singlearticle/${props.entry.id}`}
      key={props.entry.id}
      className='article-entry-wrapper'
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        margin: '0.25rem 0',
        fontSize: '18px',
        textDecoration: 'none',
      }}
      onClick={() => {
        incrementViewCount(props.entry.view_count, props.entry.id);
      }}
    >
      {props.entry.title}
    </Link>;
  };

  useEffect(() => {
    getArticles(setArticles, supabase);
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
          {/* //& PUBLISHED */}
          <h3 style={{ marginBottom: '2rem' }}>Published Articles</h3>
          {/* TODO: show list of the users published article*/}
          <p style={{ color: 'red', textAlign: 'left' }}>
            currently set to only display articles written by author_id: 101.
            Make dynamic once users are setup
          </p>
          {articles.map((entry: any) =>
            entry.is_published === true ? (
              <Link
                to={`/singlearticle/${entry.id}`}
                key={entry.id}
                className='article-entry-wrapper'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  margin: '0.25rem 0',
                  fontSize: '18px',
                  textDecoration: 'none',
                }}
                onClick={() => {
                  incrementViewCount(entry.view_count, entry.id);
                }}
              >
                {entry.title}
              </Link>
            ) : null
          )}
          {/* //& DRAFTS */}
          <h3 style={{ margin: '3rem 0 2rem 0' }}>Drafts</h3>
          <p style={{ color: 'red', textAlign: 'left' }}>
            currently set to only display drafts written by author_id: 101. Make
            dynamic once users are setup
          </p>
          {articles.map((entry: any) =>
            entry.is_published === false && entry.is_deleted === false ? (
              <Link
                to={`/singlearticle/${entry.id}`}
                key={entry.id}
                className='article-entry-wrapper'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  margin: '0.25rem 0',
                  fontSize: '18px',
                  textDecoration: 'none',
                }}
                onClick={() => {
                  incrementViewCount(entry.view_count, entry.id);
                }}
              >
                {entry.title}
              </Link>
            ) : null
          )}
          {/* //& ARCHIVED */}
          <h3 style={{ margin: '3rem 0 2rem 0' }}>Archived</h3>
          <p style={{ color: 'red', textAlign: 'left' }}>
            currently set to only display archived articles written by
            author_id: 101. Make dynamic once users are setup
          </p>
          {articles.map((entry: any) =>
            entry.is_published === false && entry.is_deleted === true ? (
              <Link
                to={`/singlearticle/${entry.id}`}
                key={entry.id}
                className='article-entry-wrapper'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  margin: '0.25rem 0',
                  fontSize: '18px',
                  textDecoration: 'none',
                }}
                onClick={() => {
                  incrementViewCount(entry.view_count, entry.id);
                }}
              >
                {entry.title}
              </Link>
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

          {/*  */}
        </div>
      </div>
    </div>
  );
}
