from fastapi import APIRouter, HTTPException, Form
from backend.spotify import sp
from backend.utils.client_info import get_client_info
from spotipy.exceptions import SpotifyException
from spotipy.oauth2 import SpotifyOAuth
import spotipy.util as util

router = APIRouter()

@router.post("/login/")
async def login(username: str = Form(...)):
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URL = get_client_info()
    try:
        sp_oauth = SpotifyOAuth(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            redirect_uri=REDIRECT_URL,
            scope="user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public",
            cache_path=None  # This will prevent caching
        )
        token_info = sp_oauth.get_access_token(as_dict=True, check_cache=False)
    except SpotifyException as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"message": "Login successful"}