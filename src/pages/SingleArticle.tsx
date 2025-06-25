import { useState, useEffect } from 'react';
import { getArticles, supabase } from '../utilities/utilityFunctions';

export default function SingleArticle(props) {
  const [article, setArticle] = useState([]);

  console.log(article);

  useEffect(() => {
    getArticles(setArticle, supabase);
  }, []);

  return <div className='single-article-wrapper'></div>;
}
