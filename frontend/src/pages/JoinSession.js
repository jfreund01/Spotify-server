import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/JoinSession.css";

function JoinSession() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get("http://localhost:5000/api/sessions");
      setSessions(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch sessions. Please try again later.");
      setLoading(false);
    }
  };

  const handleJoinSession = () => {
    // Implement join session logic here
    console.log(`Joining session with ID: *session ID*`);
    navigate("/home");
  };

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div className='error'>{error}</div>;

  return (
    <div className='join-session'>
      <h2>Available Sessions</h2>
      <div className='session-list'>
        {sessions.length === 0 ? (
          <p>No active sessions available. Try again later.</p>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className='session-card'>
              <h3>Session ID: {session.id}</h3>
              <p>Host: {session.host}</p>
              <p>Participants: {session.participants}</p>
              <button onClick={() => handleJoinSession(session.id)}>
                Join Session
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JoinSession;
