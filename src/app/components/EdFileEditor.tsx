// components/EdFileEditor.tsx
"use client"

import React, { useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

type EdFileEditorProps = {
  content: string;
  onChange: (newContent: string) => void;
};

const EdFileEditor: React.FC<EdFileEditorProps> = ({ content, onChange }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access window or any browser-specific API
      // Initialize or update your editor
    }
  }, []);

  const handleEditorChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <MonacoEditor
      width="100%"
      height="600px"
      language="plaintext" // Use a language like 'plaintext' for basic text files
      theme="vs-dark"
      value={content}
      options={{ selectOnLineNumbers: true }}
      onChange={handleEditorChange}
    />
  );
};

export default EdFileEditor;
