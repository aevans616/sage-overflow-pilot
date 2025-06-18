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
    // console.log(data);
  }

  const sortArticles = (type: string) => {
    const sortedArticles = [...article];
    if (type === 'newest') {
      // sort articles by newest
      sortedArticles.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      // sort articles by olders
    } else if (type === 'oldest') {
      sortedArticles.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      // sort articles by most popular
    } else if (type === 'popular') {
      sortedArticles.sort((a, b) => b.view_count - a.view_count);
    }
    setArticle(sortedArticles);
  };

  const sortCriteria = (criteria: string) => (
    <a
      href=''
      style={{
        fontWeight: '400',
        color: '#000',
        cursor: 'pointer',
        textDecoration: 'none',
        textTransform: 'capitalize',
      }}
      onClick={(e) => {
        e.preventDefault();
        sortArticles(criteria);
      }}
    >
      {criteria}
    </a>
  );

  return (
    <>
      <div className='content-wrapper w-75 d-flex flex-column justify-content-center text-center mb-3 '>
        <div
          className='sort-by-wrapper'
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          <p>Sort By</p>
          {sortCriteria('newest')}
          {sortCriteria('oldest')}
          {sortCriteria('popular')}
        </div>

        <div
          className='article-wrapper w-100 p-4 d-flex flex-row flex-wrap gap-3 justify-content-center bg-success '
          style={{ boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)' }}
        >
          {article.map((entry: any) => (
            <ArticleCard
              key={entry.id}
              imgURL={entry.image_url}
              cardTitle={entry.title}
              cardContent={entry.content}
              handleClick={(e) => {
                e.preventDefault();
                console.log(entry);
                //& TODO: got article data from Supabase, now navigate to single article page with the appropriate data

                // window.location.href = `/singlearticle`;
                // window.location.href = `/singlearticle/${entry.id}`;
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
