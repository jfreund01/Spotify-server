import React from "react";
import axios from "axios";

const PlayButton = ({ onPlay }) => {
  const handlePlay = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/resume/");
      onPlay(); // Callback to update UI if needed
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  return (
    <button className='btn btn-success m-2' onClick={handlePlay}>
      Play
    </button>
  );
};

export default PlayButton;
