// SongCard.js
import React from "react";

function SongCard({ song }) {
  return (
    <div className='col-md-4'>
      <div className='card mb-4'>
        <div className='card-body d-flex align-items-center'>
          {/* Album Art */}
          <img
            src={song.album}
            alt={`${song.title} album art`}
            className='rounded'
            style={{ width: "100px", height: "100px", marginRight: "15px" }} // Set a fixed size for the album art
          />
          {/* Song Info */}
          <div className='text-left'>
            <h5 className='card-title'>{song.title}</h5>
            <p className='card-text'>{song.artist}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
