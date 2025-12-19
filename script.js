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
  quoteAuthor.textContent = "-" + response.author;
};

fetchQuote();

// Todo List widget

let taskInput = document.querySelector(".task-input input");
let todo = document.querySelector(".todo");

// Array to store todos
let todos = [];

// Load todos from localStorage on page load
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    displayTodos();
  }
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Display all todos on the page
function displayTodos() {
  // Clear existing todos (except heading and input)
  const existingTasks = todo.querySelectorAll(".todo-task");
  existingTasks.forEach(task => task.remove());
  
  // Add each todo to the DOM
  todos.forEach((todoText, index) => {
    createTodoElement(todoText, index);
  });
}

// Create a single todo element
function createTodoElement(todoText, index) {
  let todoTaskDiv = document.createElement("div");
  todoTaskDiv.setAttribute("class", "todo-task");
  todoTaskDiv.setAttribute("data-index", index);
  let todoTaskH2 = document.createElement("h2");
  let circleDiv = document.createElement("div");
  circleDiv.setAttribute("class", "circle");
  todoTaskDiv.append(todoTaskH2, circleDiv);
  todo.append(todoTaskDiv);
  todoTaskH2.textContent = todoText;
}

// Create new task
taskInput.addEventListener("keydown", (evt) => {
  if (evt.key == "Enter" && taskInput.value.trim() !== "") {
    // Add to todos array
    todos.push(taskInput.value.trim());
    
    // Save to localStorage
    saveTodos();
    
    // Create and display the new todo
    createTodoElement(taskInput.value.trim(), todos.length - 1);
    
    // Clear input
    taskInput.value = "";
  }
});

// Remove finished tasks using event delegation
todo.addEventListener("click", (evt) => {
  // Check if clicked element is a todo task or inside a todo task
  let todoTask = evt.target.closest(".todo-task");

  if (todoTask) {
    console.log("Task clicked:", todoTask);

    // Find the h2 and circle within this specific task
    let taskH2 = todoTask.querySelector("h2");
    let taskCircle = todoTask.querySelector(".circle");

    if (taskH2 && taskCircle) {
      taskH2.style.textDecoration = "line-through";
      taskH2.style.color = "var(--secondary)";
      taskCircle.style.backgroundColor = "var(--ternary)";
    }

    // Get the task index and remove from todos array
    const taskIndex = parseInt(todoTask.getAttribute("data-index"));
    if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < todos.length) {
      todos.splice(taskIndex, 1);
      saveTodos();
    }

    setTimeout(() => {
      todoTask.remove();
      // Refresh the display to update indices
      displayTodos();
    }, 1000);
  }
});

// Load todos when page loads
loadTodos();

// Weather Widget using WeatherAPI
async function fetchWeatherByCity(cityName = "Kochi") {
  try {
    const apiKey = null;
    // Use forecast endpoint to get 7-day weather forecast
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(cityName)}&days=7&aqi=no&alerts=no`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Weather Data:', data);
    
    // Update weather widget with data
    updateWeatherWidget(data);
    
  } catch (error) {
    console.error('Weather fetch error:', error);
    showWeatherError(error.message);
  }
}

// Function to update weather widget
function updateWeatherWidget(data) {
  const weatherInfo = document.querySelector('.weather-info');
  
  if (weatherInfo) {
    // Update temperature
    const tempElement = weatherInfo.querySelector('h1');
    if (tempElement) {
      tempElement.textContent = `${Math.round(data.current.temp_c)}°C`;
    }
    
    // Update location
    const locationElement = weatherInfo.querySelector('h2');
    if (locationElement) {
      locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    }
    
    // Update weather description
    const descElement = weatherInfo.querySelector('h3');
    if (descElement) {
      descElement.textContent = data.current.condition.text;
    }
    
    // Update feels like temperature
    const feelsLikeElement = weatherInfo.querySelector('h4');
    if (feelsLikeElement) {
      feelsLikeElement.innerHTML = `Feels like <span>${Math.round(data.current.feelslike_c)}°C</span>`;
    }
    
    // Update high/low temperatures for today
    const tempHighLowContainer = weatherInfo.querySelector('.temp-high-low');
    if (tempHighLowContainer && data.forecast && data.forecast.forecastday[0]) {
      const dayData = data.forecast.forecastday[0].day;
      const highTempElement = tempHighLowContainer.querySelector('h4:first-child');
      const lowTempElement = tempHighLowContainer.querySelector('h4:last-child');
      
      if (highTempElement) {
        highTempElement.innerHTML = `High <span>${Math.round(dayData.maxtemp_c)}°C</span>`;
      }
      
      if (lowTempElement) {
        lowTempElement.innerHTML = `Low <span>${Math.round(dayData.mintemp_c)}°C</span>`;
      }
    }
    
    // Update 7-day forecast
    updateWeekForecast(data.forecast);
  }
}

// Function to update 7-day weather forecast
function updateWeekForecast(forecastData) {
  const weekForecastContainer = document.querySelector('.week-forecast');
  
  if (weekForecastContainer && forecastData && forecastData.forecastday) {
    // Clear existing forecast
    weekForecastContainer.innerHTML = '';
    
    forecastData.forecastday.forEach((day, index) => {
      const date = new Date(day.date);
      const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Get weather icon class based on condition
      const weatherIconClass = getWeatherIconClass(day.day.condition.text);
      
      // Create forecast day element
      const forecastDay = document.createElement('div');
      forecastDay.className = 'day-forecast';
      
      forecastDay.innerHTML = `
        <h3>${dayName}</h3>
        <i class="${weatherIconClass}"></i>
        <h4>${Math.round(day.day.mintemp_c)}℃ / ${Math.round(day.day.maxtemp_c)}℃</h4>
      `;
      
      weekForecastContainer.appendChild(forecastDay);
    });
  }
}

// Function to map weather conditions to RemixIcon classes
function getWeatherIconClass(condition) {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return 'ri-sun-line';
  } else if (conditionLower.includes('partly cloudy') || conditionLower.includes('partly')) {
    return 'ri-sun-cloudy-line';
  } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
    return 'ri-cloudy-line';
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
    return 'ri-rainy-line';
  } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return 'ri-snowy-line';
  } else if (conditionLower.includes('thunderstorm') || conditionLower.includes('thunder')) {
    return 'ri-thunderstorms-line';
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return 'ri-mist-line';
  } else {
    return 'ri-cloudy-line'; // Default icon
  }
}

// Function to show weather error
function showWeatherError(errorMessage) {
  const weatherInfo = document.querySelector('.weather-info');
  if (weatherInfo) {
    const errorElement = weatherInfo.querySelector('h3') || weatherInfo.querySelector('h2');
    if (errorElement) {
      errorElement.textContent = `Error: ${errorMessage}`;
      errorElement.style.color = 'var(--ternary)';
    }
  }
}

// Add city search functionality
function setupCitySearch() {
  const cityInput = document.querySelector('.weather-info input');
  if (cityInput) {
    cityInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && cityInput.value.trim()) {
        fetchWeatherByCity(cityInput.value.trim());
        cityInput.value = '';
      }
    });
  }
}

// Initialize weather widget
fetchWeatherByCity("Kochi"); // Default city
setupCitySearch();