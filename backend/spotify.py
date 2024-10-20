
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from fastapi import HTTPException
from backend.utils.client_info import get_client_info

def create_spotify_app():
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URL = get_client_info()
    sp = Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
                                            client_secret=CLIENT_SECRET,
                                            redirect_uri=REDIRECT_URL,
                                            scope="user-modify-playback-state user-read-playback-state"))
    return sp

sp = create_spotify_app()

def get_active_device():
    devices = sp.devices()
    if not devices['devices']:
        raise HTTPException(status_code=404, detail="No active devices found")
    return devices['devices'][0]['id'], devices['devices'][0]['name']

def get_current_playback():
    track = sp.current_playback()
    if track and track['item']:
        return {
            "title": track['item']['name'],
            "artist": track['item']['artists'][0]['name'],
            "album": track['item']['album']['images'][0]['url'],
            "track_id": track['item']['id']
        }
    return None
