// components/ListMaker.tsx
"use client"

import React, { useState } from 'react';

type ListMakerProps = {
  items: string[];
  onUpdateItems: (items: string[]) => void;
};

const ListMaker: React.FC<ListMakerProps> = ({ items, onUpdateItems }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() === '') return;
    onUpdateItems([...items, newItem]);
    setNewItem('');
  };

  return (
    <div className="listmaker">
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListMaker;
