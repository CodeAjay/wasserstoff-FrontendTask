// components/Sidebar.tsx
"use client"

import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, ListItemIcon, TextField, Modal, IconButton } from '@mui/material';
import { Folder as FolderIcon, InsertDriveFile, Add, CreateNewFolder, AddBox, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import styles from './Sidebar.module.css';

type File = {
  id: string;
  name: string;
  type: 'file';
  content: string; // Added content field for file content
};

type Folder = {
  id: string;
  name: string;
  type: 'folder';
  children: (File | Folder)[];
};

type SidebarProps = {
  files: (File | Folder)[];
  onFilesChange: (files: (File | Folder)[]) => void;
  onFileSelect: (file: File) => void; // Callback function for selecting a file
};

const Sidebar: React.FC<SidebarProps> = ({ files, onFilesChange, onFileSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'file' | 'folder'>('file');
  const [parentFolder, setParentFolder] = useState<Folder | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const handleCreateNewItem = () => {
    if (newName.trim() === '') return;

    const newItem = newType === 'file' ? { id: Date.now().toString(), name: newName, type: 'file', content: '' } : { id: Date.now().toString(), name: newName, type: 'folder', children: [] };

    if (parentFolder) {
      if (parentFolder.type === 'folder') {
        const updatedFiles = addItemToFolder(files, parentFolder.id, newItem);
        onFilesChange(updatedFiles);
      }
    } else {
      onFilesChange([...files, newItem]);
    }

    setNewName('');
    setIsModalOpen(false);
    setParentFolder(null);
  };

  const addItemToFolder = (items: (File | Folder)[], folderId: string, newItem: File | Folder): (File | Folder)[] => {
    return items.map(item => {
      if (item.type === 'folder') {
        if (item.id === folderId) {
          return { ...item, children: [...(item as Folder).children, newItem] };
        } else {
          return { ...item, children: addItemToFolder((item as Folder).children, folderId, newItem) };
        }
      } else {
        return item;
      }
    });
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
    );
  };

  const handleFileClick = (file: File) => {
    onFileSelect(file); // Callback to pass selected file to parent component
  };

  const renderFileTree = (items: (File | Folder)[], level: number = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <ListItem
          className={styles.listItem}
          style={{ paddingLeft: level * 20 }}
          button
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.id);
            } else if (item.type === 'file') {
              handleFileClick(item as File); // Handle file click to open in maineditor
            }
          }}
        >
          <ListItemIcon className={styles.listItemIcon}>
            {item.type === 'folder' ? (
              <>
                <IconButton
                  className={styles.folderToggle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(item.id);
                  }}
                  size="small"
                >
                  {expandedFolders.includes(item.id) ? <ArrowDropDown /> : <ArrowRight />}
                </IconButton>
                <FolderIcon className={styles.folderIcon} />
              </>
            ) : (
              <InsertDriveFile className={styles.fileIcon} />
            )}
          </ListItemIcon>
          <ListItemText primary={item.name} />
          {item.type === 'folder' && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setParentFolder(item as Folder);
                setIsModalOpen(true);
                setNewType('file');
              }}
            >
              <AddBox fontSize="small" />
            </IconButton>
          )}
          {item.type === 'folder' && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setParentFolder(item as Folder);
                setIsModalOpen(true);
                setNewType('folder');
              }}
            >
              <CreateNewFolder fontSize="small" />
            </IconButton>
          )}
        </ListItem>
        {item.type === 'folder' && expandedFolders.includes(item.id) && (
          <div className={styles.nested}>
            {renderFileTree((item as Folder).children, level + 1)}
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className='flex flex-row justify-center items-center'>
        <div className="w-[60%] flex">Create New: </div>
        <div className="w-[40%] bbb flex flex-row">
          <Button
            startIcon={<Add />}
            onClick={() => {
              setIsModalOpen(true);
              setNewType('file');
              setParentFolder(null);
            }}
            className="button"
          />
            
          <Button
            startIcon={<CreateNewFolder />}
            onClick={() => {
              setIsModalOpen(true);
              setNewType('folder');
              setParentFolder(null);
            }}
            className="button"
          />
        </div>
      </div>
      <List>{renderFileTree(files)}</List>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <TextField
            label="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
          />
          <Button
            onClick={handleCreateNewItem}
            variant="contained"
            color="primary"
            disabled={newName.trim() === ''}
          >
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
