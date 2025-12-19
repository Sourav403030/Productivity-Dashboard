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


