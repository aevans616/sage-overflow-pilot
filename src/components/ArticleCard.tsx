import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const sampleContent = {
  title: 'How to reset your password.',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio accusamus a, cumque ullam delectus dolore labore, eum eligendi asperiores placeat quasi exercitationem explicabo dolorem! Expedita numquam quo sequi iure neque!',
  src: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function ArticleCard(props) {
  return (
    <Card style={{ width: '16rem', padding: '0.6rem' }}>
      <Card.Img variant='top' src={props.imgSrc || sampleContent.src} />
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
