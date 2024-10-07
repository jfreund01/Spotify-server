from fastapi import APIRouter, Form, HTTPException
from app.spotify import sp, get_active_device
from typing import Optional

router = APIRouter()

@router.post("/play_track_id/")
async def play_track(track_id: str = Form(...), device_id: Optional[str] = Form(None)):
    devices = sp.devices()
    if not devices['devices'] and device_id is None:
        return {"error": "No active devices found"}
    
    device_id = device_id or devices['devices'][0]['id']
    sp.start_playback(device_id=device_id, uris=[f"spotify:track:{track_id}"])
    return {"message": f"Playing track with id: {track_id} on device {device_id}"}

@router.post("/skip_to_next/")  
async def skip():
    sp.next_track()
    return {"message": "Skipped track"}

@router.post("/skip_to_previous/")
async def previous():
    sp.previous_track()
    return {"message": "Skipped to previous track"}

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
