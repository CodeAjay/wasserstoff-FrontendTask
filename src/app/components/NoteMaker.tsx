// components/NoteMaker.tsx

"use client"

import { useState } from "react";

// import React, { useState } from 'react';

// type Note = {
//   id: string;
//   content: string;
//   status: 'todo' | 'inProgress' | 'done';
// };

// type NoteMakerProps = {
//   notes: Note[];
//   onUpdateNotes: (notes: Note[]) => void;
// };

// const NoteMaker: React.FC<NoteMakerProps> = ({ notes, onUpdateNotes }) => {
//   const [newNote, setNewNote] = useState('');

//   const handleAddNote = () => {
//     if (newNote.trim() === '') return;
//     const note: Note = {
//       id: Date.now().toString(),
//       content: newNote,
//       status: 'todo'
//     };
//     onUpdateNotes([...notes, note]);
//     setNewNote('');
//   };

//   const handleChangeStatus = (noteId: string, status: Note['status']) => {
//     onUpdateNotes(notes.map(note => note.id === noteId ? { ...note, status } : note));
//   };

//   return (
//     <div className="notemaker">
//       <input
//         value={newNote}
//         onChange={(e) => setNewNote(e.target.value)}
//         placeholder="Add a new note"
//       />
//       <button onClick={handleAddNote}>Add</button>
//       <div className="notes-container">
//         {['todo', 'inProgress', 'done'].map(status => (
//           <div key={status} className={`notes-column ${status}`}>
//             <h2>{status}</h2>
//             {notes.filter(note => note.status === status).map(note => (
//               <div
//                 key={note.id}
//                 className="note"
//                 draggable
//                 onDragStart={(e) => e.dataTransfer.setData('text/plain', note.id)}
//               >
//                 {note.content}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NoteMaker;

interface Note {
  id: string;
  text: string;
  category: string;
}

interface Category {
  id: string;
  title: string;
  notes: Note[];
}

const NoteMaker: React.FC<{ notes: Category[], onUpdateNotes: (notes: Category[]) => void }> = ({ notes, onUpdateNotes }) => {
  const [categories, setCategories] = useState<Category[]>(notes);
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddNote = () => {
    if (!newNoteText || !selectedCategory) return;
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      text: newNoteText,
      category: selectedCategory,
    };

    const updatedCategories = categories.map(cat => {
      if (cat.id === selectedCategory) {
        return {
          ...cat,
          notes: [...cat.notes, newNote],
        };
      } else {
        return cat;
      }
    });

    setCategories(updatedCategories);
    onUpdateNotes(updatedCategories);
    setNewNoteText('');
    setSelectedCategory('');
  };

  // Handle the note drop logic
  const handleNoteDrop = (noteId: string, newCategoryId: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === newCategoryId) {
        const newNotes = [...cat.notes, categories.flatMap(c => c.notes).find(note => note.id === noteId)!];
        return { ...cat, notes: newNotes };
      } else {
        const newNotes = cat.notes.filter(note => note.id !== noteId);
        return { ...cat, notes: newNotes };
      }
    });
    setCategories(updatedCategories);
    onUpdateNotes(updatedCategories);
  };

  return (
    <div>
      {/* Render UI for adding notes and categories */}
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.title}</h2>
          <div>
            {category.notes.map(note => (
              <div key={note.id}>{note.text}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default NoteMaker;