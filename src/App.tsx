import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import ArticleCard from './components/ArticleCard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticle();
  }, []);

  async function getArticle() {
    const { data } = await supabase.from('article').select();
    setArticle(data);
    console.log(data);
  }

  //TODO: Update DB articles to include an image url, or file upload. Map through entries and display them as ArticleCard Components.
  return (
    <>
      <ul>
        {article.map((entry) => (
          <>
            {/* <li key={entry.id} className=''>
              {entry.title}
            </li> */}
          </>
        ))}
      </ul>
      <div className='article-wrapper w-75 d-flex flex-row flex-wrap gap-3 justify-content-evenly '>
        <ArticleCard imgSrc='' />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </>
  );
}

export default App;
