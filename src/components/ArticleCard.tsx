import Card from 'react-bootstrap/Card';
import { Link } from 'react-router';
import eye from '../assets/eye.png';

export default function ArticleCard(props) {
  return (
    <Link to='' style={{ textDecoration: 'none' }} onClick={props.handleClick}>
      <Card
        style={{
          width: '100%',
          maxWidth: '100%',
          height: '10rem',
          maxHeight: '21rem',
          padding: '0.4rem',
          borderRadius: '2',
          border: 'none',
          boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.03)',
        }}
      >
        <Card.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '1rem',
            padding: '1rem',
            textAlign: 'left',
          }}
        >
          <div
            className='article-card-title-state-wrapper'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'space-between',
              width: '100%',
            }}
          >
            <Card.Title
              style={{
                margin: '0',
                fontSize: '20px',
                fontWeight: '400',
              }}
            >
              {props.cardTitle}
            </Card.Title>
            <div
              className=''
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'space-between',
                width: 'fit-content',
                fontSize: '15px',
              }}
            >
              <p style={{ margin: '0 1rem 0 0' }}>{props.datePublished}</p>
              <div
                className='views-icon-text-wrapper'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={eye}
                  alt='eye icon'
                  style={{
                    width: '18px',
                    height: '18px',
                    margin: '0 5px 18px 0',
                  }}
                />
                <p>{props.views}</p>
              </div>
            </div>
          </div>
          <Card.Text
            style={{
              height: 'fit-content',
              // border: '2px solid red',
            }}
            className=''
          >
            {props.cardContent}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
