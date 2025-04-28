import os
import requests
from pydub import AudioSegment
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

if not ELEVENLABS_API_KEY:
    raise ValueError("ELEVENLABS_API_KEY not set. Please check your .env file.")

def generate_voice(text: str, voice_id: str):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream"
    headers = {
        "accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
    }
    payload = {
        "text": text,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 401:
        error_detail = response.json()
        if error_detail.get("detail", {}).get("status") == "quota_exceeded":
            raise Exception(f"Quota exceeded!")

    if response.status_code != 200:
        print(response.json())  # 🛠 Show clear error
        raise Exception(f"ElevenLabs API Error: {response.status_code} - {response.json()}")

    return AudioSegment.from_file(BytesIO(response.content), format="mp3")