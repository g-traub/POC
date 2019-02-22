//Elements
const restart = document.querySelector('.restart');
const colors = document.querySelectorAll('.color');
const textile1 = document.querySelector('.vetement1__img');
const textile2 = document.querySelector('.vetement2__img');
const textile3 = document.querySelector('.vetement3__img');
const textiles = [textile1, textile2, textile3];
const input1 = document.querySelector('input:nth-of-type(1)');
const input2 = document.querySelector('input:nth-of-type(2)');
const input3 = document.querySelector('input:nth-of-type(3)');
const inputs = [input1, input2, input3];
const cross1 = document.querySelector('.cross1');
const cross2 = document.querySelector('.cross2');
const cross3 = document.querySelector('.cross3');
const crosses = [cross1, cross2, cross3];
const photoButton = document.querySelector('.photoButton');
const videoEl = document.querySelector(".video");
const cross = document.querySelector('.cross');
const main = document.querySelector('main');

//Video variables
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

//masks
const allMasks = document.querySelectorAll('.mask');
const masks1 = document.querySelectorAll("div[class*='mask1");
const mask1 = document.querySelector('.mask1');
const mask1bis = document.querySelector('.mask1bis');
const mask1ter = document.querySelector('.mask1ter');
const mask2 = document.querySelector('.mask2');
const mask3 = document.querySelector('.mask3');
const masks4 = document.querySelectorAll("div[class*='mask4']");
const mask4 = document.querySelector('.mask4');
const mask4bis = document.querySelector('.mask4bis');
const mask5 = document.querySelector('.mask5');

//other variables
let selectedMask = [];
let savedTexture;
let savedColor;
let newMask;

//functions
const maskHandler = () => {
  if (savedTexture) {
    for(let selected of selectedMask){
      selected.style.background = savedTexture;
    }
  } else if (savedColor) {
    for(let selected of selectedMask){
      selected.style.background = savedColor;
    }
  }
  savedColor = undefined;
  savedTexture = undefined;
}
const prevent = e => {
  e.preventDefault();
  if (selectedMask.length !== 0) {
    for (let selected of selectedMask){
      selected.style.backgroundColor = "initial";
      selected.style.background = `url(${e.target.dataset.path})`;
    }
  } else {
    savedTexture = `url(${e.target.dataset.path})`;
  }
}

//Events listeners (and some actions)
for (let mask of masks1){
  mask.addEventListener('click', () => {
    selectedMask = [mask1,mask1bis,mask1ter];
    maskHandler();
  }); 
  mask.addEventListener('mouseenter', () => {
    for (let mask of masks1){
      mask.classList.add('hovered');
    }
  });
  mask.addEventListener('mouseleave', () => {
    for (let mask of masks1){
      mask.classList.remove('hovered');
    }
  })
}
mask2.addEventListener("click", () => {
  selectedMask = [mask2];
  maskHandler();
});
mask3.addEventListener("click", () => {
  selectedMask = [mask3];
  maskHandler();
});
for (let mask of masks4){
  mask.addEventListener("click", () => {
    selectedMask = [mask4,  mask4bis];
    maskHandler();
  });
  mask.addEventListener('mouseenter', () => {
    for (let mask of masks4){
      mask.classList.add('hovered');
    }
  });
  mask.addEventListener('mouseleave', () => {
    for (let mask of masks4){
      mask.classList.remove('hovered');
    }
  })
}
mask5.addEventListener("click", () => {
  selectedMask = [mask5];
  maskHandler();
});

restart.addEventListener('click', () => {
  for (let mask of masks1){
    mask.style.background = "initial";
  }
  mask2.style.background = "initial";
  mask3.style.background = "initial";
  for (let mask of masks4){
    mask.style.background = "initial";
  }
  mask5.style.background = "initial";
  savedColor = undefined;
  savedTexture = undefined;
  selectedMask = [];
  for (let textile of textiles){
    textile.style.background = 'none';
    textile.dataset.occupied = 'false';
    textile.innerHTML = "<img src='Group2.png' alt='import logo'>";
  }
  for (let cross of crosses){
    cross.style.display = 'none';
  }
  for (let input of inputs){
    input.removeEventListener('click', prevent);
  }
});

