import os
import cohere
from dotenv import load_dotenv

load_dotenv()

CO_API_KEY = os.getenv("CO_API_KEY")

if not CO_API_KEY:
    raise ValueError("CO_API_KEY not set. Please check your .env file.")

client = cohere.Client(api_key=CO_API_KEY)

def generate_script(topic: str, num_speakers: int = 2) -> str:
    system_prompt = (
        f"Generate a friendly conversation between {num_speakers} speakers on the topic '{topic}'. "
        "Format it like:\n"
        "Speaker 1: Hello! [sentence]\n"
        "Speaker 2: Hi! [response]\n"
        "Speaker 1: [reply]\n"
        "Speaker 2: [reply]\n"
        "Make it fun, natural, and 8-10 sentences."
    )

    response = client.chat(
        model="command-r",
        message=system_prompt,
    )

    return response.text  # ✅ CORRECT NOW