from pydantic import BaseModel

class PodcastRequest(BaseModel):
    topic: str