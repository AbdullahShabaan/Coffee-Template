// open setting box
let icon = document.querySelector(".toggle-setting");

icon.onclick = function () {
  document.querySelector(".setting-box").classList.toggle("open");
  document
    .querySelector(".toggle-setting .fa-gear")
    .classList.toggle("fa-spin");
};

// switch colors in setting box
let colors = document.querySelectorAll(".colors-list li");
colors.forEach((e) => {
  e.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
  });
});

// check if there a color in local storage

localStorage.getItem("color") !== null
  ? document.documentElement.style.setProperty(
      "--main--color",
      localStorage.getItem("color")
    )
  : document.querySelector(".colors-list li").classList.add("active");

colors.forEach((e) => {
  e.addEventListener("click", function (e) {
    localStorage.setItem("color", e.target.dataset.color);
  });
});

// change active class from li to onther li in setting box
colors.forEach((e) => {
  e.addEventListener("click", function (event) {
    colors.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  });
});

// select the same color in the local sotrage
window.onload = function (e) {
  colors.forEach((e) => {
    if (e.getAttribute("data-color") == localStorage.getItem("color")) {
      e.classList.add("active");
    }
  });
  e.preventDefault();
};

// change active class from button to other in random background option

let buttonsBackground = document.querySelectorAll(
  ".setting-container .option-box span"
);
buttonsBackground.forEach((e) => {
  e.addEventListener("click", function () {
    buttonsBackground.forEach((e) => {
      e.classList.remove("active");
    });
    this.classList.add("active");

    // save background random oprion to local storage
    localStorage.setItem("backgroundRandom", e.getAttribute("data-background"));
  });
});

// change landing background
let landingBackground = document.querySelector(".landing-page");
let backgroundImages = ["c1.png", "c2.png", "c3.png", "landing.png"];

let backgroundStatus;

// check background status in the local storage or not
if (localStorage.getItem("backgroundRandom") === null) {
  backgroundStatus = true;
  document
    .querySelector(".setting-box .setting-container .option-box .yes")
    .classList.add("active");
} else {
  if (localStorage.getItem("backgroundRandom") == "yes") {
    backgroundStatus = true;
    document
      .querySelector(".setting-box .setting-container .option-box .yes")
      .classList.add("active");
  } else {
    backgroundStatus = false;
    document
      .querySelector(".setting-box .setting-container .option-box .no")
      .classList.add("active");
  }
}
let backgroundChanged;
function changeBackground() {
  if (backgroundStatus === true) {
    backgroundChanged = setInterval(() => {
      let rand = Math.floor(Math.random() * backgroundImages.length);
      landingBackground.style.cssText = `background-image: url('images/${backgroundImages[rand]}')`;
    }, 3000);
  }
}
changeBackground();

// stop background changing
let stop = document.querySelector(
  ".setting-box .setting-container .option-box .no"
);

stop.onclick = function () {
  backgroundStatus = false;
  clearInterval(backgroundChanged);
};

// play background changing
let start = document.querySelector(
  ".setting-box .setting-container .option-box .yes"
);

start.onclick = function () {
  if (backgroundStatus !== true) {
    backgroundStatus = true;
    changeBackground();
  }
};

// Header Scroll
const header = document.querySelector(".header");
header.dataset.originalStyles = header.style.cssText;

const headerLinks = document.querySelectorAll(".header .links li a");
headerLinks.forEach((e) => {
  e.dataset.originalStyles = e.style.cssText;
});

window.onscroll = function () {
  if (localStorage.getItem("headerScroll") !== "no") {
    if (scrollY > 80) {
      document.querySelector(".header").style.cssText =
        "background-color:#3f271e; ";
    } else {
      header.style.cssText = header.dataset.originalStyles;
      headerLinks.forEach((e) => {
        e.style.cssText = e.dataset.originalStyles;
      });
    }
  } else {
    header.style.position = "relative";
  }
};

// Stop Header Scroll
let scrollYes = document.querySelector(".option-box .yes.scroll");
let scrollNo = document.querySelector(".option-box .no.scroll");

scrollNo.addEventListener("click", function () {
  header.style.position = "relative";
  localStorage.setItem("headerScroll", "no");
});

scrollYes.addEventListener("click", function () {
  header.style.position = "fixed";
  localStorage.setItem("headerScroll", "yes");
});

// animation of the skills
let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", function () {
  if (window.scrollY >= ourSkills.offsetTop - 200) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );
    allSkills.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
});

// create popup image

let gallery = document.querySelectorAll(".gallery .images-box  img");

