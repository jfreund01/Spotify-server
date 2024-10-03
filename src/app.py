import spotipy
from spotipy.oauth2 import SpotifyOAuth
from fastapi import FastAPI, Form
from typing import Optional
import configparser
import os

def create_spotify_app():
    sp = None
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URL = get_client_info()
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
                                               client_secret=CLIENT_SECRET,
                                               redirect_uri=REDIRECT_URL,
                                               scope="user-modify-playback-state user-read-playback-state"))
    
    if sp is None:
        print("Failed to authenticate")
        return
    else:
        print("Successfully authenticated")
    return sp

def get_active_device():
    devices = sp.devices()
    if not devices['devices']:
        raise HTTPException(status_code=404, detail="No active devices found")
    device_id = devices['devices'][0]['id']
    device_name = devices['devices'][0]['name']
    return device_id, device_name

def get_client_info():
    config = configparser.ConfigParser()
    path = os.path.expanduser("~/.config/spotipi/creds.ini")
    config.read(path)
    print(config.sections())
    CLIENT_ID = config['global']['CLIENT_ID']
    CLIENT_SECRET = config['global']['CLIENT_SECRET']
    REDIRECT_URL = config['global']['REDIRECT_URL']
    return CLIENT_ID, CLIENT_SECRET, REDIRECT_URL

sp = create_spotify_app()

app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/play_track_id/")
async def play_track(track_id: str = Form(...), device_id: Optional[str] = Form(None)):
    devices = sp.devices()
    if not devices['devices'] and device_id is None:
        return {"error": "No active devices found"}
    
    device_id = device_id or devices['devices'][0]['id']
    
    sp.start_playback(device_id=device_id, uris=[f"spotify:track:{track_id}"])
    return {"message": f"Playing track with id: {track_id} on device {device_id}"}

@app.post("/play_track_name/{track_name}")
async def play(track_name: str):
    device_id, device_name = get_active_device()
    tracks = sp.search(q=track_name, limit=1, type='track')
    if tracks['tracks']['items']:
        track_id = tracks['tracks']['items'][0]['id']
        track_name = tracks['tracks']['items'][0]['name']
        track_artist = tracks['tracks']['items'][0]['artists'][0]['name']
        sp.start_playback(device_id=device_id, uris=[f"spotify:track:{track_id}"])
        return {"message": "Playing track: " + track_name + " - " + track_artist + " on device with name: " + device_name}
    else:
        raise HTTPException(status_code=404, detail="Track not found")
    


@app.get("/get_track_info/{track_name}")
async def get_track_id(track_name: str):
    tracks = sp.search(q=track_name, limit=1, type='track')
    if tracks['tracks']['items']:
        track_id = tracks['tracks']['items'][0]['id']
        return {"message": track_id}
    else:
        raise HTTPException(status_code=404, detail="Track not found")
    
@app.post("/put_queue/")
async def put_queue(track_name: str = Form(...)):
    tracks = sp.search(q=track_name, limit=1, type='track')
    if tracks['tracks']['items']:
        track_id = tracks['tracks']['items'][0]['id']
        track_name = tracks['tracks']['items'][0]['name']
        track_artist = tracks['tracks']['items'][0]['artists'][0]['name']
        sp.add_to_queue(uri=f"spotify:track:{track_id}")
        return {"message": "Added track: " + track_name + " - " + track_artist + " to queue"}
    else:
        raise HTTPException(status_code=404, detail="Track not found")

@app.get("/get_queue/")
async def get_queue():
    queue = sp.queue()
    track_names = []
    if queue is not None:
        for track in queue['queue']:
            track_names.append(track['name'] + " - " + track['artists'][0]['name'])
        return track_names
    return {"message": "Queue is empty"}
    #     print(track['track']['name'], "-", track['track']['artists'][0]['name'])
    #     track_names.append(track['track']['name'])
    #     track_artists.append(track['track']['artists'][0]['name'])


@app.post("/skip_to_next/")  
async def skip():
    sp.next_track()
    return {"message": "Skipped track"}

@app.post("/skip_to_previous/")
async def previous():
    sp.previous_track()
    return {"message": "Skipped to previous track"}

@app.post("/pause/")
async def pause():
    sp.pause_playback()
    return {"message": "Paused track"}

@app.post("/resume/")
async def resume():
    sp.start_playback()
    return {"message": "Resumed track"}

@app.get("/get_current_track/")
async def get_current_track():
    track = sp.current_playback()
    if track is not None:
        return {"message": track['item']['name'] + " - " + track['item']['artists'][0]['name']}
    return {"message": "No track is currently playing"}


