// src/types/types.ts
export interface File {
  id: string;
  name: string;
  type: 'file';
  content?: string;
}

export interface Folder {
  id: string;
  name: string;
  type: 'folder';
  children: (File | Folder)[];
}

export enum FileType {
  TextEditor = 'ed',
  NoteMaker = 'note',
  ListMaker = 'lt',
  ReadmeViewer = 'readme',
}
