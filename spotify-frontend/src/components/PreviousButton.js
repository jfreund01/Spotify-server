import React from "react";
import axios from "axios";
import { apiURL } from "../config";

const PreviousButton = () => {
  const handlePrevious = async () => {
    try {
      await axios.post(`${apiURL}/skip_to_previous/`);
    } catch (error) {
      console.error("Error going to previous song:", error);
    }
  };

  return (
    <button
      className='btn btn-secondary m-2'
      onClick={handlePrevious}
      style={{ width: "100px", height: "100px", marginRight: "15px" }}
    >
      Previous
    </button>
  );
};

export default PreviousButton;
