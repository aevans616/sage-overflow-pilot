import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ArticleCard from '../components/ArticleCard';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getArticles,
  truncateText,
  supabase,
  formatTimestampToMonthDDYYYY,
  incrementViewCount,
} from '../utilities/utilityFunctions';

export default function Articles() {
  const [selectedSortValue, setSelectedSortValue] = useState('newest');
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();

  const sortArticles = (type: string) => {
    const sortedArticles = [...article];
    if (type === 'newest') {
      setSelectedSortValue('newest');
      // sort articles by newest
      sortedArticles.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      // sort articles by olders
    } else if (type === 'oldest') {
      setSelectedSortValue('oldest');

      sortedArticles.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      // sort articles by most popular
    } else if (type === 'popular') {
      setSelectedSortValue('popular');

      sortedArticles.sort((a, b) => b.view_count - a.view_count);
    }
    setArticle(sortedArticles);
  };

  const sortCriteria = (criteria: string, highlight?: boolean) => (
    <a
      href=''
      style={{
        fontWeight: '400',
        color: '#000',
        cursor: 'pointer',
        textTransform: 'capitalize',
        textUnderlineOffset: '4px',
        textDecoration: criteria === selectedSortValue ? 'underline' : 'none',
      }}
      onClick={(e) => {
        e.preventDefault();
        sortArticles(criteria);
      }}
    >
      {criteria}
    </a>
  );

  useEffect(() => {
    getArticles(setArticle, supabase);
  }, []);

  return (
    <>
      <div className='content-wrapper w-75 d-flex flex-column justify-content-center text-center mb-3 '>
        <Navbar
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            padding: '1rem',
            boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)',
          }}
          className='bg-primary'
        >
          <h2 className='mb-4 text-white'>Looking for help?</h2>
          <Form
            style={{
              width: 'auto',
              maxWidth: '665px',
            }}
          >
            <Row
              style={{
                margin: '0',
                padding: '0',
              }}
            >
              <Col
                style={{
                  margin: '0',
                  width: '50%',
                  maxWidth: '400px',
                }}
              >
                <Form.Control type='text' placeholder='Search for an article' />
              </Col>
              <Col xs='auto'>
                <Button
                  style={{
                    backgroundColor: 'white',
                  }}
                  type='submit'
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Navbar>
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
          className='article-wrapper w-100 p-4 d-flex flex-column flex-wrap gap-4 justify-content-center bg-success '
          style={{ boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.15)' }}
        >
          {article.map((entry: any) => (
            <ArticleCard
              key={entry.id}
              imgURL={entry.image_url}
              cardTitle={entry.title}
              cardContent={truncateText(entry.content)}
              datePublished={formatTimestampToMonthDDYYYY(entry.created_at)}
              views={entry.view_count}
              handleClick={(e) => {
                e.preventDefault();
                incrementViewCount(entry.view_count, entry.id);
                navigate(`/singlearticle/${entry.id}`);
                // console.log(entry);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
