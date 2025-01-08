let mediaRecorder;
let recordedChunks = [];

// Start Recording
async function startRecording(label) {
  try {
    console.log(`Starting recording for: ${label}`);
    // Access webcam or screen
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    // Create MediaRecorder instance
    mediaRecorder = new MediaRecorder(stream);

    // Event: When data is available
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // Event: When recording stops
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // Create download link
      const downloadLink = document.getElementById("download");
      downloadLink.href = url;
      downloadLink.style.display = "block";
    };

    // Start recording
    mediaRecorder.start();
    console.log("Recording started");
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

// Stop Recording
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    console.log("Recording stopped");
  }
}
