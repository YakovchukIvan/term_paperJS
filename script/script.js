"use strict"

const inputValid = document.querySelector(".inputValid") // inputValid
const btnSearch = document.querySelector(".btnSearch") // кнопка пошуку міста
const list__city = document.querySelector(".list__city") // список погоди
const title__city = document.querySelector(".title__city") // h1 
const tr__title = document.querySelector(".tr__title") // години погоди

const table__title = document.querySelector(".table__title")
const temp = document.querySelector(".temp")
const temp__min = document.querySelector(".temp__min")
const temp__max = document.querySelector(".temp__max")
const feels__like = document.querySelector(".feels__like")
const humidity = document.querySelector(".humidity")
const gust__wind = document.querySelector(".gust__wind")
const speed__wind  = document.querySelector(".speed__wind")
const pressure = document.querySelector(".pressure")




let data = {}
// let cityUkraine = {}

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
        inputValid.style.display = "block";
    }
    
    console.log(res);
    data = await res.json();
    console.log('data: ', data);

    startList();
}

function startList() {




    const cityList = data["list"];
    console.log('rivne: ', cityList);
    const dataCity1 = cityList[0];
    console.log('dataCity1: ', dataCity1["dt_txt"]);
    console.log('dataCity1: ', dataCity1);
    console.log(dataCity1.weather[0]);
    console.log(dataCity1.weather[0]["description"]);
    list__city.innerHTML = "" // очищуємо список коли вводимо місто ще раз
    title__city.innerHTML = `<span>${data.city["name"]}</span> <span>${dataCity1.weather[0]["description"]}</span> <img src='http://openweathermap.org/img/wn/${dataCity1.weather[0].icon}@2x.png' alt="">`
    // console.clear();

    tableHours(); // запускаємо функцію яка вставляє години погоди

    list__city.insertAdjacentHTML("beforeend", 
    `
    <li><span>Місто</span> ${data.city["name"]}</li>
    <li><span>Погода : </span> ${dataCity1.weather[0]["description"]} <img src='http://openweathermap.org/img/wn/${dataCity1.weather[0].icon}@2x.png' alt=""></li>
    <li><span>Дата погоди: </span> ${dataCity1["dt_txt"]}</li>
    <li><span>Вологість : </span> ${dataCity1.main["humidity"]} % </li>
    <li><span>Відчувається як : </span> ${dataCity1.main["feels_like"]} °C </li>
    <li><span>Максимальна температура повітря : </span> ${dataCity1.main["temp"]} °C </li>
    <li><span>Мінімальна температура повітря : </span> ${dataCity1.main["temp_min"]} °C </li>
    <li><span>Тиск в повітрі : </span> ${dataCity1.main["pressure"]} Па</li>
    <li><span>Тиск на рівня моря : </span> ${dataCity1.main["sea_level"]} мм рт. </li>
    <li><span>Порив вітру : </span> ${dataCity1.wind["gust"]} км </li>
    <li><span>Швидкість вітру : </span> ${dataCity1.wind["speed"]} км </li>
    
    `
    )
}

function tableHours() { // функція яка вставляє години погоди
    
const tdList = document.querySelectorAll('td'); // отримати список всіх тегів <td>
for (let i = 4; i < tdList.length; i++) {
    tdList[i].remove(); // видалити поточний тег <td>
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
        const result = city.main["temp"];
        temp.insertAdjacentHTML("beforeend", 
        `
        <td>${result} °C</td>
        `
        )
        // цикл для температури 
    } 

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = city.main["temp_min"];
        temp__min.insertAdjacentHTML("beforeend", 
        `
        <td>${result} °C</td>
        `
        )
        // цикл МІН температури
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = city.main["temp_max"];
        temp__max.insertAdjacentHTML("beforeend", 
        `
        <td>${result} °C</td>
        `
        )
        // цикл МАКС температури
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = city.main["feels_like"];
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
        const result = city.wind["gust"];
        gust__wind.insertAdjacentHTML("beforeend", 
        `
        <td>${result} м/сек</td>
        `
        )
        // цикл для пориву вітру
    }

    for (let i = 0; i < 8; i++) {
        const city = data["list"][i];
        const result = city.wind["speed"];
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
