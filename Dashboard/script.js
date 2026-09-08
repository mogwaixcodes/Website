
/* =========================
   DATE
========================= */

const dateEl = document.getElementById("currentDate");

function updateDate() {
    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    dateEl.textContent = now.toLocaleDateString(undefined, options);
}

updateDate();


/* =========================
   CLOCK
========================= */

const clockEl = document.getElementById("clock");

function updateClock() {
    const now = new Date();

    clockEl.textContent = now.toLocaleTimeString();
}

updateClock();

setInterval(updateClock, 1000);


/* =========================
   CALENDAR
========================= */

const calendarGrid = document.getElementById("calendarGrid");
const calendarTitle = document.getElementById("calendarTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");


// Today's date
const today = new Date();


// Month/year currently being displayed
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


// Month names
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =========================
   RENDER CALENDAR
========================= */

function renderCalendar() {

    // Clear the existing calendar
    calendarGrid.innerHTML = "";


    // Find the weekday that the month starts on
    // 0 = Sunday
    // 1 = Monday
    // ...
    // 6 = Saturday
    const firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();


    // Find the number of days in the month
    const totalDays = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();


    // Update the calendar title
    calendarTitle.textContent =
        `${monthNames[currentMonth]} ${currentYear}`;


    // Create empty cells before the first day
    for (let i = 0; i < firstDay; i++) {

        const emptyCell = document.createElement("div");

        calendarGrid.appendChild(emptyCell);
    }


    // Create the numbered days
    for (let day = 1; day <= totalDays; day++) {

        const dayElement = document.createElement("div");

        dayElement.textContent = day;


        // Highlight today's date
        if (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ) {
            dayElement.classList.add("today");
        }


        // Add the day to the calendar
        calendarGrid.appendChild(dayElement);
    }
}


/* =========================
   PREVIOUS MONTH
========================= */

prevBtn.addEventListener("click", () => {

    currentMonth--;

    // If we go before January,
    // move to December of the previous year
    if (currentMonth < 0) {

        currentMonth = 11;
        currentYear--;
    }

    renderCalendar();
});


/* =========================
   NEXT MONTH
========================= */

nextBtn.addEventListener("click", () => {

    currentMonth++;

    // If we go past December,
    // move to January of the next year
    if (currentMonth > 11) {

        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
});


/* =========================
   INITIAL RENDER
========================= */

renderCalendar();

/* ============================ */

const weatherElement = document.getElementById("weather");
const weatherData = {
    temperature: 72,
    conditions: "Clear sky",
    humidity: 48,
    wind: 6
};

function displayWeather(data) {
    weatherElement.replaceChildren();

    const temperature = document.createElement("p");
    temperature.textContent = `${data.temperature}°F`;

    const conditions = document.createElement("p");
    conditions.textContent = data.conditions;

    weatherElement.append(temperature, conditions);
}

displayWeather(weatherData);

    console.log("Weather JavaScript is running");

    /* ======== TO DO LIST ==========*/

    const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

addTodoButton.addEventListener("click", () => {

    const taskText = todoInput.value.trim();

    if (taskText === "") {
        return;
    }

    const listItem = document.createElement("li");

    listItem.textContent = taskText;

listItem.addEventListener("click", () => {
    listItem.classList.toggle("completed");
});

todoList.appendChild(listItem);

    todoInput.value = "";
});



/*=========Notes==============*/

const notes = document.getElementById("notes");

notes.value = localStorage.getItem("dashboardNotes") || "";

notes.addEventListener("input", () => {
    localStorage.setItem("dashboardNotes", notes.value);
});


/*=============QUOTE================*/

const quoteElement = document.getElementById("quote");
quoteElement.textContent = "This is a test quote.";
const quotes = [
    "The future depends on what you do today.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Believe you can and you're halfway there.",
    "The best way to predict the future is to create it.",
    "Great things are done by a series of small things brought together.",
    "It always seems impossible until it's done.",
    "Start where you are. Use what you have. Do what you can.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "A little progress each day adds up to big results."
];

const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

quoteElement.textContent = `"${randomQuote}"`;

/* =========================
   NEWS
========================= */

const newsList = document.getElementById("newsList");

function displayNews(stories) {
    newsList.replaceChildren();

    stories.forEach(story => {
        const article = document.createElement("article");
        article.classList.add("news-item");

        const title = document.createElement("h3");
        title.textContent = story.title;

        const description = document.createElement("p");
        description.textContent = story.description;

        const author = document.createElement("span");
        author.textContent = story.author;

        article.append(title, description, author);
        newsList.appendChild(article);
    });
}

displayNews([{
    title: "News updates unavailable",
    description: "Live news is disabled until it can be loaded through a secure server-side proxy.",
    author: "Dashboard"
}]);