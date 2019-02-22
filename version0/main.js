const input = document.querySelector("input[type=file]");
const content = document.querySelector(".content");
const restart = document.querySelector(".restart");
const colors = document.querySelectorAll(".color");
const mask1 = document.querySelector(".mask1");
const mask2 = document.querySelector(".mask2");
const mask3 = document.querySelector(".mask3");
const elementsDiv = document.querySelector(".elements");
const photoButton = document.querySelector(".photoButton");
const videoEl = document.querySelector(".video");
const cross = document.querySelector(".cross");
let selectedMask;
let savedTexture;
let savedColor;

let firstTime = true;
let videoIsOn = false;
var streaming = false,
  video = document.querySelector("#video"),
  cover = document.querySelector("#cover"),
  canvas = document.querySelector("#canvas"),
  photo = document.querySelector("#photo"),
  startbutton = document.querySelector("#startbutton"),
  width = 320,
  height = 0;

navigator.getMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

let elements = document.querySelectorAll(".element");

mask1.addEventListener("click", () => {
  maskHandler(mask1);
});
mask2.addEventListener("click", () => {
  maskHandler(mask2);
});
mask3.addEventListener("click", () => {
  maskHandler(mask3);
});

for (color of colors) {
  color.addEventListener("click", e => {
    if (selectedMask) {
      selectedMask.style.backgroundColor = e.target.dataset.color;
    } else {
      savedColor = e.target.dataset.color;
    }
  });
}

input.addEventListener("change", e => {
  let imgPath = URL.createObjectURL(e.target.files[0]);
  createTextureElement(imgPath);
});

restart.addEventListener("click", () => {
  mask1.style.background = "initial";
  mask2.style.background = "initial";
  mask3.style.background = "initial";
  savedColor = undefined;
  savedTexture = undefined;
  selectedMask = undefined;
});

photoButton.addEventListener("click", () => {
  content.style.visibility = "hidden";
  videoEl.style.display = "block";
  if (!videoIsOn) {
    videoIsOn = true;
    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.srcObject = stream;
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  }
  if (firstTime) {
    firstTime = false;
    video.addEventListener(
      "canplay",
      function(ev) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL("image/png");
      createTextureElement(data);
    }
    startbutton.addEventListener("click", function(ev) {
      takepicture();
      ev.preventDefault();
    });
  }
});

cross.addEventListener("click", () => {
  content.style.visibility = "visible";
  videoEl.style.display = "none";
  video.srcObject.getTracks()[0].stop();
  videoIsOn = false;
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
});

function createTextureElement(url) {
  let div = document.createElement("div");
  div.classList.add("element");
  div.dataset.path = url;
  div.style.backgroundImage = `url(${url})`;
  elementsDiv.appendChild(div);
  elements = document.querySelectorAll(".element");
  for (element of elements) {
    element.addEventListener("click", e => {
      if (selectedMask) {
        selectedMask.style.backgroundColor = "initial";
        selectedMask.style.background = `url(${e.target.dataset.path})`;
      } else {
        savedTexture = `url(${e.target.dataset.path})`;
      }
    });
  }
}

function maskHandler(mask) {
  selectedMask = mask;
  if (savedTexture) {
    mask.style.background = savedTexture;
  } else if (savedColor) {
    mask.style.background = savedColor;
  }
  savedColor = undefined;
}
