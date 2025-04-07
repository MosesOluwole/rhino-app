import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes from the backend
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (err: any) {
      console.error('Error fetching notes:', err);
      setError(err.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Handler to add a note (with title and content)
  const handleAddNote = useCallback(async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      const newNote: Note = await response.json();
      setNotes(prev => [...prev, newNote]);
      setTitle('');
      setContent('');
    } catch (err: any) {
      console.error('Error adding note:', err);
      setError(err.message || 'Unexpected error occurred');
    }
  }, [title, content]);

  // Handler to delete a note by its id
  const handleDeleteNote = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err: any) {
      console.error('Error deleting note:', err);
      setError(err.message || 'Unexpected error occurred');
    }
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAddNote();
    },
    [handleAddNote]
  );

  return (
    <div className="app-container">
      <h1>My Notes</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-title-input"
        />
        <textarea
          placeholder="Enter your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-input"
        />
        <button type="submit" className="add-button">
          Add Note
        </button>
      </form>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div className="notes-list-container">
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-details">
                  <h2 className="note-title">{note.title}</h2>
                  <p className="note-content">{note.content}</p>
                </div>
                <div className="note-meta">
                  <span className="note-date">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
