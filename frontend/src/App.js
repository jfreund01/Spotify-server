import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SessionSelection from "./pages/SessionSelection";
import Home from "./pages/Home";
import JoinSession from "./pages/JoinSession";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' s element={<SessionSelection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/join-session' element={<JoinSession />} />
      </Routes>
    </Router>
  );
}

export default App;
