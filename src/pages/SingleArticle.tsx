import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import EditorReadOnly from '../components/EditorReadOnly';
import { Button } from 'react-bootstrap';
import eye from '../assets/eye.png';
import {
  getArticlesByID,
  supabase,
  parseJsonData,
  calculateReadTime,
} from '../utilities/utilityFunctions';

export default function SingleArticle() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(article.content);

  const navigate = useNavigate();
  const { id } = useParams(); // article id derived from the current url: eg singlearticle/16

  console.clear();
  console.log(content);

  useEffect(() => {
    getArticlesByID(setArticle, supabase, id);
  }, []);

  //& Effect 2
  //& Effect 2
  useEffect(() => {
    if (article && article.content) {
      const parsed = parseJsonData(article.content);
      console.log('parsed content', parsed);
      setContent(parsed);
      setLoading(false);
    }
  }, [article]); // runs when article updates

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className='single-article-wrapper'
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
            minHeight: 'fit-content',
            textAlign: 'left',
            // outline: '2px solid red',
          }}
        >
          <div
            className='edit-btn-wrapper'
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              marginBottom: '2rem',
              textAlign: 'left',
              // outline: '2px solid green',
            }}
          >
            {/* //^ EDIT BUTTON */}
            <Button
              id='edit-article-btn'
              type='button'
              style={{
                width: '8rem',
              }}
              onClick={(e) => {
                e.preventDefault();
                const dataToPass = article.id;
                navigate('/form', { state: dataToPass });
              }}
            >
              Edit
            </Button>
          </div>
          <div
            className='title-author-views-wrapper'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
              margin: '0 0 2rem 0',
              height: 'fit-content',
              // border: '2px solid blue',
            }}
          >
            <h2 className='m-0 ' style={{ width: '65%' }}>
              {article.title}
            </h2>
            <div
              className='author-views-wrapper'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '35%',
                maxWidth: '250px',
                paddingRight: '1rem',
                // border: '2px solid green',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <p
                  style={{
                    // width: 'fit-content',
                    // maxHeight: '18px',
                    margin: '0 1rem 0 0',
                    // outline: '2px solid red',
                  }}
                >
                  {calculateReadTime(article.content)}
                </p>

                <img
                  src={eye}
                  alt='eye / view count'
                  style={{
                    width: '18px',
                    height: '18px',
                    margin: '3px 4px 0 0',
                  }}
                />
                <p className='m-0'>{article.view_count}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
                className='author'
              >
                <p className='m-0'>{`Author: ${article.author_id}`}</p>
              </div>
            </div>
          </div>
          <div
            className='content-wrapper'
            style={{
              display: 'flex',
              // flexDirection: 'row',
              justifyContent: 'flex-end',
              width: 'fit-content',
              maxWidth: '60vw',
              padding: '0 0 0 1rem',
              // overflow: 'scroll',
              // border: '2px solid red',
            }}
          >
            {/* //^ EDITOR READONLY COMPONENT HERE */}
            <EditorReadOnly
              data={content ? content : 'error'}
              onChange={null}
              editorBlock='editorjs-container'
            />
          </div>
        </div>
      )}
    </>
  );
}
