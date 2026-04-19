import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Project from "./Pages/Project/Project";
import Home from "./Pages/Home/Home";

function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
