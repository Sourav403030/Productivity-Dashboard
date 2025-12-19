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
    }
]

let changeThemeBtn = document.querySelector(".change-theme");

const root = document.documentElement;

changeThemeBtn.addEventListener("click", ()=>{
    let randomTheme = Math.floor(Math.random() * themes.length);
    root.style.setProperty('--primary', themes[randomTheme].primary);
    root.style.setProperty('--secondary', themes[randomTheme].secondary);
    root.style.setProperty('--ternary', themes[randomTheme].ternary);
    root.style.setProperty('--quadrary', themes[randomTheme].quadrary);

    localStorage.setItem("--primary", themes[randomTheme].primary);
    localStorage.setItem("--secondary", themes[randomTheme].secondary);
    localStorage.setItem("--ternary", themes[randomTheme].ternary);
    localStorage.setItem("--quadrary", themes[randomTheme].quadrary);
})

const savedPrimary = localStorage.getItem("--primary")
const savedSecondary = localStorage.getItem("--secondary")
const savedTernary = localStorage.getItem("--ternary")
const savedQuadrary = localStorage.getItem("--quadrary");

if(savedPrimary && savedSecondary && savedTernary && savedQuadrary){
    root.style.setProperty("--primary", savedPrimary);
    root.style.setProperty("--secondary", savedSecondary);
    root.style.setProperty("--ternary", savedTernary);
    root.style.setProperty("--quadrary", savedQuadrary);
}

