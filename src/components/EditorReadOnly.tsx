import { useEffect, useRef } from 'react';
// import JoditEditor from 'jodit-react';
import EditorJS from '@editorjs/editorjs';
//* each editor tool must be installed one at a time: npm i @editorjs/header
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Attaches from '@editorjs/attaches';
import SimpleImage from '@editorjs/simple-image';
import Warning from '@editorjs/warning';

export default function EditorReadOnly({ data, onChange, editorBlock }) {
  const ref = useRef();

  useEffect(() => {
    const EDITOR_JS_TOOLS = {
      header: Header,
      list: List,
      quote: Quote,
      warning: Warning,
      marker: Marker,
      attaches: Attaches,
      image: SimpleImage,
      embed: Embed,
      // embed only supports the following services: https://github.com/editor-js/embed
    };

    //
    //
    //
    //

    if (!ref.current) {
      const editor = new EditorJS({
        readOnly: true,
        holder: editorBlock,
        placeholder: '',
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={editorBlock} />;
}
