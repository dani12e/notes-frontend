import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNote, updateNote, getNoteById } from "../api";

export default function NoteEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getNoteById(id)
        .then((note) => {
          if (note) {
            setTitle(note.title || "");
            setContent(note.content || "");
          }
        })
        .catch((err) => console.error("Error fetching note:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async () => {
    if (id) {
      await updateNote(id, { title, content });
    } else {
      await createNote({ title, content });
    }
    navigate("/");
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(146deg, #EFDADA 0%, #4B1212 48%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title..."
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "1rem",
          background: "#7A5F45",
          border: "none",
          outline: "none",
          borderRadius: "8px",
          color: "black",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        style={{
          width: "100%",
          maxWidth: "800px",
          minHeight: "400px",
          padding: "1rem",
          background: "#7A5F45",
          border: "none",
          outline: "none",
          borderRadius: "8px",
          color: "black",
          fontSize: "1.2rem",
          resize: "vertical",
        }}
      />
      <button
        onClick={handleSave}
        style={{
          marginTop: "1rem",
          padding: "0.8rem 2rem",
          background: "#0E0E0E",
          borderRadius: "40px",
          border: "none",
          cursor: "pointer",
          color: "rgba(4, 85, 25, 0.8)",
          fontSize: "1.5rem",
        }}
      >
        Save
      </button>
    </div>
  );
}
