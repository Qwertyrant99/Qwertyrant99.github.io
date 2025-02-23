const fromCityElem = document.querySelector(".city_from");
const toCityElem = document.querySelector(".city_to");
const cityModal = document.querySelector(".search-modal__cities");
const fromInput = document.getElementById("origin");
const toInput = document.getElementById("destination");
let currentInput = null;

class City {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

const cities = [
  new City("Warsaw", "WAW"),
  new City("London", "LON"),
  new City("Paris", "PAR"),
  new City("Kyiv", "IEV"),
  new City("Berlin", "BER"),
  new City("Rome", "ROM"),
  new City("Dublin", "DUB"),
];

function openCityModal() {
  cityModal.style.display = "block";
  updateCityList("");
}

const cityList = document.createElement("div");
cityList.id = "cityList";

function updateCityList(filter) {
  cityModal.innerHTML = "";
  const cityHeader = document.createElement("div");
  cityHeader.classList.add("modal__city_header");
  cityHeader.textContent = "Closest airports";

  cityList.innerHTML = "";
  cities
    .filter((city) => city.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((city) => {
      const cityItem = document.createElement("div");
      cityItem.classList.add("search-modal__city");
      cityItem.innerHTML = `<div class="search-modal__city_name">${city.name}</div>
                  <div class="search-modal__city_code">${city.code}</div>`;
      cityItem.onclick = () => {
        currentInput.value = city.name;
      };
      cityList.appendChild(cityItem);
    });
  cityModal.appendChild(cityHeader);
  cityModal.appendChild(cityList);
}

function closeCityModal() {
  cityModal.style.display = "none";
}

fromInput.addEventListener("input", () => updateCityList(fromInput.value));
fromInput.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Backspace" || key === "Delete") {
    fromInput.value = "";
  }
});
toInput.addEventListener("input", () => updateCityList(toInput.value));
toInput.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Backspace" || key === "Delete") {
    toInput.value = "";
  }
});

const calendarElem = document.querySelector(".search__input_calendar");
const dateModal = document.querySelector(".search-modal__date");
let dateModalVisible = false;

function openDateModal() {
  if (!dateModalVisible) {
    dateModalVisible = true;
    dateModal.style.display = "block";
  }
}

function closeDateModal() {
  if (dateModalVisible) {
    dateModalVisible = false;
    dateModal.style.display = "none";
  }
}

document.addEventListener("click", (event) => {
  if (dateModal.contains(event.target) || calendarElem.contains(event.target)) {
    openDateModal();
  } else {
    closeDateModal();
  }

  if (fromCityElem.contains(event.target)) {
    currentInput = fromInput;
    openCityModal();
  } else if (toCityElem.contains(event.target)) {
    currentInput = toInput;
    openCityModal();
  } else {
    closeCityModal();
    currentInput = null;
  }

  if (passElem.contains(event.target) || passModal.contains(event.target)) {
    openPassModal();
  } else {
    closePassModal();
  }
});

