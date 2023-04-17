"use strict"

const inputValid = document.querySelector(".inputValid") // inputValid
const btnSearch = document.querySelector(".btnSearch") // кнопка пошуку міста
const block__title = document.querySelector(".block__title") 
const title__city = document.querySelector(".title__city") // h1 
const tr__title = document.querySelector(".tr__title") // години погоди
const inputCity = document.getElementById("inputCity") // input search
const timeSpan = document.querySelector(".timeSpan") // span для дати

const table_list = document.querySelector(".table_list")
const table__title = document.querySelector(".table__title")
const tr__icon = document.querySelector(".tr__icon")
const temp = document.querySelector(".temp")
const temp__min = document.querySelector(".temp__min")
const temp__max = document.querySelector(".temp__max")
const feels__like = document.querySelector(".feels__like")
const humidity = document.querySelector(".humidity")
const gust__wind = document.querySelector(".gust__wind")
const speed__wind  = document.querySelector(".speed__wind")
const pressure = document.querySelector(".pressure")

const block__card = document.querySelector(".block__card-day") // блок погоди на 6 днів

let data = {};

formCity.addEventListener("submit", (event) => {
    event.preventDefault()
    const city = document.querySelector(".inputCity").value
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ua&appid=97322412d46e9614fc951685c9beceff`
    fetchWeather(url)
})

async function fetchWeather(url){
    const res = await fetch(url);
    inputValid.style.display = "none";
    if (res.status === 404) { // валідатор помилки 404
        console.log('помилка');
        inputValid.style.display = "block"
        table_list.style.display = "none"
    } 
    if (res.status === 200) { // валідатор помилки 404
        console.log('Good');
        table_list.style.display = "block"
    } 

    inputCity.value = "" // очищуємо пошук міста
    console.log(res);
    data = await res.json();
    console.log('data: ', data);
    
    startList(); // запускаємо функцію яка виводить заговолок
    startTime(); // запускаємо функцію яка виводить годинник
}

function startTime() {
  setInterval(() => {
    const currDate = new Date();
    const hours = currDate.getHours().toString().padStart(2, '0');
    const minutes = currDate.getMinutes().toString().padStart(2, '0');
    const seconds = currDate.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    timeSpan.textContent = timeString;
  }, 1000);
}

function startList() {
    let cityList = {};
    cityList = data["list"];
    console.log('Місто: ', cityList);
    const dataCity1 = cityList[0];
    console.log('dataCity1: ', dataCity1["dt_txt"]);
    console.log('dataCity1: ', dataCity1);
    console.log(dataCity1.weather[0]);
    console.log(dataCity1.weather[0]["description"]);
    // console.clear();

    // for (let i = 0; i < cityList.length; i++) {
    //     let dt_txt = cityList[i].dt_txt;
    //     let date = new Date(dt_txt);
    //     let hour = date.getHours();
    //     if (hour === 0) {

    //         console.log(date.getDay()); // 
    //     }
    // }
    block__card.innerHTML = '';
    let counterDay = 0; // рахує скільки разів запускався цикл з днями та потім додає +1 до нового блоку. day__${counterDay}
    for (let i = 0; i < cityList.length; i++) {
        block__card.style.display = "flex";

        let dt_txt = cityList[i].dt_txt;
        let date = new Date(dt_txt);
        let hour = date.getHours();
        
        
        if (hour === 0 || cityList[i] === cityList[0]) {
            let dayOfWeek = date.toLocaleDateString('ua', { weekday: 'long' });
            let dayNumber = date.toLocaleDateString('ua', {day: 'numeric'});
            let monthNumber = date.toLocaleDateString('ua', {month: 'long'});
            let result = cityList[i];
            console.log(result);
            
            console.log("counterDay", counterDay);
            counterDay++;
            for (let j = 0; j < 1; j++) {  
            console.log(result);
            block__card.insertAdjacentHTML("beforeend", 
                `
                <div class="day__${counterDay}">
                <p class="week__day">${dayOfWeek}</p>
                <p class="number__day">${dayNumber}</p>
                <p class="month">${monthNumber}</p>
                <img src='http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png' title="${result.weather[0].description}" alt="icon">
                <div class="block__temp">
                    <div class="block__temp-min">
                    <span>мін</span>
                    <span>${Math.round(result.main["temp_min"])}°</span>
                    </div>
                    <div class="block__temp-max">
                    <span>макс</span>
                    <span>${Math.round(result.main["temp_max"])}°</span>
                    </div>
                </div>
                </div>
                `
            );
            
            }

        }
    }

    // const cardDays = document.querySelectorAll("[class^='day__']");
    // // const cardDayOne = document.querySelector(".day__1")
    // // const cardDayTwo = document.querySelector(".day__2")
    // // const cardDayThree = document.querySelector(".day__3")
    // // const cardDayFour = document.querySelector(".day__4")
    // // const cardDayFive = document.querySelector(".day__5")
    // // const cardDaySix = document.querySelector(".day__6")

    // block__card.addEventListener("click", (event) => {
    //     event.preventDefault()
    //     if (cardDays[0]) {
    //         cardDays[0].style.background = "green"
    //     }
    // })
    const cardDays = document.querySelectorAll("[class^='day__']");
    let lastClicked = null;

    block__card.addEventListener("click", (event) => {
        event.preventDefault();
        const clicked = event.target.closest("[class^='day__']");
        if (clicked) {
            if (lastClicked) {
                lastClicked.style.background = "";
                lastClicked.style.transform = ""
            }
            lastClicked = clicked;
            lastClicked.style.background = "#CFE2F0";
            lastClicked.style.transform = "scale(1.05)"
        }
    });

    title__city.innerHTML = `<span>${data.city["name"]}</span> <span>${dataCity1.weather[0]["description"]}</span> <img src='http://openweathermap.org/img/wn/${dataCity1.weather[0].icon}@2x.png' alt="">`
    tableStart(); // запускаємо функцію яка заповнює таблицю
}



function tableStart() { // функція яка вставляє години погоди

    const tdList = document.querySelectorAll('td'); // отримати список всіх тегів <td>
    for (let i = 4; i < tdList.length; i++) {
        tdList[i].remove(); // видалити поточний тег <td>, очищує таблицю коли вводимо нове місто
    }

    for (let i = 0; i < 8; i++) {
        const dateTimeString = data["list"][i]["dt_txt"];
        console.log(data["list"][i]["dt_txt"]);
        const date = new Date(dateTimeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const result = `${hours}:${minutes}`; // виведе "06 30"
        
        tr__title.insertAdjacentHTML("beforeend", 
        `
        <td>${result}</td>
        `
        )
    } // цикл для часу погоди

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        console.log(city);
        const result = city.weather[0].icon;
        const description = city.weather[0].description;
        console.log(result);
        tr__icon.insertAdjacentHTML("beforeend", 
        `
        <td><img src='http://openweathermap.org/img/wn/${result}@2x.png' alt="result" title="${description}"></td>
        `
        )
        // цикл для icon
    } 

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = Math.round(city.main["temp"]);
        temp.insertAdjacentHTML("beforeend", 
        `
        <td>${result} °C</td>
        `
        )
        // цикл для температури 
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = Math.round(city.main["temp_min"]);
        temp__min.insertAdjacentHTML("beforeend", 
        `
        <td>${result} °C</td>
        `
        )
        // цикл МІН температури
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = Math.round(city.main["temp_max"]);
        temp__max.insertAdjacentHTML("beforeend", 
        `
        <td>${result} °C</td>
        `
        )
        // цикл МАКС температури
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = Math.round(city.main["feels_like"]);
        feels__like.insertAdjacentHTML("beforeend", 
        `
        <td>${result} °C</td>
        `
        )
        // цикл для відчуття температури
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = city.main["humidity"];
        humidity.insertAdjacentHTML("beforeend", 
        `
        <td>${result} %</td>
        `
        )
        // цикл для вологості
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = Math.round(city.wind["gust"]);
        gust__wind.insertAdjacentHTML("beforeend", 
        `
        <td>${result} м/сек</td>
        `
        )
        // цикл для пориву вітру
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = Math.round(city.wind["speed"]);
        speed__wind.insertAdjacentHTML("beforeend", 
        `
        <td>${result} м/сек</td>
        `
        )
        // цикл для швидкість повітря
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = city.main["pressure"];
        pressure.insertAdjacentHTML("beforeend", 
        `
        <td>${result} Па</td>
        `
        )
        // цикл для тиску повітря
    }

}