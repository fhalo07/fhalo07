let mediaRecorder;
let recordedChunks = [];
let stream;

// Function to start recording
async function startRecording(label) {
  try {
    console.log(`Starting recording for: ${label}`);
    
    // Request access to user's webcam and microphone
    stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    
    // Show the stream in a video element for feedback (optional)
    const videoPreview = document.createElement('video');
    videoPreview.srcObject = stream;
    videoPreview.autoplay = true;
    videoPreview.style.position = 'fixed';
    videoPreview.style.top = '10px';
    videoPreview.style.left = '10px';
    videoPreview.style.width = '200px';
    videoPreview.style.border = '2px solid black';
    videoPreview.setAttribute('id', 'videoPreview');
    document.body.appendChild(videoPreview);

    // Initialize MediaRecorder
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    // Collect data chunks
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // Handle stop event
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // Create download link
      const downloadLink = document.getElementById("download");
      downloadLink.href = url;
      downloadLink.style.display = "block";

      // Remove the video preview
      const preview = document.getElementById('videoPreview');
      if (preview) {
        preview.remove();
      }

      // Stop all tracks of the stream
      stream.getTracks().forEach(track => track.stop());
    };

    // Start recording
    mediaRecorder.start();
    console.log("Recording started");
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

// Function to stop recording
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    console.log("Recording stopped");
  }
}

