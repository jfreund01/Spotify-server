from fastapi import APIRouter, Form, HTTPException
from spotipy.exceptions import SpotifyException
from backend.spotify import sp, get_active_device
from typing import Optional

router = APIRouter()

@router.post("/play_track_id/")
async def play_track(track_id: str = Form(...), device_id: Optional[str] = Form(None)):
    devices = sp.devices()
    print("Devices: ", devices)
    # if not devices['devices'] and device_id is None:
    #     return {"error": "No active devices found"}
    
    # device_id = devices['devices'][0]['id']
    print("track id: " + track_id)
    sp.start_playback(uris=[f"spotify:track:{track_id}"])
    return {"message": f"Playing track with id: {track_id} on device {device_id}"}

@router.post("/skip_to_next/")
async def skip():
    try:
        sp.next_track()
        return {"status": "success"}
    except SpotifyException as e:
        print(f"Spotify API error: {e}")
        raise HTTPException(status_code=500, detail="Could not skip track.")

@router.post("/skip_to_previous/")
async def previous():
    try:
        sp.previous_track()
        return {"status": "success"}
    except SpotifyException as e:
        print(f"Spotify API error: {e}")
        raise HTTPException(status_code=500, detail="Could not skip track.")

@router.post("/pause/")
async def pause():
    try:
        sp.pause_playback()
        return {"message": "Paused track"}
    except Exception as e:
        # Log the error (optional)
        print(f"Error pausing track: {e}")
        # Return a success response despite the error
        return {"message": "Error pausing track, but button will still change", "error": str(e)}

@router.post("/resume/")
async def resume():
    try:
        sp.start_playback()
        return {"message": "Resumed track"}
    except Exception as e:
        # Log the error (optional)
        print(f"Error resuming track: {e}")
        # Return a success response despite the error
        return {"message": "Error resuming track, but button will still change", "error": str(e)}
