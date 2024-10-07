import React from "react";
import axios from "axios";

const PreviousButton = () => {
  const handlePrevious = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/skip_to_previous/");
    } catch (error) {
      console.error("Error going to previous song:", error);
    }
  };

  return (
    <button className='btn btn-secondary m-2' onClick={handlePrevious}>
      Previous
    </button>
  );
};

export default PreviousButton;
