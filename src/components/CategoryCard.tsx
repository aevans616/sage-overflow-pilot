import Card from 'react-bootstrap/Card';

export default function CategoryCard(props) {
  //TODO get data from backed then map though it in App.tsx
  return (
    <div>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '10rem',
          maxWidth: '10rem',
          height: '7rem',
          maxHeight: '7rem',
          padding: '0.4rem',
          borderRadius: '2',
          border: '2px solid #78977f',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)',
        }}
      >
        <Card.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card.Title
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0',
              fontSize: '18px',
              textDecoration: 'none',
              //   border: '2px solid red',
            }}
          >
            {props.cardTitle}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
