from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.utils.script_generator import generate_script
from app.utils.voice_generator import generate_voice
from pydub import AudioSegment
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class PodcastRequest(BaseModel):
    topic: str
    selected_speakers: list  # List of voice IDs

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_podcast/")
async def create_podcast(request: PodcastRequest):
    if not request.selected_speakers:
        raise HTTPException(status_code=400, detail="You must select at least one speaker.")

    script = generate_script(request.topic, num_speakers=len(request.selected_speakers))
    speakers = request.selected_speakers

    # Map Speaker 1 -> speakers[0], Speaker 2 -> speakers[1], etc.
    speaker_mapping = {f"Speaker {i+1}": voice_id for i, voice_id in enumerate(speakers)}

    script_lines = script.split("\n")
    combined_audio = AudioSegment.silent(duration=1000)  # Start with silence

    for line in script_lines:
        if not line.strip():
            continue  # Skip empty lines

        if ": " in line:
            speaker_prefix, sentence = line.split(": ", 1)
            voice_id = speaker_mapping.get(speaker_prefix.strip())
            if not voice_id:
                # fallback to first speaker if not mapped
                voice_id = speakers[0]
        else:
            sentence = line
            voice_id = speakers[0]

        try:
            voice_audio = generate_voice(sentence.strip(), voice_id)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        combined_audio += voice_audio + AudioSegment.silent(duration=500)  # Add pause

    output_io = BytesIO()
    combined_audio.export(output_io, format="mp3")
    output_io.seek(0)

    return StreamingResponse(output_io, media_type="audio/mpeg")