from fastapi import APIRouter, Form, HTTPException
from app.spotify import sp

router = APIRouter()

@router.get("/get_queue/")
async def get_queue():
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

@router.post("/put_queue/")
async def put_queue(track_id: str = Form(...)):
    sp.add_to_queue(uri=f"spotify:track:{track_id}")
    return {"message": f"Playing track with id: {track_id}"}
