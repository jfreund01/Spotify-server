import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../config";

const VolumeSlider = () => {
  const [volume, setVolume] = useState(50); // Default volume set to 50%

  const handleVolumeChange = async (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);

    try {
      await axios.post(`${apiURL}/volume/`, { volume: newVolume });
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
      <input
        type='range'
        min='0'
        max='100'
        value={volume}
        onChange={handleVolumeChange}
        style={{
          width: "100px",
          accentColor: "#bebebe", // Matches the PlayButton background color
        }}
      />
      <span style={{ marginLeft: "10px", fontSize: "14px" }}>{volume}%</span>
    </div>
  );
};

export default VolumeSlider;
