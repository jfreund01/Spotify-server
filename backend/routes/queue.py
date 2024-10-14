from fastapi import APIRouter, Form, HTTPException
from spotipy.exceptions import SpotifyException
from backend.spotify import sp

router = APIRouter()

@router.get("/get_queue/")
async def get_queue():
    try:
        tracks = sp.queue()
        track_list = []
        for idx, track in enumerate(tracks['queue']):
            track_list.append({
                "id": idx + 1,
                "title": track['name'],
                "artist": track['artists'][0]['name'],
                "album": track['album']['images'][0]['url'],
                "track_id": track['id']
            })
        return track_list
    except:
        raise HTTPException(status_code=404, detail="No tracks in queue")
    
@router.post("/put_queue/")
async def put_queue(track_id: str = Form(...)):
    try:
        devices = sp.devices()
        print(devices)
        # if not devices['devices'] and device_id is None:
        #     return {"error": "No active devices found"}
        
        # device_id = device_id or devices['devices'][0]['id']
        sp.add_to_queue(uri=f"spotify:track:{track_id}")
        return {"message": f"Playing track with id: {track_id}"}
    except:
        raise HTTPException(status_code=500, detail="Could not add track to queue.")
