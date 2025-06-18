import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//TODO truncate title text after X amount of characters

export default function ArticleCard(props) {
  return (
    <Card
      style={{
        width: '15rem',
        maxWidth: '15rem',
        maxHeight: '21rem',
        padding: '0.4rem',
        borderRadius: '2',
        border: 'none',
        boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.03)',
      }}
    >
      <Card.Img
        style={{
          margin: '0',
          width: '227px',
          height: '154px',
          borderRadius: '10px',
        }}
        variant='top'
        src={props.imgURL}
        className='img-thumbnail'
      />
      <Card.Body style={{ padding: '1rem 0.5rem' }}>
        <Card.Title
          style={{ margin: '0 0 1rem 0', fontSize: '18px', fontWeight: '500' }}
        >
          {props.cardTitle}
        </Card.Title>
        {/* <Card.Text className='text-truncate'>{props.cardContent}</Card.Text> */}
        <Button variant='outline-primary' onClick={props.handleClick}>
          Read Article
        </Button>
      </Card.Body>
    </Card>
  );
}
