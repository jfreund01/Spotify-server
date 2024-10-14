import React from "react";
import SearchPlayButton from "./SearchPlayButton";
import SearchQueueButton from "./SearchQueueButton";

function SongCard({ song, onPlay, onQueue }) {
  return (
    <div className='col-md-4'>
      <div className='card mb-4'>
        <div className='card-body' style={{ height: "215px" }}>
          {/* Row layout for image and text */}
          <div className='d-flex'>
            {/* Album Art */}
            <img
              src={song.album}
              alt={`${song.title} album art`}
              className='rounded'
              style={{ width: "100px", height: "100px", marginRight: "15px" }}
            />

            {/* Song Info */}
            <div className='text-left' style={{ width: "100%" }}>
              <h5
                className='card-title'
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Limits to 2 lines
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                }}
              >
                {song.title}
              </h5>
              <p
                className='card-text'
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Limits to 2 lines
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                }}
              >
                {song.artist}
              </p>
            </div>
          </div>

          {/* Control buttons below the song info */}
          <div className='d-flex justify-content-around mt-3'>
            <SearchPlayButton onPlay={() => onPlay(song)} />
            <SearchQueueButton onQueue={() => onQueue(song)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
