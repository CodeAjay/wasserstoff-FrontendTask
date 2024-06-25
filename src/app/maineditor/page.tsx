// "use client"

// // components/MainEditor.tsx

// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import MonacoEditor, { useMonaco } from '@monaco-editor/react';
// import { IconButton } from '@mui/material';
// import { PlayArrow } from '@mui/icons-material';

// type MainEditorProps = {
//   selectedFile: File | null;
// };

// const MainEditor: React.FC<MainEditorProps> = ({ selectedFile }) => {
//   const editorRef = useRef<any>(null);
//   const monaco = useMonaco(); // Correctly get the monaco instance
//   const [showPreviewer, setShowPreviewer] = useState(false);
//   const [output, setOutput] = useState<string | null>(null);

//   useEffect(() => {
//     if (monaco && selectedFile) {
//       if (editorRef.current) {
//         // Dispose of the old model if it exists
//         const oldModel = editorRef.current.getModel();
//         if (oldModel) {
//           oldModel.dispose();
//         }

//         const fileExtension = selectedFile.name.split('.').pop();
//         const language = getFileLanguage(fileExtension);

//         // Create a new model and set it to the editor
//         const newModel = monaco.editor.createModel(selectedFile.content, language);
//         editorRef.current.setModel(newModel);
//       }
//     }
//   }, [monaco, selectedFile]);

//   const getFileLanguage = (fileExtension: string | undefined) => {
//     switch (fileExtension) {
//       case 'js':
//       case 'jsx':
//         return 'javascript';
//       case 'ts':
//       case 'tsx':
//         return 'typescript';
//       case 'html':
//         return 'html';
//       case 'css':
//         return 'css';
//       case 'json':
//         return 'json';
//       default:
//         return 'plaintext';
//     }
//   };

//   const handleEditorChange = useCallback(
//     (value: string) => {
//       if (selectedFile) {
//         selectedFile.content = value;
//         // Update the file content in the parent state or wherever needed
//       }
//     },
//     [selectedFile]
//   );

//   const handleRunClick = () => {
//     if (!selectedFile) return;

//     const fileExtension = selectedFile.name.split('.').pop();
//     const language = getFileLanguage(fileExtension);
//     const code = editorRef.current ? editorRef.current.getValue() : '';

//     switch (language) {
//       case 'javascript':
//       case 'typescript':
//         executeJavaScriptOrTypeScript(code);
//         break;
//       case 'html':
//         executeHTML(code);
//         break;
//       case 'css':
//         executeCSS(code);
//         break;
//       case 'json':
//         executeJSON(code);
//         break;
//       default:
//         setOutput('Cannot execute the content. Unsupported file type.');
//         break;
//     }
//     setShowPreviewer(true);
//   };

//   const executeJavaScriptOrTypeScript = (code: string) => {
//     const blob = new Blob([code], { type: 'text/javascript' });
//     const url = URL.createObjectURL(blob);

//     setOutput(`
//       <html>
//       <body style="background-color: black; color: white;">
//         <script src="${url}"></script>
//       </body>
//       </html>
//     `);

//     URL.revokeObjectURL(url); // Clean up the URL object
//   };

//   const executeHTML = (code: string) => {
//     setOutput(`
//       <html>
//       <body style="background-color: black; color: white;">
//         ${code}
//       </body>
//       </html>
//     `);
//   };

//   const executeCSS = (code: string) => {
//     setOutput(`
//       <html>
//       <style>${code}</style>
//       <body style="background-color: black; color: white;">
//         Styled Content
//       </body>
//       </html>
//     `);
//   };

//   const executeJSON = (code: string) => {
//     try {
//       const jsonObj = JSON.parse(code);
//       setOutput(`
//         <html>
//         <body style="background-color: black; color: white;">
//           <pre>${JSON.stringify(jsonObj, null, 2)}</pre>
//         </body>
//         </html>
//       `);
//     } catch (err: any) {
//       setOutput(`
//         <html>
//         <body style="background-color: white; color: white;">
//           Invalid JSON: ${err.message}
//         </body>
//         </html>
//       `);
//     }
//   };

//   return (
//     <div className="maineditor  h-[100vh] flex">
//       <div className={`editor-container ${showPreviewer ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
//         <div className="editor-header bg-[#2c2c2c] flex justify-between items-center p-2">
//           <span className="text-white-700">
//             {selectedFile ? `Editing: ${selectedFile.name}` : 'Please select a file to edit'}
//           </span>
//           <IconButton onClick={handleRunClick} className="run-button text-white-700">
//             Run
//             <PlayArrow />
//           </IconButton>
//         </div>
//         {selectedFile ? (
//           <MonacoEditor
//             onMount={(editor) => (editorRef.current = editor)}
//             width="100%"
//             height="calc(100% - 100px)" // Adjust height to account for header space
//             language="plaintext"
//             options={{
//               minimap: { enabled: false },
//               automaticLayout: true,
//             }}
//             onChange={handleEditorChange}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             Please select a file to edit.
//           </div>
//         )}
//       </div>
//       {showPreviewer && (
//         <div className="previewer bg-gray-800 w-1/2 p-4 transition-all duration-300">
//           <h2>Output: </h2>
//           <iframe
//             title="Preview"
//             srcDoc={output || '<html><body style="background-color:black;color:white;">No output available</body></html>'}
//             width="100%"
//             height="95%"
//             frameBorder="0"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainEditor;

