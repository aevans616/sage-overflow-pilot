import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
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

import {
  getLastArticleId,
  publishArticle,
  supabase,
} from '../utilities/utilityFunctions';

//TODO: Update default editor alignment
console.clear();

// Before pushing new data to the article table check if title and content are not undefined, null or empty string
const isContentNull = (title: string, body: string): boolean => {
  if (!title || !body) {
    return false;
  }
  return true;
};

export default function ArticleForm({ placeholder }) {
  const [articleTitle, setArticleTitle] = useState(''); // stores new article title
  const [content, setContent] = useState(''); // stores new article data
  const [lastId, setLastId] = useState(1); // for storing the latest article id in Supabase

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

  // console.log('next article_id will be: ' + newArticle.id);

  useEffect(() => {
    getLastArticleId(setLastId, supabase);

    // create editor
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      holder: 'editor',
      placeholder: 'Write something',
      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      //TODO add images,

      //& TODO: Text links should open in a new page on click, currently user must command + click

      //? TODO:  adding a link has poor color contrast

      tools: {
        header: Header,
        list: List,
        quote: Quote,
        marker: Marker,
        attaches: Attaches,
        image: SimpleImage,
        // embed only supports the following services: https://github.com/editor-js/embed
        embed: Embed,
      },
      /**
    //!Previously saved data that should be rendered
   */
      // data: {},
    });
  }, []); // Empty dependency array, run only once

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
            // console.log(articleTitle);
          }}
        />
        <Form.Label
          style={{ width: '100%', marginTop: '2rem', textAlign: 'left' }}
        >
          Article Content
        </Form.Label>
        {/* //! EDITOR */}
        <div
          id='editor'
          style={{
            maxHeight: '85vh',
            overflow: 'scroll',
            scrollbarColor: '#000 #eee',
            scrollbarWidth: 'thin',
            outline: '2px solid #f2f2f5',
          }}
        ></div>
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
                publishArticle(supabase, newArticle);
              } else {
                throw new Error(
                  'Cannot post a new article without a title or body content'
                );
              }
              console.log('title ' + articleTitle);
              console.log('content ' + content);
            }}
          >
            Publish
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}
