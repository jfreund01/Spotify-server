import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SessionSelection from "./pages/SessionSelection";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' s element={<SessionSelection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
