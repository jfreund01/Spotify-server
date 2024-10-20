import random

used_session_ids = []

def generate_session_id(existing_ids: list[str]):
    session_code = str(random.randint(100000, 999999))
    while session_code in existing_ids:
        session_code = str(random.randint(100000, 999999))
    return session_code

class Session:
    def __init__(self, username: str):
        self.username = username
        self.token = None
        self.token_info = None
        self.id = generate_session_id(used_session_ids)
        used_session_ids.append(self.id)

    def set_token(self, token: str):
        self.token = token

    def set_token_info(self, token_info: dict):
        self.token_info = token_info

    