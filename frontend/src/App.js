import React, { useState, useEffect } from "react";
import axios from "axios";
import SongCard from "./components/SongCard";
import SearchSongCard from "./components/SearchSongCard";
import PlayButton from "./components/PlayButton";
import PauseButton from "./components/PauseButton";
import NextButton from "./components/NextButton";
import PreviousButton from "./components/PreviousButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { apiURL, wsURL } from "./config";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [currentSong, setCurrentSong] = useState(null); // Track the current song playing (full object)
  const [queue, setQueue] = useState([]); // Track the queue of songs

  // WebSocket for currently playing song
  useEffect(() => {
    const ws = new WebSocket(wsURL);

    ws.onmessage = (event) => {
      const songData = JSON.parse(event.data); // Assuming the WebSocket sends a full song object
      console.log("WebSocket message received:", songData);
      setCurrentSong(songData); // Update the current song with the WebSocket message
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  // WebSocket for queue updates
  useEffect(() => {
    const wsQueue = new WebSocket(`${wsURL}/queue`);

    wsQueue.onmessage = (event) => {
      const queueData = JSON.parse(event.data); // Assuming the WebSocket sends the queue array
      console.log("Queue WebSocket message received:", queueData);
      setQueue(queueData); // Update the queue state with the WebSocket message
    };

    wsQueue.onerror = (error) => {
      console.error("Queue WebSocket error:", error);
    };

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      wsQueue.close();
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    // Check if the query is empty
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }

    // Proceed with the API request if the query is not empty
    try {
      const response = await axios.get(`${apiURL}/search_tracks/${query}`);
      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handlePlay = async () => {
    // Handle play action
    try {
      await axios.post(`${apiURL}/resume/`);
      setIsPlaying(true); // Set the state to playing
    } catch (error) {
      console.error("Error playing the song:", error);
    }
  };

  const handleSearchPlay = async (song) => {
    // Handle play action for searched songs
    const form = new FormData();
    form.append("track_id", song.id);
    try {
      await axios.post(`${apiURL}/play_track_id/`, form);
      setIsPlaying(true); // Set the state to playing
    } catch (error) {
      console.error("Error playing the song:", error);
    }
  };

  const handleQueue = async (song) => {
    // Handle queue action
    const form = new FormData();
    form.append("track_id", song.id);
    try {
      await axios.post(`${apiURL}/put_queue/`, form);
      alert("Song Queued successfully");
      setIsPlaying(true); // Set the state to playing
    } catch (error) {
      console.error("Error queuing the song:", error);
      alert("Error queuing the song:", error);
    }
  };

  const handlePause = async () => {
    // Handle pause action
    try {
      await axios.post(`${apiURL}/pause/`);
      setIsPlaying(false); // Set the state to paused
    } catch (error) {
      console.error("Error pausing the song:", error);
    }
  };

  return (
    <div className='App'>
      <div className='container mt-5'>
        <h2 className='text-center mb-4'>Spotify Song Search</h2>

        {/* Center the currently playing song with controls next to it */}
        <div className='currently-playing text-center mb-4'>
          <h4>Currently Playing:</h4>
          {currentSong ? (
            <div className='row justify-content-center align-items-center'>
              {/* SongCard takes up part of the row */}
              <div className='col-md-6'>
                <SongCard song={currentSong} />
              </div>
              {/* Control buttons next to the song */}
              <div className='col-md-4 text-center'>
                <div className='d-flex justify-content-center'>
                  <PreviousButton />
                  {isPlaying ? (
                    <PauseButton onPause={handlePause} />
                  ) : (
                    <PlayButton onPlay={handlePlay} />
                  )}
                  <NextButton />
                </div>
              </div>
            </div>
          ) : (
            <p>No song is currently playing</p>
          )}
        </div>

        <form onSubmit={handleSearch}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control search-input'
              placeholder='Search for a song...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary w-100 mt-3'>
            Search
          </button>
        </form>

        <div className='mt-4'>
          {results.length > 0 ? (
            <div className='row'>
              {results.map((song) => (
                <SearchSongCard
                  key={song.id}
                  song={song}
                  onPlay={handleSearchPlay}
                  onQueue={handleQueue}
                />
              ))}
            </div>
          ) : (
            query && <p className='text-center'>No results found</p>
          )}
        </div>
      </div>

      {/* Queue Sidebar */}
      <div className='queue-sidebar'>
        <h5>Current Queue:</h5>
        <ul className='list-unstyled'>
          {queue.length > 0 ? (
            queue.map((track, index) => (
              <li key={index} className='queue-item'>
                <div className='queue-card'>
                  <img
                    src={track.album} // Assuming track.album holds the album cover image URL
                    alt={track.title}
                    className='queue-album-cover'
                  />
                  <div className='queue-info'>
                    <p className='queue-title'>{track.title}</p>
                    <p className='queue-artist'>{track.artist}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No songs in queue</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
