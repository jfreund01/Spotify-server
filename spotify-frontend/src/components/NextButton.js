import React from "react";
import axios from "axios";

const NextButton = () => {
  const handleNext = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/skip_to_next/");
    } catch (error) {
      console.error("Error skipping song:", error);
    }
  };

  return (
    <button className='btn btn-primary m-2' onClick={handleNext}>
      Next
    </button>
  );
};

export default NextButton;
