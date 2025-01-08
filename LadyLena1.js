// Select elements
const video = document.getElementById('video');
const volumeControl = document.getElementById('volume');
const profileContainer = document.getElementById('profile-container');
const profileImage = document.getElementById('profile-image');

// Stream URL (replace with your live stream URL)
const streamUrl = "https://edge-hls.doppiocdn.net/hls/48302294/master/48302294_480p.m3u8;

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

// Volume control
volumeControl.addEventListener('input', () => {
  video.volume = volumeControl.value;
  console.log("Volume set to:", video.volume);
});
  
  var video = document.getElementById('video');
  var fallbackImage = "https://static-cdn.strpst.com/avatars/a/a/d/aad0312020e9b20c57c6a6d7609018a2-full";  // Profile image URL
"; // Replace with your image URL
  
  if (Hls.isSupported()) {
    var hls = new Hls({
      debug: false,
    });
    hls.loadSource("https://edge-hls.sagcoreedge.com/hls/174937216/master/174937216.m3u8");
    hls.attachMedia(video);

    hls.on(Hls.Events.MEDIA_ATTACHED, function() {
      video.muted = false;
      video.play();
    });

    hls.on(Hls.Events.ERROR, function(event, data) {
      if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR || 
          data.details === Hls.ErrorDetails.FRAG_LOAD_ERROR) {
        showFallbackImage();
      }
    });
  } else {
    showFallbackImage();
  }

  video.addEventListener('error', showFallbackImage);

  function showFallbackImage() {
    video.style.display = 'none';
    var img = document.createElement('img');
    img.src = fallbackImage;
    img.alt = "Stream unavailable";
    img.style.width = "100%";
    img.style.height = "100%";
    video.parentNode.insertBefore(img, video);
  }

