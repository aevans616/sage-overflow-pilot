import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export default function ArticleForm({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typing...',
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of the editor
      onBlur={(newContent) => setContent(newContent)} // Update content on blur for performance reasons
      onChange={(newContent) => setContent(newContent)} // Optional: handle changes in real-time
    />
  );
}