// components/MainEditor.tsx
// components/MainEditor.tsx

"use client"

import React, { useState } from 'react';
import Sidebar from '../sidebar/page';
import dynamic from 'next/dynamic';
// import EdFileEditor from '../components/EdFileEditor';
// import NoteMaker from '../components/NoteMaker';
// import ListMaker from '../components/ListMaker';
// import ReadmePreview from '../components/ReadmePreview';
const EdFileEditor = dynamic(() => import('../components/EdFileEditor'), { ssr: false });
const NoteMaker = dynamic(() => import('../components/NoteMaker'), { ssr: false });
const ListMaker = dynamic(() => import('../components/ListMaker'), { ssr: false });
const ReadmePreview = dynamic(() => import('../components/ReadmePreview'), { ssr: false });

type File = {
  id: string;
  name: string;
  type: 'file';
  extension: string;
  content: string;
};

type Folder = {
  id: string;
  name: string;
  type: 'folder';
  children: (File | Folder)[];
};

const initialFiles: (File | Folder)[] = [
  { id: '1', name: 'Document.ed', type: 'file', extension: 'ed', content: 'This is your text editor' },
  { id: '2', name: 'Image.note', type: 'file', extension: 'note', content: 'Binary data for an image' },
  { id: '3', name: 'Presentation.lt', type: 'file', extension: 'lt', content: 'Presentation content' },
  { id: '4', name: 'Spreadsheet.readme', type: 'file', extension: 'readme', content: '# Readme file inside root ' },
  {
    id: '5', name: 'Folder 1', type: 'folder', children: [
      { id: '6', name: 'SubDocument.ed', type: 'file', extension: 'ed', content: 'Sub folder text content' },
      { id: '7', name: 'SubImage.note', type: 'file', extension: 'note', content: 'Sub folder binary data' },
      { id: '8', name: 'SubPresentation.lt', type: 'file', extension: 'lt', content: 'Sub folder presentation' },
      { id: '9', name: 'SubSpreadsheet.readme', type: 'file', extension: 'readme', content: '# Readme file inside Folder 1 '},
    ]
  },
  { id: '10', name: 'Folder 2', type: 'folder', children: [] },
];

const MainEditor: React.FC = () => {
  const [files, setFiles] = useState<(File | Folder)[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFilesChange = (newFiles: (File | Folder)[]) => {
    setFiles(newFiles);
  };

  const handleContentChange = (content: string) => {
    if (selectedFile) {
      const updatedFile = { ...selectedFile, content };
      setSelectedFile(updatedFile);
      // Optionally, update files state if needed
      const updatedFiles = files.map(file => (file.id === selectedFile.id ? updatedFile : file));
      setFiles(updatedFiles);
    }
  };

  const safeParseJSON = (jsonString: string, defaultValue: any) => {
    try {
      const parsed = JSON.parse(jsonString);
      return parsed && typeof parsed === 'object' ? parsed : defaultValue;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return defaultValue;
    }
  };

  const renderEditor = () => {
    if (!selectedFile) return <div>Please select a file to edit.</div>;

    switch (selectedFile.extension) {
      case 'ed':
        return <EdFileEditor content={selectedFile.content} onChange={handleContentChange} />;
      case 'note':
        const parsedNotes = safeParseJSON(selectedFile.content, []);
        return <NoteMaker notes={parsedNotes} onUpdateNotes={(notes) => handleContentChange(JSON.stringify(notes))} />;
      case 'lt':
        const parsedItems = safeParseJSON(selectedFile.content, []);
        return <ListMaker items={parsedItems} onUpdateItems={(items) => handleContentChange(JSON.stringify(items))} />;
      case 'readme':
        return <ReadmePreview content={selectedFile.content} onChange={handleContentChange} />;
      default:
        return <div>Unsupported file type.</div>;
    }
  };

  return (
    <div className="maineditor flex w-[100vw]">
      <div className="sidebar h-screen bg-[#2e2e2e] p-4">
        <Sidebar files={files} onFilesChange={handleFilesChange} onFileSelect={handleFileSelect} />
      </div>
      <div className="editor w-screen">{renderEditor()}</div>
    </div>
  );
};

export default MainEditor;