// components/ListMaker.tsx
"use client"

// import React, { useState } from 'react';

// type ListMakerProps = {
//   items: string[];
//   onUpdateItems: (items: string[]) => void;
// };

// const ListMaker: React.FC<ListMakerProps> = ({ items, onUpdateItems }) => {
//   const [newItem, setNewItem] = useState('');

//   const handleAddItem = () => {
//     if (newItem.trim() === '') return;
//     onUpdateItems([...items, newItem]);
//     setNewItem('');
//   };

//   return (
//     <div className="listmaker">
//       <input
//         value={newItem}
//         onChange={(e) => setNewItem(e.target.value)}
//         placeholder="Add a new item"
//       />
//       <button onClick={handleAddItem}>Add</button>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListMaker;

"use client"

import { useState } from "react";

interface List {
  name: string;
  items: string[];
}

type ListMakerProps = {
  items: List[];
  onUpdateItems: (items: List[]) => void;
};

const ListMaker: React.FC<ListMakerProps> = ({ items, onUpdateItems }) => {
  const [lists, setLists] = useState<List[]>(items);
  const [newListName, setNewListName] = useState<string>('');
  const [newItem, setNewItem] = useState<string>('');
  const [selectedListIndex, setSelectedListIndex] = useState<number>(0);

  const handleNewList = () => {
    if (newListName.trim() === '') return;
    const newLists = [...lists, { name: newListName, items: [] }];
    setLists(newLists);
    onUpdateItems(newLists);
    setNewListName('');
  };

  const handleAddItem = () => {
    if (newItem.trim() === '') return;
    const newLists = lists.map((list, index) => {
      if (index === selectedListIndex) {
        return { ...list, items: [...list.items, newItem] };
      }
      return list;
    });
    setLists(newLists);
    onUpdateItems(newLists);
    setNewItem('');
  };

  return (
    <div className="max-w-2xl h-screen overflow-scroll mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 mb-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter new list name"
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleNewList}
        >
          New List
        </button>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 mb-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <select
          className="w-full p-2 mb-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedListIndex(Number(e.target.value))}
        >
          {lists.map((list, index) => (
            <option key={index} value={index}>
              {list.name}
            </option>
          ))}
        </select>
        <button
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>

      {lists.map((list, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold text-gray-700">{list.name}</h3>
          <ul className="list-disc pl-5">
            {list.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListMaker;
