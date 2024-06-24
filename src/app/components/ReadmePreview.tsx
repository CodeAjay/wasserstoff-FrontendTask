// components/ReadmePreview.tsx
"use client"

import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { marked } from 'marked'; // Use named import for marked

type ReadmePreviewProps = {
  content: string;
  onChange: (newContent: string) => void;
};

const ReadmePreview: React.FC<ReadmePreviewProps> = ({ content, onChange }) => {
  const handleEditorChange = (newValue: string) => {
    onChange(newValue);
  };

  const renderMarkdown = () => {
    return { __html: marked(content) };
  };

  return (
    <div className="readme-editor max-h-screen overflow-auto">
      <MonacoEditor
        width="100%"
        height="500px"
        language="markdown" // Use 'markdown' for readme files
        theme="vs-dark"
        value={content}
        options={{ selectOnLineNumbers: true }}
        onChange={handleEditorChange}
      />
      <div
        className="readme-preview"
        style={{ padding: '20px', backgroundColor: '#f4f4f4', color: 'black', borderRadius: '5px', marginTop: '20px' }}
        dangerouslySetInnerHTML={renderMarkdown()}
      />
    </div>
  );
};

export default ReadmePreview;
