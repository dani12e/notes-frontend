import { Routes, Route } from "react-router-dom";
import Notepad from "./pages/Notepad";
import NoteEditor from "./pages/NoteEditor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Notepad />} />
      <Route path="/editor" element={<NoteEditor />} />
      <Route path="/editor/:id" element={<NoteEditor />} />
    </Routes>
  );
}
