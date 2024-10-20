from utils.sessions import Session

def create_session(username: str, token: str, token_info: dict):
    session = Session(username)
    session.set_token(token)
    session.set_token_info(token_info)
    sessions[session.username] = session
    return {"message": "Session created successfully with session ID: " + session.id}