import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SingleArticle(props) {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticle();
  }, []);

  async function getArticle(props) {
    const { data } = await supabase.from('article').select();
    setArticle(data);
    console.log(data[0].title);
  }
  console.log(article);
  return (
    <div className='single-article-wrapper'>
      <h1>{`{TEST ${props.title}}`}</h1>
      <h1>{`Title: ${article[0].title}`}</h1>
      <div className='author-date'>
        <h6>{`Author: ${props.author}`}</h6>
        <h6>{props.date}</h6>
      </div>
      <div className='article-content-wrapper'>
        {/* // estimated article read time */}
        <h6>{props.articleLength}</h6>
        {props.articleContent}
        {/* when was the article last updated */}
        <h6>{props.updatedate}</h6>
      </div>
    </div>
  );
}
