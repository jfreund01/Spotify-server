from fastapi import WebSocket, WebSocketDisconnect
from backend.spotify import sp
import asyncio
import json

async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    previous_track_id = None
    try:
        while True:
            current_playback = sp.current_playback()
            if current_playback and current_playback['is_playing'] and current_playback['item']:
                track_id = current_playback['item']['id']
                if track_id != previous_track_id:
                    previous_track_id = track_id
                    song_data = {
                        "title": current_playback['item']['name'],
                        "artist": current_playback['item']['artists'][0]['name'],
                        "album": current_playback['item']['album']['images'][0]['url'],
                        "track_id": track_id
                    }
                    await websocket.send_text(json.dumps(song_data))
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("WebSocket disconnected")
