import { useState, useRef, useMemo, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from 'react-bootstrap';
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
  const [content, setContent] = useState('');
  const [lastId, setLastId] = useState(1); // for storing the latest article id in Supabase

  //* Variables for article table
  interface ArticleData {
    id: number;
    author_id: number;
    created_at: Date;
    last_modified: Date;
    archive_date: Date | null;
    last_editor_id: number;
    view_count: number;
    content: string | any;
    is_published: boolean;
  }

  const newArticle: ArticleData = {
    id: lastId, // hardcoded for now
    author_id: 101, // hardcoded until login functionality / user roster is built
    created_at: new Date(),
    last_modified: new Date(),
    archive_date: null,
    last_editor_id: 101,
    view_count: 1,
    //^ For view_count get data from backend if article already exists, otherwise set to 1
    content: content,
    //^ content row === content state var
    is_published: true,
  };

  console.log('next article_id will be: ' + newArticle.id);

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
    <div
      className='form-wrapper'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
      }}
    >
      <JoditEditor
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
          width: '90%',
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
    </div>
  );
}
