// Select elements
const video = document.getElementById('video');
const volumeControl = document.getElementById('volume');
const profileContainer = document.getElementById('profile-container');
const profileImage = document.getElementById('profile-image');

// Stream URL (replace with your live stream URL)
const streamUrl = "https://edge-hls.sagcoreedge.com/hls/174937216/master/174937216.m3u8";

// Profile Image URL (using the URL you provided)
const profileImageUrl = "https://static-cdn.strpst.com/avatars/a/a/d/aad0312020e9b20c57c6a6d7609018a2-full";  // Profile image URL

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

  // Detect if video stops and show profile image
  video.addEventListener('pause', () => {
    profileContainer.style.display = 'flex'; // Show profile image container
    profileImage.src = profileImageUrl; // Set the profile image
  });

  video.addEventListener('play', () => {
    profileContainer.style.display = 'none'; // Hide profile image container when video plays
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
