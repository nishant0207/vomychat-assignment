import React, { useState } from "react";
import axios from "axios";

const speakersList = [
  {
    id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    image: "/speakers/alex.png",
  },
  {
    id: "29vD33N1CtxCmqQRPOHJ",
    name: "Drew",
    image: "/speakers/jamie.png",
  },
  {
    id: "2EiwWnXFnvU5JabPnv8n",
    name: "Clyde",
    image: "/speakers/taylor.png",
  },
];

const PodcastForm = () => {
  const [topic, setTopic] = useState("");
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const toggleSpeaker = (id: string) => {
    setSelectedSpeakers((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setAudioUrl(null);
    setLoading(true);

    try {
      const response = await axios.post(
        // "http://localhost:8000/generate_podcast/",
        "https://vomychat-assignment.onrender.com/generate_podcast/",
        { topic, selected_speakers: selectedSpeakers },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setMessage("✅ Podcast generated successfully!");
    } catch (err: any) {
      console.error(err);

      if (axios.isAxiosError(err) && err.response) {
        try {
          const errorBlob = err.response.data;
          const errorText = await errorBlob.text();
          const errorJson = JSON.parse(errorText);

          if (errorJson.detail) {
            if (typeof errorJson.detail === "object" && errorJson.detail.status === "quota_exceeded") {
              setMessage("Quota exceeded");
            } else if (typeof errorJson.detail === "string") {
              setMessage(`${errorJson.detail}`);
            } else {
              setMessage("Something went wrong");
            }
          } else {
            setMessage("Unexpected server error");
          }
        } catch (parseError) {
          console.error("Error parsing error response", parseError);
          setMessage("Failed to process error");
        }
      } else {
        setMessage("Failed to connect to server. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🎙️ Create Your Podcast</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block mb-2 text-lg font-semibold">Podcast Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your podcast topic..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-lg font-semibold">Select Speakers (up to 3)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {speakersList.map((speaker) => (
              <div
                key={speaker.id}
                onClick={() => toggleSpeaker(speaker.id)}
                className={`border-2 rounded-xl p-4 text-center cursor-pointer transition transform hover:scale-105 ${
                  selectedSpeakers.includes(speaker.id)
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-20 h-20 mx-auto rounded-full mb-2 object-cover"
                />
                <div className="font-medium">{speaker.name}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>Generating...</span>
            </span>
          ) : (
            "Generate Podcast"
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 text-center text-lg font-semibold ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          } animate-fade-in`}
        >
          {message}
        </div>
      )}

      {audioUrl && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl mb-4 font-bold">🎧 Your Podcast is Ready!</h2>
          <audio
            controls
            src={audioUrl}
            className="w-full max-w-md mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default PodcastForm;