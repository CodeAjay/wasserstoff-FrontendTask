// // components/Sidebar.tsx

// "use client"

// import React, { useState } from 'react';
// import { Button, List, ListItem, ListItemText, ListItemIcon, TextField, Modal, IconButton } from '@mui/material';
// import { Folder as FolderIcon, InsertDriveFile, Add, CreateNewFolder, AddBox, ArrowDropDown, ArrowRight } from '@mui/icons-material';
// import styles from './Sidebar.module.css';

// type File = {
//   id: string;
//   name: string;
//   type: 'file';
//   content: string; // Adjust as necessary for different file types
// };

// type Folder = {
//   id: string;
//   name: string;
//   type: 'folder';
//   children: (File | Folder)[];
// };

// type SidebarProps = {
//   files: (File | Folder)[];
//   onFilesChange: (files: (File | Folder)[]) => void;
//   onFileSelect: (file: File) => void;
// };

// const Sidebar: React.FC<SidebarProps> = ({ files, onFilesChange, onFileSelect }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newName, setNewName] = useState('');
//   const [newType, setNewType] = useState<'file' | 'folder'>('file');
//   const [parentFolder, setParentFolder] = useState<Folder | null>(null);
//   const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

//   const handleCreateNewItem = () => {
//     if (newName.trim() === '') return;

//     const newItem: File | Folder = newType === 'file'
//       ? { id: Date.now().toString(), name: newName, type: 'file', content: '' }
//       : { id: Date.now().toString(), name: newName, type: 'folder', children: [] };

//     const updatedFiles = parentFolder
//       ? addItemToFolder(files, parentFolder.id, newItem)
//       : [...files, newItem];

//     onFilesChange(updatedFiles);

//     setNewName('');
//     setIsModalOpen(false);
//     setParentFolder(null);
//   };

//   const addItemToFolder = (items: (File | Folder)[], folderId: string, newItem: File | Folder): (File | Folder)[] => {
//     return items.map(item => {
//       if (item.type === 'folder' && item.id === folderId) {
//         return { ...item, children: [...item.children, newItem] };
//       } else if (item.type === 'folder') {
//         return { ...item, children: addItemToFolder(item.children, folderId, newItem) };
//       } else {
//         return item;
//       }
//     });
//   };

//   const toggleFolder = (folderId: string) => {
//     setExpandedFolders(prev =>
//       prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
//     );
//   };

//   const handleFileClick = (file: File) => {
//     onFileSelect(file);
//   };

//   const renderFileTree = (items: (File | Folder)[], level: number = 0) => {
//     return items.map(item => (
//       <React.Fragment key={item.id}>
//         <ListItem
//           className={styles.listItem}
//           style={{ paddingLeft: level * 20 }}
//           button
//           onClick={() => {
//             if (item.type === 'folder') {
//               toggleFolder(item.id);
//             } else if (item.type === 'file') {
//               handleFileClick(item);
//             }
//           }}
//         >
//           <ListItemIcon className={styles.listItemIcon}>
//             {item.type === 'folder' ? (
//               <IconButton
//                 className={styles.folderToggle}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFolder(item.id);
//                 }}
//                 size="small"
//               >
//                 {expandedFolders.includes(item.id) ? <ArrowDropDown /> : <ArrowRight />}
//               </IconButton>
//             ) : (
//               <InsertDriveFile className={styles.fileIcon} />
//             )}
//             {item.type === 'folder' ? <FolderIcon className={styles.folderIcon} /> : null}
//           </ListItemIcon>
//           <ListItemText primary={item.name} />
//           {item.type === 'folder' && (
//             <IconButton
//               size="small"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setParentFolder(item as Folder);
//                 setIsModalOpen(true);
//                 setNewType('file');
//               }}
//             >
//               <AddBox fontSize="small" />
//             </IconButton>
//           )}
//           {item.type === 'folder' && (
//             <IconButton
//               size="small"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setParentFolder(item as Folder);
//                 setIsModalOpen(true);
//                 setNewType('folder');
//               }}
//             >
//               <CreateNewFolder fontSize="small" />
//             </IconButton>
//           )}
//         </ListItem>
//         {item.type === 'folder' && expandedFolders.includes(item.id) && (
//           <div className={styles.nested}>
//             {renderFileTree((item as Folder).children, level + 1)}
//           </div>
//         )}
//       </React.Fragment>
//     ));
//   };

//   return (
//     <>
//       <div className='flex flex-row justify-center items-center'>
//         <div className="w-[60%] flex">Create New: </div>
//         <div className="w-[40%] bbb flex flex-row">
//           <Button
//             startIcon={<Add />}
//             onClick={() => {
//               setIsModalOpen(true);
//               setNewType('file');
//               setParentFolder(null);
//             }}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-0 rounded button"
//           >
//           </Button>
//           <Button
//             startIcon={<CreateNewFolder />}
//             onClick={() => {
//               setIsModalOpen(true);
//               setNewType('folder');
//               setParentFolder(null);
//             }}
//             className="button"
//           >
//           </Button>
//         </div>
//       </div>
//       <List>
//         {renderFileTree(files)}
//       </List>

//       <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className={styles.modalContent}>
//           <TextField
//             label="Name"
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//             fullWidth
//           />
//           <Button
//             onClick={handleCreateNewItem}
//             variant="contained"
//             color="primary"
//             disabled={newName.trim() === ''}
//           >
//             Create
//           </Button>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default Sidebar;

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
  extension: string; // Added this to identify file types by extension
  content: string; // Adjust as necessary for different file types
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
  onFileSelect: (file: File) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ files, onFilesChange, onFileSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'file' | 'folder'>('file');
  const [parentFolder, setParentFolder] = useState<Folder | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const handleCreateNewItem = () => {
    if (newName.trim() === '') return;

    const newItem: File | Folder = newType === 'file'
      ? { id: Date.now().toString(), name: newName, type: 'file', extension: newName.split('.').pop()!, content: '' }
      : { id: Date.now().toString(), name: newName, type: 'folder', children: [] };

    const updatedFiles = parentFolder
      ? addItemToFolder(files, parentFolder.id, newItem)
      : [...files, newItem];

    onFilesChange(updatedFiles);

    setNewName('');
    setIsModalOpen(false);
    setParentFolder(null);
  };

  const addItemToFolder = (items: (File | Folder)[], folderId: string, newItem: File | Folder): (File | Folder)[] => {
    return items.map(item => {
      if (item.type === 'folder' && item.id === folderId) {
        return { ...item, children: [...item.children, newItem] };
      } else if (item.type === 'folder') {
        return { ...item, children: addItemToFolder(item.children, folderId, newItem) };
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
    onFileSelect(file);
  };

  const renderFileTree = (items: (File | Folder)[], level: number = 0) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <ListItem
          className={styles.listItem}
          style={{ paddingLeft: level * 20 }}
          button
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.id);
            } else if (item.type === 'file') {
              handleFileClick(item);
            }
          }}
        >
          <ListItemIcon className={styles.listItemIcon}>
            {item.type === 'folder' ? (
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
            ) : (
              <InsertDriveFile className={styles.fileIcon} />
            )}
            {item.type === 'folder' ? <FolderIcon className={styles.folderIcon} /> : null}
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-0 rounded button"
          >
          </Button>
          <Button
            startIcon={<CreateNewFolder />}
            onClick={() => {
              setIsModalOpen(true);
              setNewType('folder');
              setParentFolder(null);
            }}
            className="button"
          >
          </Button>
        </div>
      </div>
      <List>
        {renderFileTree(files)}
      </List>

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