const months = [
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
  "December",
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getById(id) {
  return document.getElementById(id);
}

let date = new Date();
let currMonth = date.getMonth();
let currYear = date.getFullYear();
let currDay = date.getDay();
const calendar = getById("days");

function showCurrMonth() {
  showMonth(currYear, currMonth);
}

function showMonth(year, month) {
  getById("month").textContent = `${months[month]}  ${year}`;

  let firstDayOfMonth = new Date(year, month, 7).getDay();
  let lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  let lastDayOfPrevMonth = new Date(year, month, 0).getDate();

  for (let i = 1; i <= lastDayOfMonth; i++) {
    if (i === 1) {
      let prevMonthDay = lastDayOfPrevMonth - firstDayOfMonth + 1;
      for (let j = 0; j < firstDayOfMonth; j++) {
        let day = document.createElement("div");
        day.textContent = prevMonthDay;
        day.classList.add("day", "inactive");
        calendar.append(day);
        prevMonthDay++;
      }
    }

    let day = document.createElement("div");
    day.textContent = i;
    day.classList.add("day");
    day.addEventListener("click", () => {
      selectDay(day);
    });
    allDays.push(day);
    calendar.append(day);

    if (i === lastDayOfMonth) {
      let remainDays = new Date(year, month, i).getDay();
      let counter = 1;
      for (remainDays; remainDays < 7; remainDays++) {
        let day = document.createElement("div");
        day.textContent = counter;
        day.classList.add("day", "inactive");
        calendar.append(day);
        counter++;
      }
    }
  }
}

let counter = 0;
let allDays = [];
let clickedDays = [];
let betweenDays = [];
const dateDep = document.getElementById("departure");
const dateRet = document.getElementById("return");
function selectDay(day) {
  if (counter > 1) {
    counter = 0;
    clickedDays.forEach((item) => {
      item.style.backgroundColor = "inherit";
      item.style.color = "inherit";
    });
    clickedDays = [];
    betweenDays.forEach((item) => {
      item.style.backgroundColor = "inherit";
      item.style.color = "inherit";
    });
    betweenDays = [];
  }
  if (clickedDays.length && +day.textContent < clickedDays[0].textContent) {
    return;
  }
  clickedDays.push(day);
  if (counter === 1) {
    let first = allDays.indexOf(clickedDays[0]);
    let last = allDays.indexOf(clickedDays[1]);
    betweenDays = allDays.slice(first + 1, last);
    betweenDays.forEach((item) => (item.style.backgroundColor = "#ffe8ed"));
  }
  day.style.backgroundColor = "#ff4d4d";
  day.style.color = "white";
  day.style.borderRadius = "5px";
  switch (counter) {
    case 0: {
      dateDep.value = `${clickedDays[counter].textContent.padStart(2, "0")}.${(
        currMonth + 1
      )
        .toString()
        .padStart(2, "0")}.${currYear}`;
      break;
    }
    case 1: {
      dateRet.value = `${clickedDays[counter].textContent.padStart(2, "0")}.${(
        currMonth + 1
      )
        .toString()
        .padStart(2, "0")}.${currYear}`;
      break;
    }
  }
  counter++;
}

function createCalendar() {
  getById("prev").addEventListener("click", prevMonth);
  getById("next").addEventListener("click", nextMonth);
  let title = getById("daysTitle");
  daysOfWeek.forEach((item) => {
    let day = document.createElement("div");
    day.textContent = item;
    day.classList.add("day-title");
    title.append(day);
  });
  showCurrMonth();
}

function prevMonth() {
  if (currMonth === 0) {
    currMonth = 11;
    currYear -= 1;
  } else {
    currMonth -= 1;
  }
  clearCalendar();
  showCurrMonth();
}

function nextMonth() {
  if (currMonth === 11) {
    currMonth = 0;
    currYear += 1;
  } else {
    currMonth += 1;
  }
  clearCalendar();
  showCurrMonth();
}

function clearCalendar() {
  getById("days").innerHTML = "";
}

createCalendar();

const passElem = document.querySelector(".search__input_pass-class");
const passModal = document.querySelector(".search-modal__pass-class");
passModal.innerHTML = `<span>Maximum 9 Passengers</span>
                <div class="search-modal__pass">
                  <div class="search-modal__pass_descr">
                    <h4>Adults</h4>
                    <span>over 12 years old</span>
                  </div>
                  <div class="counter__wrapper">
                    <button class="counter__control" data-action="minus">-</button>
                    <div class="counter__current" id="adults" data-counter>0</div>
                    <button class="counter__control" data-action="plus">+</button>
                  </div>
                </div>
                <div class="search-modal__pass">
                  <div class="search-modal__pass_descr">
                    <h4>Children</h4>
                    <span>2-12 years old</span>
                  </div>
                  <div class="counter__wrapper">
                    <button class="counter__control" data-action="minus">-</button>
                    <div class="counter__current" id="children" data-counter>0</div>
                    <button class="counter__control" data-action="plus">+</button>
                  </div>
                </div>
                <div class="search-modal__pass">
                  <div class="search-modal__pass_descr">
                    <h4>Infants</h4>
                    <span>under 2 years old</span>
                  </div>
                  <div class="counter__wrapper">
                    <button class="counter__control" data-action="minus">-</button>
                    <div class="counter__current" id="infants" data-counter>0</div>
                    <button class="counter__control" data-action="plus">+</button>
                  </div>
                </div>
                <div class="search-modal__divider"></div>
                <h4 class="search-modal__class_header">Class</h4>
                <div class="search-modal__classes">
                  <button class="search-modal__class_btn">Economy</button>
                  <button class="search-modal__class_btn">First</button>
                  <button class="search-modal__class_btn">Business</button>
                </div>`;

const passInfo = {
  passengers: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  class: "",
};

function updatePassInfo() {
  const passClass = document.querySelectorAll(".search-modal__class_btn");
  passClass.forEach((button) => {
    button.addEventListener("click", () => {
      passClass.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      if (button.classList.contains("active")) {
        passInfo.class = button.innerText;
        updatePassInput();
      }
    });
  });
}

updatePassInfo();

function updatePassInput() {
  const passInput = document.getElementById("pass-class");
  let passCount =
    passInfo.passengers.adults +
    passInfo.passengers.children +
    passInfo.passengers.infants;

  if (passCount === 0) {
    passInput.value = "";
  } else if (passCount === 1) {
    passInput.value = `${passCount} passenger, ${passInfo.class}`;
  } else if (passCount > 1) {
    passInput.value = `${passCount} passengers, ${passInfo.class}`;
  }
}

document.addEventListener("click", (e) => {
  let counter;

  if (
    e.target.dataset.action === "plus" ||
    e.target.dataset.action === "minus"
  ) {
    const counterWrapper = e.target.closest(".counter__wrapper");
    counter = counterWrapper.querySelector("[data-counter]");
  }
  if (e.target.dataset.action === "plus") {
    if (
      passInfo.passengers.adults +
        passInfo.passengers.children +
        passInfo.passengers.infants <
      9
    ) {
      counter.innerText = ++counter.innerText;
      passInfo.passengers[counter.id] = +counter.innerText;
      updatePassInput();
    }
  }
  if (e.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 0) {
      counter.innerText = --counter.innerText;
      passInfo.passengers[counter.id] = +counter.innerText;
      updatePassInput();
    }
  }
});
function openPassModal() {
  passModal.style.display = "block";
}
function closePassModal() {
  passModal.style.display = "none";
}
class PopularDestination {
  constructor(from, to, price) {
    this.from = from;
    this.to = to;
    this.price = price;
  }
}

