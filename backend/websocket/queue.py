from fastapi import WebSocket, WebSocketDisconnect
from backend.spotify import sp
import asyncio
import json

async def websocket_queue_endpoint(websocket: WebSocket):
    await websocket.accept()
    previous_queue = None
    try:
        while True:
            queue = sp.queue()
            current_queue = [
                {
                    "title": track['name'],
                    "artist": track['artists'][0]['name'],
                    "album": track['album']['images'][0]['url'],
                    "track_id": track['id']
                }
                for track in queue['queue']
            ]

            if current_queue != previous_queue:
                previous_queue = current_queue
                await websocket.send_text(json.dumps(current_queue))

            await asyncio.sleep(2)
    except WebSocketDisconnect:
        print("WebSocket disconnected")
