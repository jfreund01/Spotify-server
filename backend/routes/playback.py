from fastapi import APIRouter, Form, HTTPException
from spotipy.exceptions import SpotifyException
from backend.spotify import sp
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
        return {"message": "Could not pause track"}

@router.post("/resume/")
async def resume():
    try:
        sp.start_playback()
        return {"message": "Resumed track"}
    except Exception as e:
        return {"message": "Could not resume track"}

@router.get("/search_tracks/{track_name}")
async def search_tracks(track_name: str):
    try:
        tracks = sp.search(q=track_name, limit=20, type='track')
        if not tracks['tracks']['items']:
            return []
        return [
            {
                "id": track['id'],
                "title": track['name'],
                "artist": track['artists'][0]['name'],
                "album": track['album']['images'][0]['url'],
                "track_id": track['id']
            }
            for track in tracks['tracks']['items']
        ]
    except SpotifyException as e:
        raise HTTPException(status_code=500, detail=f"Spotify API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