for (color of colors) {
  color.addEventListener('click', e => {
    if (selectedMask.length !== 0) {
      for (selected of selectedMask){
        selected.style.backgroundColor = e.target.dataset.color;
      }
    }else {
      savedColor = e.target.dataset.color;
    }
  });
}

input1.addEventListener("change", e => {
  let imgPath = URL.createObjectURL(e.target.files[0]);
  textile1.innerHTML = "";
  textile1.style.backgroundImage = `url(${imgPath})`;
  textile1.dataset.occupied = 'true';
  input1.dataset.path = imgPath;
  cross1.style.display = 'flex';
  selectedMask = [];
  input1.addEventListener('click', prevent);
});
input2.addEventListener("change", e => {
  let imgPath = URL.createObjectURL(e.target.files[0]);
  textile2.innerHTML = "";
  textile2.style.backgroundImage = `url(${imgPath})`;
  textile2.dataset.occupied = 'true';
  input2.dataset.path = imgPath;
  cross2.style.display = 'flex';
  selectedMask = [];
  input2.addEventListener('click', prevent);
});
input3.addEventListener("change", e => {
  let imgPath = URL.createObjectURL(e.target.files[0]);
  textile3.innerHTML = "";
  textile3.style.backgroundImage = `url(${imgPath})`;
  textile3.dataset.occupied = 'true';
  input3.dataset.path = imgPath;
  cross3.style.display = 'flex';
  selectedMask = [];
  input3.addEventListener('click', prevent);
});

cross1.addEventListener('click', e => {
  textile1.innerHTML = "<img src='Group2.png' alt='import logo'>";
  for (let mask of allMasks){
    if (mask.style.background.includes(input1.dataset.path) ||        mask.style.backgroundImage.includes(input1.dataset.path)){
      mask.style.background = 'initial';
      mask.style.backgroundImage = 'none';
    }
  }
  textile1.style.background ='none';
  textile1.dataset.occupied = 'false';
  cross1.style.display = 'none';
  input1.removeEventListener('click', prevent);
})
cross2.addEventListener('click', e => {
  textile2.innerHTML = "<img src='Group2.png' alt='import logo'>";
  for (let mask of allMasks){
    if (mask.style.background.includes(input2.dataset.path) ||        mask.style.backgroundImage.includes(input2.dataset.path)){
      mask.style.background = 'initial';
      mask.style.backgroundImage = 'none';
    }
  }
  textile2.style.background = 'none';
  textile2.dataset.occupied = 'false';
  cross2.style.display = 'none';
  input2.removeEventListener('click', prevent);
})
cross3.addEventListener('click', e => {
  textile3.innerHTML = "<img src='Group2.png' alt='import logo'>";
  for (let mask of allMasks){
    if (mask.style.background.includes(input3.dataset.path) ||  mask.style.backgroundImage.includes(input3.dataset.path)){
      mask.style.background = 'initial';
      mask.style.backgroundImage = 'none';
    }
  }
  textile3.style.background = 'none';
  textile3.dataset.occupied = 'false';
  cross3.style.display = 'none';
  input3.removeEventListener('click', prevent);
})

photoButton.addEventListener("click", () => {
  main.style.visibility = "hidden";
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
      for (let textile of textiles){
        if (textile.dataset.occupied === 'false'){
          textile.innerHTML = "";
          textile.style.backgroundImage = `url(${data})`;
          textile.dataset.occupied = 'true';
          let nb = textile.className.substr(16,1);
          eval('cross'+nb).style.display = 'flex';
          selectedMask = [];
          eval('input'+nb).dataset.path = data;
          eval('input'+nb).addEventListener('click', prevent);
          main.style.visibility = "visible";
          videoEl.style.display = "none";
          video.srcObject.getTracks()[0].stop();
          videoIsOn = false;
          let context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
      }
    }
    startbutton.addEventListener("click", function(ev) {
      takepicture();
      ev.preventDefault();
    });
  }
});

cross.addEventListener("click", () => {
  main.style.visibility = "visible";
  videoEl.style.display = "none";
  video.srcObject.getTracks()[0].stop();
  videoIsOn = false;
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
});