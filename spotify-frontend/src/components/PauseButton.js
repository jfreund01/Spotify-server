import React from "react";
import axios from "axios";
import { apiURL } from "../config";
import pause from "../assets/pause.png";

const PauseButton = ({ onPause }) => {
  const handlePause = async () => {
    try {
      await axios.post(`${apiURL}/pause/`);
      onPause(); // Callback to update UI if needed
    } catch (error) {
      console.error("Error pausing song:", error);
    }
  };

  return (
    <button
      onClick={handlePause}
      style={{
        border: "none", // Remove button border
        padding: "0px", // Remove padding
        marginLeft: "10px", // Add margin to separate from other buttons
        marginRight: "10px", // Add margin to separate from other buttons
        background: "#bebebe", // Softer light grey background
        cursor: "pointer", // Add pointer cursor on hover
        width: "80px", // Set button width
        height: "80px", // Set button height
        borderRadius: "50%", // Make the button circular
        display: "flex", // Flexbox to center the image
        justifyContent: "center", // Center image horizontally
        alignItems: "center", // Center image vertically
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
        transition: "all 0.3s ease", // Optional: smooth transition for hover effects
      }}
    >
      <img
        src={pause}
        alt='pause'
        style={{ width: "60%", height: "60%", filter: "brightness(0.6)" }} // Slightly darken the image to contrast with the light background
      />
    </button>
  );
};

export default PauseButton;
