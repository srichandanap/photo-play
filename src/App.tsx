import React from 'react';
import './App.css';
import Home from './views/home/home';
import { Routes, Route } from "react-router-dom";
import Pmodal from './components/pmodal/pmodal';

function App() {
  return (
    <Routes>
    <Route path="/*" element={<Home/>}/>
    <Route path="/pmodal" element={<Pmodal />} />
  </Routes>
  );
}

export default App;
