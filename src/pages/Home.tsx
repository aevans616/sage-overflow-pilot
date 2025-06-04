import React from 'react';
import ArticleCard from '../components/ArticleCard';

export default function Home() {
  return (
    <div className='article-wrapper w-75 d-flex flex-row flex-wrap gap-3 justify-content-evenly border'>
      <ArticleCard imgSrc='' />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  );
}
