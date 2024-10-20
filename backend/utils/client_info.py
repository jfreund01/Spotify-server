import os
from dotenv import load_dotenv

def get_client_info():
    load_dotenv()
    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    REDIRECT_URL = os.getenv("REDIRECT_URL")
    if not CLIENT_ID or not CLIENT_SECRET or not REDIRECT_URL:
        raise ValueError("Missing Spotify API credentials")
    return CLIENT_ID, CLIENT_SECRET, REDIRECT_URL