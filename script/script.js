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


let data = {};
// let cityUkraine = {};

formCity.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const city = document.querySelector(".inputCity").value
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ua&appid=97322412d46e9614fc951685c9beceff`
    
    const urlCity = `https://raw.githubusercontent.com/Adushar/UkraineCitiesAndVillages/main/CitiesAndVillages%20-%2014%20March.json`

    fetchWeather(url)
    
    // ukraine(urlCity)
})
// async function ukraine(urlCity){
//     const res = await fetch(urlCity);
//     console.log(res);
//     cityUkraine = await res.json();
//     console.log('cityUkraine: ', cityUkraine);
// }

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
    const cityList = data["list"];
    console.log('rivne: ', cityList);
    const dataCity1 = cityList[0];
    console.log('dataCity1: ', dataCity1["dt_txt"]);
    console.log('dataCity1: ', dataCity1);
    console.log(dataCity1.weather[0]);
    console.log(dataCity1.weather[0]["description"]);
    // console.clear();

    const startDate = new Date(cityList[0].dt_txt); // дата з першого об'єкту
    const endDate = new Date(startDate.getTime() + 86400000); // дата наступного дня
    console.log(startDate);
    console.log(endDate);

    for (let i = 0; i < cityList.length; i++) {
        const currentDate = new Date(cityList[i].dt_txt);
        console.log(cityList.length);
        if (currentDate >= endDate) {
        console.log("New day starts at: ", endDate);
        endDate.setTime(endDate.getTime() + 86400000); // збільшуємо дату на один день
        }
        // console.log(cityList[i].dt_txt);
    }

    // function startDayBlock() {
    //     let count = 0;
    //     let dateMe = new Date(cityList[count].dt * 1000); // помноження на 1000 для отримання мілісекунд
    //     let day = dateMe.getDate();

    //     for (let i = 0; count < 40; i++) {
    //         dateMe = new Date(cityList[count].dt * 1000); // отримання нової дати з мілісекундами
    //         const currentDay = dateMe.getDate();

    //         if (currentDay !== day) {
    //             day = currentDay;
    //             count++;
    //             console.log(day);
    //         }
            
    //         count++;
    //     }
    // }

    // startDayBlock();


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