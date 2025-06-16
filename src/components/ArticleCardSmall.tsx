import React from 'react';
import { Link } from 'react-router';

// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ArticleCardSmall(props) {
  return (
    <Link to='/singlearticle' className='text-decoration-none'>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '11rem',
          maxWidth: '11rem',
          height: '7rem',
          maxHeight: '10rem',
          padding: '0.4rem',
          borderRadius: '2',
          border: '2px solid #78977f',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)',
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // margin: '0',
              // padding: '0',
              fontSize: '18px',
              textDecoration: 'none',
              // border: '2px solid red',
            }}
          >
            {props.cardTitle}
          </Card.Title>
          {/* <Card.Text className='text-truncate'>{props.cardContent}</Card.Text> */}
          {/* <Button variant='outline-primary'>Read Article</Button> */}
        </Card.Body>
      </Card>
    </Link>
  );
}
