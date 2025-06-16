import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const sampleContent = {
  title: 'How to reset your password.',
  content: 'dummy text',
  src: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

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
        style={{ width: '227px', height: '154px', borderRadius: '10px' }}
        variant='top'
        src={props.imgURL || sampleContent.src}
        className='img-thumbnail'
      />
      <Card.Body>
        <Card.Title>{props.cardTitle || sampleContent.title}</Card.Title>
        <Card.Text className='text-truncate'>
          {props.cardContent || sampleContent.content}
        </Card.Text>
        <Button variant='outline-primary'>Read Article</Button>
      </Card.Body>
    </Card>
  );
}
