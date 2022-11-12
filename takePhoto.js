//const { createWorker } = require("tesseract.js");
//const picture = require("./takePhoto");

let width = 1280; // We will scale the photo width to this
let height = 720; // This will be computed based on the input stream

let streaming = false;

let video = null;
let canvas = null;
let photo = null;
let startbutton = null;
let paragraph = null;

const worker = Tesseract.createWorker({
  logger: (m) => console.log(m), // Add logger here
});

async function readPicture(data) {
  await worker.load();
  await worker.loadLanguage("slv");
  await worker.initialize("slv");
  const {
    data: { text, paragraphs },
  } = await worker.recognize(data);
  console.log(text, "inside Tesseract");
  paragraph.innerText = text;
  //console.log(data, "inside app");
  await worker.terminate();
}

function startup() {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  photo = document.getElementById("photo");
  paragraph = document.getElementById("paragraph");
  startbutton = document.getElementById("startbutton");
  cameraWidth = document.getElementById("camera-width");
  cameraHeight = document.getElementById("camera-height");
  clearphoto();
}

startup();
const constraints = {
  audio: false,
  video: {
    facingMode: "environment",
    width: { min: 1024, ideal: 1920, max: 1920 },
    height: { min: 576, ideal: 1080, max: 1080 },
    frameRate: { ideal: 30, max: 60 },
  },
};
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    video.srcObject = stream;
    video.play();
    console.log(video.videoWidth, video.videoHeight, "inside stram");
  })
  .catch((err) => {
    console.error(`An error occurred: ${err}`);
  });

video.addEventListener(
  "canplay",
  (ev) => {
    console.log(video.videoHeight, video.videoWidth, "inside Canplay");
    cameraWidth.innerText = "Camera Width:" + video.videoWidth;
    cameraHeight.innerText = "Camera Height:" + video.videoHeight;
    if (!streaming) {
      //height = (video.videoHeight / video.videoWidth) * width;

      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      streaming = true;
    }
  },
  false
);

startbutton.addEventListener(
  "click",
  (ev) => {
    data = takepicture();
    console.log("inside eventlistener", data);
    readPicture(data);
    //ev.preventDefault();
  },
  false
);

function takepicture() {
  const context = canvas.getContext("2d", { colorSpace: "srgb" });
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    console.log("inside takepicture", width, height);
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL("image/jpg");
    photo.setAttribute("src", data);
    return data;
  } else {
    clearphoto();
  }
}

function clearphoto() {
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}
