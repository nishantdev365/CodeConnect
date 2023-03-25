import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HomePage, CodeEditorPage } from "./pages";
import "./App.css";

function App() {

  return (
    <>
      <div>
        <Toaster position="top-center" 
         reverseOrder={false} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CodeEditor/:userId" element={<CodeEditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
