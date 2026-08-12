import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

let detector;

let repCount = 0;
let currentExercise = "squat";
let movementState = "IDLE";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const repCountEl = document.getElementById("repCount");
const stateEl = document.getElementById("state");
const statusEl = document.getElementById("status");
const exerciseSelectEl = document.getElementById("exerciseSelect");
const exerciseNoteEl = document.getElementById("exerciseNote");
const barControlRowEl = document.getElementById("barControlRow");

function updateUI() {
  repCountEl.textContent = repCount;
  stateEl.textContent = movementState;
}

function resetExerciseState() {
  repCount = 0;
  movementState = "IDLE";

  exerciseNoteEl.textContent =
    "Exercise validation logic is not included in this public version.";

  barControlRowEl.style.display = "none";

  statusEl.textContent =
    "Public version — validation logic omitted.";

  updateUI();
}

exerciseSelectEl.addEventListener("change", (event) => {
  currentExercise = event.target.value;
  resetExerciseState();
});

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 640,
      height: 480
    },
    audio: false
  });

  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      video.play();

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      resolve(video);
    };
  });
}

async function createDetector() {
  await tf.setBackend("webgl");
  await tf.ready();

  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      enableSmoothing: true
    }
  );
}

function drawKeypoints(keypoints) {
  for (const keypoint of keypoints) {
    if (keypoint.score > 0.4) {
      ctx.beginPath();
      ctx.arc(
        keypoint.x,
        keypoint.y,
        5,
        0,
        2 * Math.PI
      );

      ctx.fillStyle = "#00ff88";
      ctx.fill();
    }
  }
}

async function detectPose() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const poses = await detector.estimatePoses(video);

  if (poses.length === 0) {
    statusEl.textContent = "No pose detected";
    requestAnimationFrame(detectPose);
    return;
  }

  const keypoints = poses[0].keypoints;

  drawKeypoints(keypoints);

  statusEl.textContent =
    "Pose detected — validation logic omitted.";

  updateUI();

  requestAnimationFrame(detectPose);
}

async function init() {
  statusEl.textContent = "Starting webcam...";
  await setupCamera();

  statusEl.textContent = "Loading pose model...";
  await createDetector();

  currentExercise = exerciseSelectEl.value;
  resetExerciseState();

  statusEl.textContent =
    "Public version loaded — validation logic omitted.";

  detectPose();
}

init();