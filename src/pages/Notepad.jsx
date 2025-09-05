import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listNotes, deleteNote } from "../api";
import { jsPDF } from "jspdf"; // ✅ import jsPDF

export default function Notepad() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes from backend
  const fetchNotes = async () => {
    const data = await listNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async () => {
    if (selectedNote) {
      await deleteNote(selectedNote.id);
      setSelectedNote(null);
      fetchNotes();
    } else {
      alert("No note selected");
    }
  };

  // ✅ Download note as PDF
  const handleShare = () => {
    if (selectedNote) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(selectedNote.title || "Untitled Note", 20, 20);
      doc.setFontSize(12);
      doc.text(selectedNote.content || "", 20, 40, { maxWidth: 170 });
      doc.save(`${selectedNote.title || "note"}.pdf`);
    } else {
      alert("Select a note to share");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        background: "linear-gradient(142deg, #EFDADA 0%, #4B1212 48%)",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          background: "#827052ff",
          padding: "1rem",
          boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>My Notes</h2>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              padding: "0.5rem 0",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
              fontSize: "1.2rem",
              fontStyle: "italic",
              cursor: "pointer",
            }}
            onClick={() => setSelectedNote(note)}
          >
            {note.title}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          gap: "1rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.7)",
            padding: "1rem 2rem",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontStyle: "italic" }}>
            {selectedNote ? selectedNote.title : "Title"}
          </h1>
          <button
            onClick={() => navigate("/editor")}
            style={{
              background: "#3A1C1C",
              border: "none",
              borderRadius: "25px",
              padding: "0.5rem 1.5rem",
              color: "#EF9C9C",
              fontSize: "1rem",
              cursor: "pointer",
              fontStyle: "italic",
            }}
          >
            New Note
          </button>
        </div>

        {/* Notepad content */}
        <div
          style={{
            flex: 1,
            background: "#7A5F45",
            border: "none",
            borderRadius: "8px",
            padding: "1rem",
            color: "black",
            fontSize: "1.2rem",
            fontFamily: "sans-serif",
            resize: "vertical",
            whiteSpace: "pre-wrap",
          }}
        >
          {selectedNote ? selectedNote.content : "Select a note to view/edit"}
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button
            style={{
              background: "#000",
              color: "#093c12",
              borderRadius: "25px",
              padding: "0.5rem 1.5rem",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "700",
              fontStyle: "italic",
            }}
            onClick={() =>
              selectedNote
                ? navigate(`/editor/${selectedNote.id}`)
                : alert("Select a note first")
            }
          >
            Edit
          </button>
          <button
            style={{
              background: "#000",
              color: "#700909",
              borderRadius: "25px",
              padding: "0.5rem 1.5rem",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "700",
              fontStyle: "italic",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            style={{
              background: "#000",
              color: "#083597",
              borderRadius: "25px",
              padding: "0.5rem 1.5rem",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "700",
              fontStyle: "italic",
            }}
            onClick={handleShare}
          >
           Download
          </button>
        </div>
      </div>
    </div>
  );
}
