import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import ArticleCard from '../components/ArticleCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Articles() {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticle();
  }, []);

  async function getArticle() {
    const { data } = await supabase.from('article').select();
    setArticle(data);
    console.log(data);
  }

  return (
    <>
      <div
        className='article-wrapper w-75 p-4 d-flex flex-row flex-wrap gap-3 justify-content-center bg-success '
        style={{ boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)' }}
      >
        {article.map((entry: any) => (
          <>
            <ArticleCard
              key={entry.id}
              imgURL={entry.image_url}
              cardTitle={entry.title}
              cardContent={entry.content}
            />
          </>
        ))}
      </div>
    </>
  );
}
