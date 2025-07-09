import { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router';
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
  publishArticle,
  supabase,
  parseJsonData,
} from '../utilities/utilityFunctions';

console.clear();

// Before pushing new data to the article table check if title and content are not undefined, null or empty string
const isContentNull = (title: string, body: string): boolean => {
  if (!title || !body) {
    return false;
  }
  return true;
};

//* EDITOR COMPONENT
//* EDITOR COMPONENT

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

export default function PublishNewArticle() {
  const location = useLocation();
  const dataReceived = location.state; // stores the article.id data from when user clicks Edit btn on the SingleArticle Page. Necessary for getting currentArticle value

  const [articleTitle, setArticleTitle] = useState(''); // stores new article title
  const [currentArticle, setCurrentArticle] = useState(dataReceived);

  // currentArticle holds all of the currently displayed articles data in an obj
  const [lastId, setLastId] = useState(1); // for storing the latest article id in Supabase

  const [content, setContent] = useState(); // stores new article data

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
      console.log('parsed content', parsed);
      setContent(parsed);
    }
  }, [currentArticle]); // runs when currentArticle updates

  return (
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
          onChange={(event) => {
            setArticleTitle(event.target.value);
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

        <Editor
          data={content}
          onChange={setContent}
          editorBlock='editorjs-container'
        />

        <div
          className='buttons-wrapper'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            marginTop: '2rem',
          }}
        >
          <Button
            id='form-publish-btn'
            type='button'
            style={{
              width: '8rem',
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
            id='form-draft-btn'
            type='button'
            style={{
              width: '8rem',
            }}
            onClick={() => {
              // Post article data to supabase
              if (isContentNull(articleTitle, content)) {
                // saveEditorData();
                publishArticle(supabase, newArticle);
              } else {
                throw new Error(
                  'Cannot post a new article without a title or body content'
                );
              }
            }}
          >
            Publish
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}
