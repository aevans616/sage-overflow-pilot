import { useState, useEffect, useRef, memo } from 'react';
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

export default function ArticleForm() {
  const location = useLocation();
  const dataReceived = location.state; // stores the article.id data from when user clicks Edit btn on the SingleArticle Page. Necessary for getting currentArticle value

  const [loading, setLoading] = useState(true);
  const [articleTitle, setArticleTitle] = useState(''); // stores new article title
  const [currentArticle, setCurrentArticle] = useState(dataReceived);

  // currentArticle holds all of the currently displayed articles data in an obj
  const [lastId, setLastId] = useState(1); // for storing the latest article id in Supabase

  const [content, setContent] = useState(currentArticle.content); // stores new article data

  const tempParsedData = JSON.parse(
    '{"time":1751409579527,"blocks":[{"id":"DSkQQ-m9MP","type":"header","data":{"text":"Temp Data - content still not working","level":2}},{"id":"DIVnZCKC3t","type":"paragraph","data":{"text":"<mark class=\\"cdx-marker\\">TEMPORARY DATA, whether your institution provides an account or you\'re using the free \\"Canvas Free-for-Teacher\\" option. For those affiliated with a school or university, you\'ll typically log in through your institution\'s specific Canvas URL, which often follows a format like [yourschoolname].instructure.com or canvas.[yourschoolname].edu. Your school will provide your unique username (which could be an email, student ID, or another login) and password. Some institutions integrate Canvas directly into their main website or portal, so you might access it after logging into your school\'s system.</mark>"}},{"id":"iqG9MCx7Xl","type":"paragraph","data":{"text":"<i>If you\'re unsure of your specific login credentials or URL, your IT department or a site administrator at your institution is the best resource for assistance. If you\'re using the \\"Canvas Free-for-Teacher\\" account, you can access it by navigating to https://canvas.instructure.com or https://k12.instructure.com. After creating your free account, you\'ll use the email address and</i> password you set up during registration to log in. Once inside Canvas, you\'ll be greeted by your Dashboard, which provides an overview of your courses.From here, you can begin building or importing course content, managing assignments, discussions, and quizzes, and inviting students to join your virtual classroom. Remember to publish both your individual modules and the entire course to make them visible and accessible to your students."}}],"version":"2.31.0-rc.7"}'
  );
  console.log('temp', tempParsedData);

  // console.log(currentArticle.content);
  // console.log('currentArticle ', currentArticle);
  // console.log(currentArticle.content);
  // console.log('content', content);
  // console.log('dataReceived ', dataReceived);

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
      console.log('parsed content', parsed);
      setContent(parsed);
    }
  }, [currentArticle]); // runs when currentArticle updates

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
              placeholder={
                currentArticle.title ? currentArticle.title : 'Enter Title'
              }
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
            {!content ? null : (
              <Editor
                data={content ? content : tempParsedData}
                onChange={setContent}
                editorBlock='editorjs-container'
              />
            )}
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
      )}
    </>
  );
}
