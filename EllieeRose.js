// Select elements
const video = document.getElementById('video');
const volumeControl = document.getElementById('volume');

// Stream URL (replace with your live stream URL)
const streamUrl = "https://edge-hls.doppiocdn.com/hls/130532193/master/130532193.m3u8";

// Explicitly disable video controls
video.controls = false;

// Initialize HLS.js or fallback to native HLS support
if (Hls.isSupported()) {
  const hls = new Hls({
    debug: false,
  });

  // Load and attach the video source
  hls.loadSource(streamUrl);
  hls.attachMedia(video);

  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    console.log("HLS attached, starting playback...");
    video.muted = false;
    video.play().catch(err => console.error("Playback error:", err));
  });

  // Handle errors
  hls.on(Hls.Events.ERROR, (event, data) => {
    console.error("HLS error event:", data);
    if (data.fatal && data.type === Hls.ErrorTypes.NETWORK_ERROR) {
      console.log("Network error - attempting to reload...");
      hls.loadSource(streamUrl);
    }
  });
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  console.log("Native HLS support detected. Setting video source directly.");
  video.src = streamUrl;
  video.addEventListener("loadedmetadata", () => {
    video.play().catch(err => console.error("Playback error:", err));
  });
} else {
  console.error("HLS is not supported in this browser.");
}

// Volume control
volumeControl.addEventListener('input', () => {
  video.volume = volumeControl.value;
  console.log("Volume set to:", video.volume);
});