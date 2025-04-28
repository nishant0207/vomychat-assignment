export async function generatePodcast(topic: string, selectedSpeakers: string[]) {
    const response = await fetch('http://127.0.0.1:8000/generate_podcast/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        selected_speakers: selectedSpeakers,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate podcast');
    }
  
    const blob = await response.blob();
    return blob;
  }