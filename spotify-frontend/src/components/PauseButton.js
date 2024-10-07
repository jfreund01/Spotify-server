import React from "react";
import axios from "axios";

const PauseButton = ({ onPause }) => {
  const handlePause = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/pause/");
      onPause(); // Callback to update UI if needed
    } catch (error) {
      console.error("Error pausing song:", error);
    }
  };

  return (
    <button
      className='btn btn-warning m-2'
      onClick={handlePause}
      style={{ width: "100px", height: "100px", marginRight: "15px" }}
    >
      Pause
    </button>
  );
};

export default PauseButton;
