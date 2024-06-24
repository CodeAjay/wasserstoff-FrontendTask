// components/FolderTree.tsx

"use client"

import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { IconButton, TextField } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

type FileNode = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
};

const initialFiles: FileNode[] = [
  {
    id: '1',
    name: 'Project',
    type: 'folder',
    children: [
      { id: '2', name: 'file1.ed', type: 'file' },
      { id: '3', name: 'notes.note', type: 'file' },
      { id: '4', name: 'readme.readme', type: 'file' },
    ],
  },
];

const FolderTree: React.FC<{ onFileSelect: (file: FileNode) => void }> = ({ onFileSelect }) => {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);

  const handleAddFile = (parent: FileNode) => {
    const newFile = prompt('Enter file name:');
    if (newFile) {
      const newFileNode: FileNode = {
        id: Date.now().toString(),
        name: newFile,
        type: 'file',
      };
      parent.children = parent.children ? [...parent.children, newFileNode] : [newFileNode];
      setFiles([...files]);
    }
  };

  const renderTree = (nodes: FileNode) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => nodes.type === 'file' && onFileSelect(nodes)}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      {nodes.type === 'folder' && (
        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleAddFile(nodes); }}>
          <Add />
        </IconButton>
      )}
    </TreeItem>
  );

  return <TreeView>{files.map((file) => renderTree(file))}</TreeView>;
};

export default FolderTree;
