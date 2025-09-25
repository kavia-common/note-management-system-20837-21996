import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';

// Mock API functions for local state management
const getNotes = async () => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

const saveNote = async (note) => {
  let notes = await getNotes();
  const existingNoteIndex = notes.findIndex((n) => n.id === note.id);
  if (existingNoteIndex > -1) {
    notes[existingNoteIndex] = note;
  } else {
    note.id = Date.now().toString();
    notes.unshift(note);
  }
  localStorage.setItem('notes', JSON.stringify(notes));
  return note;
};

const deleteNote = async (noteId) => {
    let notes = await getNotes();
    notes = notes.filter((n) => n.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notes));
};


const NotesManager = () => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);

  useEffect(() => {
    loadNotes();
    const handleNewNote = () => createNewNote();
    document.getElementById('new-note-btn').addEventListener('click', handleNewNote)
    return () => document.getElementById('new-note-btn').removeEventListener('click', handleNewNote)
  }, []);
  
  const loadNotes = async () => {
    const notesData = await getNotes();
    setNotes(notesData);
    if(notesData.length > 0 && !activeNoteId) {
        setActiveNoteId(notesData[0].id)
    }
  };

  const handleSelectNote = (noteId) => {
    setActiveNoteId(noteId);
  };
  
  const createNewNote = () => {
    const newNote = { id: null, title: 'New Note', content: '' };
    setActiveNoteId(null); // Deselect current note
    
    // a bit of a hack to make the editor re-render for a new note
    setTimeout(() => {
        const freshNote = { id: `new_${Date.now()}`, title: '', content: '' };
        setNotes([freshNote, ...notes]);
        setActiveNoteId(freshNote.id);
    }, 50)
  };

  const handleSaveNote = async (noteToSave) => {
    const saved = await saveNote(noteToSave);
    await loadNotes();
    setActiveNoteId(saved.id);
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
    await loadNotes();
    setActiveNoteId(notes.length > 0 ? notes[0].id : null);
  };

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div class="flex h-[calc(100vh-68px)]">
      <NoteList notes={notes} onSelectNote={handleSelectNote} activeNoteId={activeNoteId} />
      <NoteEditor note={activeNote} onSave={handleSaveNote} onDelete={handleDeleteNote} />
    </div>
  );
};

export default NotesManager;
