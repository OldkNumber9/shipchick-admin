'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Link,
    Heading,
    List,
    Indent,
    Image,
    ImageToolbar,
    ImageUpload,
    BlockQuote,
    Table,
    TableToolbar,
    MediaEmbed,
  } from 'ckeditor5';
  import 'ckeditor5/ckeditor5.css';

// interface ClientSideCustomEditorProps {
//   value: string;
//   onChange: (data: string) => string;
// }

export default function ClientSideCustomEditor ({ value, onChange }: { value: string; onChange: (data: string) => void })  {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        licenseKey: 'GPL', // Leave empty or 'GPL'
        plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Link,
            Heading,
            List,
            Indent,
            Image,
            ImageToolbar,
            ImageUpload,
            BlockQuote,
            Table,
            TableToolbar,
            MediaEmbed,
          ],
        toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "indent",
              "outdent",
              "|",
              "imageUpload",
              "blockQuote",
              "insertTable",
              "mediaEmbed",
              "undo",
              "redo",
            ],
          },
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
