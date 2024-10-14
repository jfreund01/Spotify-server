// SearchQueueButton.js
import React from "react";

const SearchQueueButton = ({ onQueue }) => (
  <button className='btn btn-secondary' onClick={onQueue}>
    Queue
  </button>
);

export default SearchQueueButton;
