import close from '../assets/icons/close.png';

export default function TagPill(props) {
  return (
    <div
      className='tag-pill'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '3px',
        maxWidth: 'fit-content',
        height: 'fit-content',
        border: '1px solid #78977f',
        borderRadius: '6px',
        cursor: 'pointer',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.08)',
      }}
    >
      <p style={{ margin: '0', padding: '0 5px' }}>{props.tagName}</p>
      <img
        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
        src={close}
        alt='close icon'
        onClick={() => {
          props.removeTag();
        }}
      />
    </div>
  );
}
