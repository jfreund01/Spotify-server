import React from "react";
import axios from "axios";
import { apiURL } from "../config";

const PlayButton = ({ onPlay }) => {
  const handlePlay = async () => {
    try {
      await axios.post(`${apiURL}/resume/`);
      onPlay(); // Callback to update UI if needed
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  return (
    <button
      className='btn btn-success m-2'
      onClick={handlePlay}
      style={{ width: "100px", height: "100px", marginRight: "15px" }}
    >
      Play
    </button>
  );
};

export default PlayButton;
