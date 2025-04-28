# VomyChat - AI Podcast Generator

**This** is an AI-based web application that lets you easily generate podcast-like conversations between multiple speakers using **Cohere AI** (for script generation) and **ElevenLabs API** (for realistic voice generation).

---

## 📚 Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Known Issues](#known-issues)
- [Future Enhancements](#future-enhancements)

---

## Demo

Coming soon! (Deploying on Vercel + Render)

---

## Features

- Enter a topic, select speakers, and generate a mini-podcast.
- Different voices for each speaker (realistic AI-generated).
- AI-generated natural conversations via Cohere API.
- Fast backend API with FastAPI and Uvicorn.
- Responsive modern UI built with React + TailwindCSS.
- Supports up to 3 speakers per conversation.

---

## 🛠 Tech Stack

| Frontend | Backend | APIs | Other |
|:---|:---|:---|:---|
| ReactJS | FastAPI (Python) | Cohere AI (Chat) | dotenv |
| TailwindCSS | Uvicorn | ElevenLabs (Text-to-Speech) | pydub |
| Axios | | | Requests |

---

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/nishant0207/vomychat.git
cd vomychat
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate (Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Make sure the backend runs on `localhost:8000` and frontend on `localhost:3000`.

---

## 🔑 Environment Variables

Create a `.env` file inside `backend/` folder:

```bash
CO_API_KEY=your_cohere_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

> Get your API keys from:
> - [Cohere AI](https://cohere.ai/)
> - [ElevenLabs](https://elevenlabs.io/)

---

## API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/generate_podcast/` | Accepts a topic and speaker IDs, returns a generated podcast MP3 audio. |

**Sample Request Body**:
```json
{
  "topic": "Artificial Intelligence in Daily Life",
  "selected_speakers": [
    "21m00Tcm4TlvDq8ikWAM",
    "29vD33N1CtxCmqQRPOHJ"
  ]
}
```

---

## Project Structure

```
vomychat/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI app entry point
│   │   └── utils/
│   │       ├── script_generator.py  # Script generation using Cohere
│   │       └── voice_generator.py   # Voice generation using ElevenLabs
│   ├── venv/                   # Python virtual environment
│   ├── .env                     # Environment variables (CO_API_KEY, ELEVENLABS_API_KEY)
│   ├── requirements.txt         # Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── speakers/            # Speaker images
│   │       ├── alex.png
│   │       ├── jamie.png
│   │       └── taylor.png
│   ├── src/
│   │   ├── components/
│   │   │   └── PodcastForm.tsx   # Podcast form UI
│   │   ├── pages/
│   │   │   └── index.tsx         # Main landing page (importing PodcastForm)
│   │   └── App.tsx               # Root app file (optional if using)
│   ├── tailwind.config.js        # TailwindCSS configuration
│   ├── postcss.config.js         # PostCSS config for Tailwind
│   ├── tsconfig.json             # TypeScript config
│   ├── package.json              # NPM dependencies
│   ├── .env (optional)            # If you store any frontend env variables
│
├── README.md                     # Project documentation (you are writing)
├── .gitignore                    # Ignored files for git
│
└── LICENSE (optional)            # Add license if open-sourcing
```
---

## Known Issues

- If API quota is exceeded, a clean error is shown: **"Quota exceeded"**.
- ElevenLabs free account has limited voice credits (~10,000 characters).
- Cohere API limits depending on your plan.

---

## Future Enhancements

- [ ] Add authentication (login/signup for users).
- [ ] Allow custom voice uploading (clone your own voice).
- [ ] Save generated podcasts history.
- [ ] Deploy on production servers (Vercel, Render, etc.)
- [ ] Add background music under podcasts.

---


## 📧 Contact

Created by [Nishant Dalal]
dalalnishant0207@gmail.com

---