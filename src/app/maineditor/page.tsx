"use client"

// components/MainEditor.tsx

import React, { useRef, useEffect, useState, useCallback } from 'react';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

type MainEditorProps = {
  selectedFile: File | null;
};

const MainEditor: React.FC<MainEditorProps> = ({ selectedFile }) => {
  const editorRef = useRef<any>(null);
  const monaco = useMonaco(); // Correctly get the monaco instance
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    if (monaco && selectedFile) {
      if (editorRef.current) {
        // Dispose of the old model if it exists
        const oldModel = editorRef.current.getModel();
        if (oldModel) {
          oldModel.dispose();
        }

        const fileExtension = selectedFile.name.split('.').pop();
        const language = getFileLanguage(fileExtension);

        // Create a new model and set it to the editor
        const newModel = monaco.editor.createModel(selectedFile.content, language);
        editorRef.current.setModel(newModel);
      }
    }
  }, [monaco, selectedFile]);

  const getFileLanguage = (fileExtension: string | undefined) => {
    switch (fileExtension) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  const handleEditorChange = useCallback(
    (value: string) => {
      if (selectedFile) {
        selectedFile.content = value;
        // Update the file content in the parent state or wherever needed
      }
    },
    [selectedFile]
  );

  const handleRunClick = () => {
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split('.').pop();
    const language = getFileLanguage(fileExtension);
    const code = editorRef.current ? editorRef.current.getValue() : '';

    switch (language) {
      case 'javascript':
      case 'typescript':
        executeJavaScriptOrTypeScript(code);
        break;
      case 'html':
        executeHTML(code);
        break;
      case 'css':
        executeCSS(code);
        break;
      case 'json':
        executeJSON(code);
        break;
      default:
        setOutput('Cannot execute the content. Unsupported file type.');
        break;
    }
    setShowPreviewer(true);
  };

  const executeJavaScriptOrTypeScript = (code: string) => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);

    setOutput(`
      <html>
      <body style="background-color: black; color: white;">
        <script src="${url}"></script>
      </body>
      </html>
    `);

    URL.revokeObjectURL(url); // Clean up the URL object
  };

  const executeHTML = (code: string) => {
    setOutput(`
      <html>
      <body style="background-color: black; color: white;">
        ${code}
      </body>
      </html>
    `);
  };

  const executeCSS = (code: string) => {
    setOutput(`
      <html>
      <style>${code}</style>
      <body style="background-color: black; color: white;">
        Styled Content
      </body>
      </html>
    `);
  };

  const executeJSON = (code: string) => {
    try {
      const jsonObj = JSON.parse(code);
      setOutput(`
        <html>
        <body style="background-color: black; color: white;">
          <pre>${JSON.stringify(jsonObj, null, 2)}</pre>
        </body>
        </html>
      `);
    } catch (err: any) {
      setOutput(`
        <html>
        <body style="background-color: white; color: white;">
          Invalid JSON: ${err.message}
        </body>
        </html>
      `);
    }
  };

  return (
    <div className="maineditor  h-[100vh] flex">
      <div className={`editor-container ${showPreviewer ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
        <div className="editor-header bg-[#2c2c2c] flex justify-between items-center p-2">
          <span className="text-white-700">
            {selectedFile ? `Editing: ${selectedFile.name}` : 'Please select a file to edit'}
          </span>
          <IconButton onClick={handleRunClick} className="run-button text-white-700">
            Run
            <PlayArrow />
          </IconButton>
        </div>
        {selectedFile ? (
          <MonacoEditor
            onMount={(editor) => (editorRef.current = editor)}
            width="100%"
            height="calc(100% - 100px)" // Adjust height to account for header space
            language="plaintext"
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
            }}
            onChange={handleEditorChange}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Please select a file to edit.
          </div>
        )}
      </div>
      {showPreviewer && (
        <div className="previewer bg-gray-800 w-1/2 p-4 transition-all duration-300">
          <h2>Output: </h2>
          <iframe
            title="Preview"
            srcDoc={output || '<html><body style="background-color:black;color:white;">No output available</body></html>'}
            width="100%"
            height="95%"
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
};

export default MainEditor;
