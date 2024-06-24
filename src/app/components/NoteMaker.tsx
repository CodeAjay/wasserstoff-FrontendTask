// components/NoteMaker.tsx

"use client"

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

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

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

const initialCategories: Category[] = [
  { id: 'cat1', title: 'Category 1', notes: [] },
  { id: 'cat2', title: 'Category 2', notes: [] },
];

const NoteMaker: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
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
    setNewNoteText('');
    setSelectedCategory('');
  };

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
  };

  const [, drag] = useDrag({
    type: 'NOTE',
    item: { id: 'new-note', category: '' },
  });

  const [, drop] = useDrop({
    accept: 'NOTE',
    drop: (item: { id: string, category: string }) => {
      handleNoteDrop(item.id, selectedCategory); // Drop into the selected category
    },
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <NoteInput>
          <input
            type="text"
            placeholder="Enter note text"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
          <button onClick={handleAddNote}>Add Note</button>
        </NoteInput>

        {categories.map(category => (
          <CategoryContainer key={category.id}>
            <CategoryTitle>{category.title}</CategoryTitle>
            <NoteList ref={drop}>
              {category.notes.map(note => (
                <NoteCard key={note.id} ref={drag}>
                  {note.text}
                </NoteCard>
              ))}
            </NoteList>
          </CategoryContainer>
        ))}
      </Wrapper>
    </DndProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const NoteInput = styled.div`
  margin-bottom: 20px;

  input, select {
    margin-right: 10px;
    padding: 5px;
  }

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

const CategoryContainer = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 16px;
`;

const CategoryTitle = styled.h2`
  margin-bottom: 8px;
`;

const NoteList = styled.div`
  min-height: 50px;
  background-color: #f0f0f0;
`;

const NoteCard = styled.div`
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 4px;
`;

export default NoteMaker;
