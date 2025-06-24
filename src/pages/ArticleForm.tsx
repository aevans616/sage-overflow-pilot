import { useState, useRef, useMemo, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button, Form } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import {
  getLastArticleId,
  publishArticle,
} from '../utilities/utilityFunctions';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

//TODO: Update default editor alignment
console.clear();

export default function ArticleForm({ placeholder }) {
  const editor = useRef(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [content, setContent] = useState('');
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

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typing...',
    }),
    [placeholder]
  );

  useEffect(() => {
    getLastArticleId(setLastId, supabase);
  }, []); // Empty dependency array, run only once

  return (
    <Form>
      <Form.Group
        className='mb-3'
        controlId='formBasicEmail'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '0.25rem',
          width: '100%',
        }}
      >
        <Form.Label style={{ width: '100%', textAlign: 'left' }}>
          Article Title
        </Form.Label>
        {/* //TODO get title data, place into state, include in ArticleData interface */}
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
        <JoditEditor
          className='w-100'
          ref={editor}
          value={content}
          //^ value will be set to data from backend or "content" for new text
          config={config}
          tabIndex={1} // tabIndex of the editor
          onBlur={(newContent) => setContent(newContent)} // Update content on blur for performance reasons
          onChange={(newContent) => {
            setContent(newContent);
            // console.log(newContent);
          }}
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
              // push article data to supabase
              publishArticle(supabase, newArticle);
              console.log(content);
            }}
          >
            Publish
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}
