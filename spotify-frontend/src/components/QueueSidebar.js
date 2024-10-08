import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../config";

function QueueSidebar() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // Fetch the queue when the component mounts
    const fetchQueue = async () => {
      try {
        const response = await axios.get(`${apiURL}/get_queue/`);
        setQueue(response.data);
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };

    fetchQueue();
  }, []);

  return (
    <div className='queue-sidebar'>
      <h5>Queue</h5>
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
  );
}

export default QueueSidebar;
