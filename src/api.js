// Replace this with your backend URL once deployed
const BACKEND_URL = "https://your-backend-url.onrender.com";

export async function listNotes() {
  const res = await fetch(`${BACKEND_URL}/notes`);
  return res.json();
}

export async function getNoteById(id) {
  const res = await fetch(`${BACKEND_URL}/notes/${id}`);
  return res.json();
}

export async function createNote(note) {
  const res = await fetch(`${BACKEND_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${BACKEND_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(id) {
  return fetch(`${BACKEND_URL}/notes/${id}`, { method: "DELETE" });
}

export async function getShared(publicId) {
  const res = await fetch(`${BACKEND_URL}/notes/public/${publicId}`);
  return res.json();
}
