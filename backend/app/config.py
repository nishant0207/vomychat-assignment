from dotenv import load_dotenv
import os

load_dotenv()  # ✅ this loads variables from .env into the environment

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")