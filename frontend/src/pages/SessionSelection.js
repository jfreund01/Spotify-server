import React from "react";
import "../styles/SessionSelection.css";
import { useNavigate } from "react-router-dom";

function SessionSelection() {
  const navigate = useNavigate();

  const handleHostSession = () => {
    navigate("/login");
  };

  const handleJoinSession = () => {
    // For now, we'll just log a message
    console.log("Join session clicked");
    // You can add navigation to a join session page later
    // navigate('/join-session');
  };

  return (
    <div className='session-selection'>
      <h2>Choose an option</h2>
      <div className='button-container'>
        <button className='session-button host' onClick={handleHostSession}>
          Host a Session
        </button>
        <button className='session-button join' onClick={handleJoinSession}>
          Join a Session
        </button>
      </div>
    </div>
  );
}

export default SessionSelection;
