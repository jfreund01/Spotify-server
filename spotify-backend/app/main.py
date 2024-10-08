from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import playback, queue, search
from app.websocket import currently_playing, queue as queue_ws

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(playback.router)
app.include_router(queue.router)
app.include_router(search.router)

# WebSocket endpoints
app.websocket("/ws")(currently_playing.websocket_endpoint)
app.websocket("/ws/queue")(queue_ws.websocket_queue_endpoint)

@app.get("/")
async def root():
    return {"message": "Hello World"}
