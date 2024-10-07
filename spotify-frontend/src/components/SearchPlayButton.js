// SearchPlayButton.js
import React from "react";

const SearchPlayButton = ({ onPlay }) => (
  <button className='btn btn-success' onClick={onPlay}>
    Play
  </button>
);

export default SearchPlayButton;
