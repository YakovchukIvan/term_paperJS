"use strict"

const btnSearch = document.querySelector(".btnSearch")
const list__city = document.querySelector(".list__city")
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
    list__city.innerHTML = ""
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
