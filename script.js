//Date-Time Widget

let dateTimeh3 = document.querySelector(".date-time h3");
let dateTimeh1 = document.querySelector(".date-time h1");

setInterval(() => {
  let date = new Date();
  // Get day name (Monday, Tuesday, etc.)
  dateTimeh3.textContent = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Get time string
  dateTimeh1.textContent = date.toLocaleTimeString();
}, 1000);

// Switch Theme

let themes = [
  {
    primary: "#2D2424",
    secondary: "#5C3D2E",
    ternary: "#B85C38",
    quadrary: "#E0C097",
  },
  {
    primary: "#3B4953",
    secondary: "#5A7863",
    ternary: "#90AB8B",
    quadrary: "#EBF4DD",
  },
  {
    primary: "#313647",
    secondary: "#435663",
    ternary: "#A3B087",
    quadrary: "#FFF8D4",
  },
  {
    primary: "#37353E",
    secondary: "#44444E",
    ternary: "#715A5A",
    quadrary: "#D3DAD9",
  },
  {
    primary: "#574964",
    secondary: "#9F8383",
    ternary: "#C8AAAA",
    quadrary: "#FFDAB3",
  },
];

let changeThemeBtn = document.querySelector(".change-theme");

const root = document.documentElement;

changeThemeBtn.addEventListener("click", () => {
  let randomTheme = Math.floor(Math.random() * themes.length);
  root.style.setProperty("--primary", themes[randomTheme].primary);
  root.style.setProperty("--secondary", themes[randomTheme].secondary);
  root.style.setProperty("--ternary", themes[randomTheme].ternary);
  root.style.setProperty("--quadrary", themes[randomTheme].quadrary);

  localStorage.setItem("--primary", themes[randomTheme].primary);
  localStorage.setItem("--secondary", themes[randomTheme].secondary);
  localStorage.setItem("--ternary", themes[randomTheme].ternary);
  localStorage.setItem("--quadrary", themes[randomTheme].quadrary);
});

const savedPrimary = localStorage.getItem("--primary");
const savedSecondary = localStorage.getItem("--secondary");
const savedTernary = localStorage.getItem("--ternary");
const savedQuadrary = localStorage.getItem("--quadrary");

if (savedPrimary && savedSecondary && savedTernary && savedQuadrary) {
  root.style.setProperty("--primary", savedPrimary);
  root.style.setProperty("--secondary", savedSecondary);
  root.style.setProperty("--ternary", savedTernary);
  root.style.setProperty("--quadrary", savedQuadrary);
}

// Pomodoro Widget

let shortBreakBtn = document.querySelector(".short-break");
let focus = document.querySelector(".focus");
let longBreakBtn = document.querySelector(".long-break");
let play = document.querySelector(".play");
let restart = document.querySelector(".restart");

let pomodoro = document.querySelector(".pomo-center h1");

let counter = 1500; // Default 25 minutes
let timerInterval = null;
let isRunning = false;

// Function to format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Function to update the display
function updateDisplay() {
  pomodoro.textContent = formatTime(counter);
}

// Initialize display
updateDisplay();

shortBreakBtn.addEventListener("click", () => {
  counter = 300;
  updateDisplay();
  stopTimer();
});

longBreakBtn.addEventListener("click", () => {
  counter = 900;
  updateDisplay();
  stopTimer();
});

focus.addEventListener("click", () => {
  counter = 1500;
  updateDisplay();
  stopTimer();
});

// Function to start timer
function startTimer() {
  if (!isRunning && counter > 0) {
    isRunning = true;
    play.innerHTML = '<i class="ri-pause-line"></i>';

    timerInterval = setInterval(() => {
      counter--;
      updateDisplay();

      if (counter <= 0) {
        stopTimer();
        // Optional: Add notification or sound when timer ends
        alert("Timer finished!");
      }
    }, 1000);
  }
}

// Function to stop/pause timer
function stopTimer() {
  isRunning = false;
  play.innerHTML = '<i class="ri-play-line"></i>';

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Play/Pause button functionality
play.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
});

// Restart button functionality
restart.addEventListener("click", () => {
  stopTimer();
  // Reset to last selected time (default focus time if none selected)
  const currentText = pomodoro.textContent;
  if (currentText.startsWith("5:")) {
    counter = 300; // Short break
  } else if (currentText.startsWith("15:")) {
    counter = 900; // Long break
  } else {
    counter = 1500; // Focus time
  }
  updateDisplay();
});

// Motivation quote Widget

let fetchQuote = async () => {
  let quote = await fetch("https://api.quotable.io/random");
  let response = await quote.json();

  let quoteContent = document.querySelector(".quote-content");
  let quoteAuthor = document.querySelector(".quote-author");

  quoteContent.textContent = response.content;
  quoteAuthor.textContent = '-' + response.author
};

fetchQuote();
