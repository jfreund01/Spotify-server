from fastapi import APIRouter
from app.spotify import sp

router = APIRouter()

@router.get("/search_tracks/{track_name}")
async def search_tracks(track_name: str):
    try:
        tracks = sp.search(q=track_name, limit=20, type='track')
        return [
            {
                "id": track['id'],
                "title": track['name'],
                "artist": track['artists'][0]['name'],
                "album": track['album']['images'][0]['url'],
                "track_id": track['id']
            }
            for idx, track in enumerate(tracks['tracks']['items'])
        ]
    except:
        raise HTTPException(status_code=404, detail="Could not search")