const popularDestinations = [
  new PopularDestination("Warsaw", "Milan", 75),
  new PopularDestination("Warsaw", "London", 98),
  new PopularDestination("Warsaw", "Alicante", 139),
  new PopularDestination("Warsaw", "Madrid", 161),
  new PopularDestination("Warsaw", "Barcelona", 163),
  new PopularDestination("Warsaw", "Amsterdam", 319),
  new PopularDestination("Warsaw", "Lisbon", 330),
  new PopularDestination("Warsaw", "Paris", 400),
  new PopularDestination("Warsaw", "New York", 2089),
  new PopularDestination("Warsaw", "Denpasar-Bali", 2511),
];

function getPopularDestination() {
  const popularDestinationDiv = document.querySelector(
    ".rcmd__box_wrapper_dest"
  );

  for (let i = 0; i < popularDestinations.length / 2; i++) {
    let firstItem = popularDestinations[i];
    let secondItem = popularDestinations[i + popularDestinations.length / 2];

    let listItem = document.createElement("div");
    listItem.classList.add("rcmd__items_dest");
    listItem.innerHTML = `
        <div class="rcmd__item rcmd__item_dest">
                <div class="rcmd__item_name">${firstItem.from} → ${firstItem.to}</div>
                <div class="rcmd__item_price">from ${firstItem.price} PLN</div>
              </div>
              <div class="rcmd__item rcmd__item_dest">
                <div class="rcmd__item_name">${secondItem.from} → ${secondItem.to}</div>
                <div class="rcmd__item_price">from ${secondItem.price} PLN</div>
              </div>`;
    popularDestinationDiv.append(listItem);
  }
}

getPopularDestination();

class TopAirline {
  constructor(name, rate) {
    this.name = name;
    this.rate = rate;
  }
}

const topAirlines = [
  new TopAirline("Emirates", 4.7),
  new TopAirline("Qatar Airways", 4.7),
  new TopAirline("Turkish Airlines", 4.7),
  new TopAirline("Singapore Airlines", 4.7),
  new TopAirline("Korean Air", 4.7),
  new TopAirline("Etihad Airways", 4.6),
  new TopAirline("Cathay Pacific", 4.5),
  new TopAirline("Air Astana", 4.5),
  new TopAirline("Virgin Atlantic Airways", 4.5),
  new TopAirline("Air New Zealand", 4.5),
];

function getTopAirlines() {
  const topAirlinesElem = document.querySelector(".rcmd__box_wrapper_comp");

  topAirlines.forEach((item) => {
    let listItem = document.createElement("div");
    listItem.classList.add("rcmd__item");
    listItem.classList.add("rcmd__item_comp");
    listItem.innerHTML = `<a href="#" class="rcmd__item_name">${item.name}</a>
              <div class="rcmd__item_rate">${item.rate}</div>`;
    topAirlinesElem.append(listItem);
  });
}

getTopAirlines();