gallery.forEach((image) => {
  image.addEventListener("click", function () {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popup = document.createElement("div");
    popup.className = "popup-box";

    let img = document.createElement("img");
    img.src = image.src;

    if (image.alt !== null) {
      let heading = document.createElement("h3");
      heading.className = "popup-heading";
      let headingText = document.createTextNode(image.alt);
      heading.appendChild(headingText);
      popup.append(heading);
    }
    popup.appendChild(img);
    document.body.appendChild(popup);

    let CloseButton = document.createElement("div");
    let CloseButtonText = document.createTextNode("X");
    CloseButton.appendChild(CloseButtonText);
    CloseButton.className = "XButton";
    popup.appendChild(CloseButton);

    // close the popup
    CloseButton.addEventListener("click", function () {
      overlay.remove();
      popup.remove();
    });
  });
});

// close the popup with click outside
document.addEventListener("click", (e) => {
  if (e.target.className == "popup-overlay") {
    e.target.nextSibling.remove();
    e.target.remove();
  }
});

// dynamic header link color change based on section

let sections = document.querySelectorAll(".section");
let headerLinksA = document.querySelectorAll(".header a");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset - 20 && top < offset + height) {
      headerLinksA.forEach((a) => {
        a.classList.remove("active");
        document
          .querySelector(".header a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
});

// Capitalize first letter
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

// Make Nav Bullets
let Headersections = document.querySelectorAll(".section");
let navBullets = document.createElement("div");
navBullets.className = "nav-bullets";

Headersections.forEach((e) => {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.setAttribute("go-to", e.getAttribute("id"));

  let toolTip = document.createElement("div");
  toolTip.className = "tool-tip";
  toolTip.innerHTML = e.getAttribute("id").capitalize();

  navBullets.appendChild(bullet);
  bullet.appendChild(toolTip);
  document.body.appendChild(navBullets);
});

// nav bullets scroll
let bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((e) => {
  e.addEventListener("click", function () {
    let id = e.getAttribute("go-to");
    document.querySelector("[id=" + id + "]").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// create handle active state
function handleActive(event) {
  event.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  event.classList.add("active");
}

// bullets option in the page setting box
let yesBullet = document.querySelector(".option-box div.yes");
let noBullet = document.querySelector(".option-box div.no");

yesBullet.addEventListener("click", function () {
  navBullets.style.display = "block";
  handleActive(yesBullet);
  localStorage.setItem("bulletsStatus", true);
});
noBullet.addEventListener("click", function (e) {
  handleActive(noBullet);
  navBullets.style.display = "none";
  localStorage.setItem("bulletsStatus", false);
});

if (localStorage.getItem("bulletsStatus") !== null) {
  if (localStorage.getItem("bulletsStatus") == "true") {
    yesBullet.click();
  } else {
    noBullet.click();
  }
}

// reset all changes in local storage
let reset = document.querySelector(".setting-box .reset");
reset.onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// show toggle menu
let toggleMenu = document.querySelector(".header .links");
let button = document.querySelector(".header .toggle-menu");
button.onclick = function () {
  toggleMenu.classList.toggle("open");
};

// close menu
window.addEventListener("click", function (e) {
  if (
    e.target === button ||
    e.target.parentElement === toggleMenu ||
    e.target.classList.contains("links") ||
    e.target.parentElement === button
  ) {
  } else {
    if (toggleMenu.classList.contains("open")) {
      toggleMenu.classList.remove("open");
    }
  }
});

// Up Button

let UpButton = document.querySelector(".upButton");
window.addEventListener("scroll", function () {
  if (this.scrollY >= 200) {
    UpButton.style.display = "flex";
  } else {
    UpButton.style.display = "none";
  }
});

UpButton.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});

// make Slider
let slides = document.querySelectorAll(".mySlides");
let rightClick = document.querySelector(".gallery .images-box .right");
let leftClick = document.querySelector(".gallery .images-box .left");

let counter = 0;
rightClick.onclick = function () {
  counter++;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (counter >= slides.length) {
    counter = 0;
  }
  slides[counter].style.display = "block";
};

let counter2 = 2;
leftClick.onclick = function () {
  counter2--;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (counter2 < 0) {
    counter2 = 2;
  }
  slides[counter2].style.display = "block";
};

// make slider in dot

let dot = Array.from(document.querySelector(".images-box .dot").children);
let count = 0;
dot.forEach((e) => {
  e.setAttribute("data", count);
  count++;
  e.addEventListener("click", function () {
    slides.forEach((e) => {
      e.classList.remove("active");
    });
    slides[e.getAttribute("data")].classList.add("active");

    dot.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  });
});
