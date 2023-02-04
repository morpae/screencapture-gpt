const startRecordingButton = document.querySelector("#start-recording");
const stopRecordingButton = document.querySelector("#stop-recording");
const downloadLink = document.querySelector("#download-link");

startRecordingButton.addEventListener("click", startRecording);
stopRecordingButton.addEventListener("click", stopRecording);

let recorder;

async function startRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia();
  recorder = new MediaRecorder(stream);
  const chunks = [];
  
  recorder.addEventListener("dataavailable", event => {
    chunks.push(event.data);
  });
  
  recorder.addEventListener("stop", () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.style.display = "block";
    downloadLink.innerText = "Descargar video";
  });
  
  recorder.start();
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;
}

function stopRecording() {
  recorder.stop();
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;
}
