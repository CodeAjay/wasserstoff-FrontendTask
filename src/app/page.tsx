//import IndexPage from "@/pages";

"use client"

// pages/index.tsx
import { useState } from "react";
import Sidebar from "./sidebar/page";
import MainEditor from "./maineditor/page";
import { File, Folder } from './types/types'; // Adjust the import path as necessary


export default function Home() {
  const [files, setFiles] = useState<(File | Folder)[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        { id: '2', name: 'index.tsx', type: 'file' },
        {
          id: '3',
          name: 'components',
          type: 'folder',
          children: [
            { id: '4', name: 'Sidebar.tsx', type: 'file' },
          ]
        }
      ]
    }
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFilesChange = (updatedFiles: (File | Folder)[]) => {
    setFiles(updatedFiles);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <main className="flex h-screen flex-row items-center justify-between">
      {/* <div className="sidebar h-screen w-[20%] p-5 bg-[#2c2c2c]">
        <Sidebar files={files} onFilesChange={handleFilesChange} onFileSelect={handleFileSelect} />
      </div> */}
      <div className="w-[100%] h-screen p-0 overflow-auto">
          <MainEditor selectedFile={selectedFile} />
      </div>
    </main>
  );
}

