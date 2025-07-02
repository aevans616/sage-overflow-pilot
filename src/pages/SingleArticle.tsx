import { useState, useEffect } from 'react';
import { getArticlesByID, supabase } from '../utilities/utilityFunctions';
import { useParams, useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import eye from '../assets/eye.png';

export default function SingleArticle(props) {
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // article id derived from the current url: eg singlearticle/16
  // console.log(id);

  // console.log('id: ', id, typeof id);
  // console.log(article[0].id);

  const convertHtmlToPlainText = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || ''; // .textContent is preferred
  };

  const htmlFromBackend = article.content;
  const plainText = convertHtmlToPlainText(htmlFromBackend);
  // console.log(plainText);

  useEffect(() => {
    getArticlesByID(setArticle, supabase, id);
  }, []);

  return (
    <div
      className='single-article-wrapper'
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
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
          alignItems: 'center',
          width: '100%',
          margin: '0 0 2rem 0',
          height: 'fit-content',
          // border: '2px solid blue',
        }}
      >
        <h2 className='m-0 ' style={{ width: '80%' }}>
          {article.title}
        </h2>
        <div
          className='author-views-wrapper'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '20%',
            maxWidth: '175px',
            paddingRight: '1rem',
            // border: '2px solid red',
          }}
        >
          <p className='m-0 me-1'>{`Author: ${article.author_id}`}</p>
          <img
            src={eye}
            alt='eye / view count'
            style={{ width: '18px', height: '18px', margin: '3px 10px 0 0' }}
          />
          <p className='m-0'>{article.view_count}</p>
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
          // border: '2px solid red',
        }}
      >
        {plainText}
      </div>
    </div>
  );
}
