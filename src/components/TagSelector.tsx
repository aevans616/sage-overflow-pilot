import { useState, useEffect } from 'react';
import TagPill from './TagPill';
import { supabase, getTags } from '../utilities/utilityFunctions';

export default function TagSelector(props) {
  const [allTags, setAllTags] = useState([]);
  const [userSelectedTags, setUserSelectedTags] = useState([]);

  function FuzzyTagInput({ allTags, userSelectedTags, setUserSelectedTags }) {
    const [inputValue, setInputValue] = useState('');
    const [filteredTags, setFilteredTags] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // console.log('user selected tags: ', userSelectedTags);

    useEffect(() => {
      if (inputValue.trim() === '') {
        setFilteredTags([]);
        setShowDropdown(false);
        return;
      }
      // Simple fuzzy search (case-insensitive substring match)
      const matches = allTags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          !userSelectedTags.includes(tag.name)
      );
      setFilteredTags(matches);
      setShowDropdown(matches.length > 0);
    }, [inputValue, allTags, userSelectedTags]);

    const handleSelectTag = (tagName) => {
      setUserSelectedTags([...userSelectedTags, tagName]);
      setInputValue('');
      setShowDropdown(false);
    };

    return (
      <div style={{ position: 'relative', width: '250px' }}>
        <input
          type='text'
          value={inputValue}
          placeholder='Search tags...'
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '100%',
            padding: '6px',
            color: '#000',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          onFocus={() => setShowDropdown(filteredTags.length > 0)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay to allow click
        />
        {showDropdown && (
          <ul
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              zIndex: 10,
              listStyle: 'none',
              margin: 0,
              padding: 0,
              maxHeight: '150px',
              overflowY: 'auto',
            }}
          >
            {filteredTags.map((tag) => (
              <li
                key={tag.id}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
                onMouseDown={() => handleSelectTag(tag.name)}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  useEffect(() => {
    // fetch all predefined tags from Supabase
    getTags(supabase, setAllTags);
  }, []);
  return (
    <div className='tag-selector-component-wrapper'>
      <div
        className='tag-selector-input-wrapper'
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '0.6rem',
          padding: '6px',
          border: '1px solid #d9dee2',
          borderRadius: '6px',
        }}
      >
        <div
          className='tag-selector-input'
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <FuzzyTagInput
            allTags={allTags}
            userSelectedTags={userSelectedTags}
            setUserSelectedTags={setUserSelectedTags}
          />
        </div>
      </div>
      <div
        className='user-selected-tags'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.6rem',
          minHeight: '50px',
          marginTop: '1rem',
          padding: '6px',
          border: '1px solid #d9dee2',
          borderRadius: '6px',
        }}
      >
        {userSelectedTags.map((tagName, index) => (
          <TagPill
            key={index}
            tagName={tagName}
            removeTag={() => {
              // remove the selected tag from userSelectedTags state array
              // console.log('tag to remove: ', tagName);

              const newSelectedTags = [...userSelectedTags];
              const indexToRemove: number = userSelectedTags.indexOf(tagName);

              if (indexToRemove !== -1) {
                newSelectedTags.splice(index, 1);
                setUserSelectedTags(newSelectedTags);
              }
              // display newSelectedTags instead of userSelectedTags, because state updates are asynchronous and my not be ready yet
              console.log('userSelectedTags after removal: ', newSelectedTags);
            }}
          />
        ))}
      </div>
    </div>
  );
}
