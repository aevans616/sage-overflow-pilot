import { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router';
// import JoditEditor from 'jodit-react';
import EditorJS from '@editorjs/editorjs';
//* each editor tool must be installed one at a time: npm i @editorjs/header
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Attaches from '@editorjs/attaches';
import SimpleImage from '@editorjs/simple-image';
import Warning from '@editorjs/warning';

import {
  getLastArticleId,
  getArticlesByID,
  updateArticle,
  deleteArticle,
  supabase,
  parseJsonData,
} from '../utilities/utilityFunctions';

console.clear();

// Before pushing new data to the article table check if title and content are not undefined, null or empty string
const isContentNull = (title: string, body: string): boolean => {
  if (!title && !body) {
    console.log('Cannot post: Title and Body are missing');
    return false;
  }

  if (!title) {
    console.log('Cannot post: Title is missing');
    return false;
  }

  if (!body) {
    console.log('Cannot post: Body is missing');
    return false;
  }

  return true;
};

//* EDITOR COMPONENT
//* EDITOR COMPONENT

//^
// TODO: Currently you can only press 'Update' btn if the title has changed. Update it so that it changes if title or body content has changed.
//^

// TODO export to its own file
const Editor = ({ data, onChange, editorBlock }) => {
  const ref = useRef();

  useEffect(() => {
    const EDITOR_JS_TOOLS = {
      header: Header,
      list: List,
      quote: Quote,
      warning: Warning,
      marker: Marker,
      attaches: Attaches,
      image: SimpleImage,
      embed: Embed,
      // embed only supports the following services: https://github.com/editor-js/embed
    };

    //
    //
    //
    //

    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlock,
        placeholder: 'Begin writing...',
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={editorBlock} />;
};

//^ ARTICLE FORM COMPONENT
//^ ARTICLE FORM COMPONENT

export default function ArticleForm() {
  const location = useLocation();
  const dataReceived = location.state; // stores the article.id data from when user clicks Edit btn on the SingleArticle Page. Necessary for getting currentArticle value

  const [loading, setLoading] = useState(true);

  // tracks if the article is ready to be updated
  const [updateReady, setUpdateReady] = useState(false);

  const [currentArticle, setCurrentArticle] = useState(dataReceived);

  // stores new article title
  const [articleTitle, setArticleTitle] = useState(currentArticle.title);

  // currentArticle holds all of the currently displayed articles data in an obj
  const [lastId, setLastId] = useState(1); // for storing the latest article id in Supabase

  const [content, setContent] = useState(currentArticle.content); // stores new article data

  const determineTitleValue = () => {
    // console.log(articleTitle);
    if (articleTitle === '') {
      return '';
    }

    if (articleTitle) {
      return articleTitle;
    } else if (currentArticle && currentArticle.title) {
      return currentArticle.title;
    }
  };

  const hasContentChanged = () => {
    if (
      articleTitle !== currentArticle.title ||
      content !== currentArticle.content
    ) {
      setUpdateReady(true);
    } else {
      setUpdateReady(false);
    }
  };

  const printRelevantData = () => {
    // console.log(currentArticle.content);
    console.log('currentArticle ', currentArticle);
    console.log('content', content);
    // console.log('dataReceived ', dataReceived);
  };

  // printRelevantData();

  //* Variables for article table
  interface ArticleData {
    id: number;
    author_id: number;
    last_editor_id: number;
    title: string;
    content: string | any;
    created_at: Date;
    is_published: boolean;
    last_modified: Date;
    archive_date: Date | null;
    view_count: number;
  }

  const newArticle: ArticleData = {
    id: lastId,
    author_id: 101, // hardcoded until login functionality / user roster is built
    last_editor_id: 101,
    title: articleTitle,
    content: content, // content row === content state var
    created_at: new Date(),
    is_published: true,
    last_modified: new Date(),
    archive_date: null,
    view_count: 1,
  };

  //& Effect 1
  //& Effect 1
  useEffect(() => {
    getLastArticleId(setLastId, supabase);
    getArticlesByID(
      (article) => {
        setCurrentArticle(article);
        setLoading(false);
      },
      supabase,
      dataReceived
    );
  }, []); // Empty dependency array, run only once

  //& Effect 2
  //& Effect 2
  useEffect(() => {
    if (currentArticle && currentArticle.content) {
      const parsed = parseJsonData(currentArticle.content);
      // console.log('parsed content', parsed);
      setContent(parsed);
    }
  }, [currentArticle]); // runs when currentArticle updates

  //& Effect 3
  //& Effect 3

  // useEffect(() => {
  //   hasContentChanged();
  // }, [articleTitle, currentArticle, content]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form
          style={{
            width: '100%',
            padding: '1rem',
            outline: '2px solid #f2f2f5',
          }}
        >
          <Form.Group
            className='mb-3'
            controlId='formBasicEmail'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              // alignItems: 'center',
              gap: '0.25rem',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <Form.Label style={{ width: '100%', textAlign: 'left' }}>
              Article Title
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Title'
              value={determineTitleValue()}
              onChange={(event) => {
                if (event.target.value.length === 0) {
                  setArticleTitle('');
                } else {
                  setArticleTitle(event.target.value);
                }
                setUpdateReady(true);
              }}
            />
            <Form.Label
              style={{ width: '100%', marginTop: '2rem', textAlign: 'left' }}
            >
              Article Content
            </Form.Label>

            {/* //& EDITOR */}
            {/* //^ EDITOR */}
            {/* //& EDITOR */}
            {!content ? null : (
              <Editor
                data={content ? content : null}
                onChange={setContent}
                editorBlock='editorjs-container'
              />
            )}
            <div
              className='buttons-wrapper'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                marginTop: '2rem',
              }}
            >
              <Button
                id='save-draft-btn'
                type='button'
                style={{
                  width: '8rem',
                  color: '#000',
                  background: 'transparent',
                  border: '2px solid crimson',
                }}
                onClick={() => {
                  //TODO: this should archive instead of delete.
                  // prompt user to confirm deletion
                  const confirmation = prompt(
                    'Are you sure you want to delete this article? Type YES to confirm.'
                  );
                  if (confirmation === 'YES') {
                    deleteArticle(supabase, currentArticle.id);

                    // alert('Article deleted successfully');
                    // Redirect to articles page or home page
                    window.location.href = '/articles';
                  } else {
                    alert('Deletion cancelled');
                  }
                }}
              >
                Delete
              </Button>

              <div className=''>
                <Button
                  id='save-draft-btn'
                  type='button'
                  style={{
                    width: '8rem',
                    marginRight: '1rem',
                    background: 'transparent',
                    border: '2px solid #83a18a',
                  }}
                  onClick={() => {
                    alert('save draft');
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  id='update-btn'
                  type='button'
                  style={{
                    width: '8rem',
                  }}
                  disabled={!updateReady ? true : false}
                  onClick={() => {
                    // First check if the articleTitle or content has been changed, if so set updateReady to true

                    // Post article data to supabase
                    if (isContentNull(articleTitle, content)) {
                      // saveEditorData();
                      // publishArticle(supabase, newArticle);
                      updateArticle(supabase, newArticle, currentArticle.id);
                    } else {
                      throw new Error(
                        'Cannot post a new article without a title or body content'
                      );
                    }
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </Form.Group>
        </Form>
      )}
    </>
  );
}
