import React from "react";
import axios from "axios";
import { apiURL } from "../config";

const NextButton = () => {
  const handleNext = async () => {
    try {
      await axios.post(`${apiURL}/skip_to_next/`);
    } catch (error) {
      console.error("Error skipping song:", error);
    }
  };

  return (
    <button
      className='btn btn-primary m-2'
      onClick={handleNext}
      style={{ width: "100px", height: "100px", marginRight: "15px" }}
    >
      Next
    </button>
  );
};

export default NextButton;
