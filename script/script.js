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
let cityList = {};


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
    // console.log(res);
    data = await res.json();
    // console.log('data: ', data);
    
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
    cityList = data["list"];
    console.log('Місто: ', cityList);
    const dataCity1 = cityList[0];
    // console.log('dataCity1: ', dataCity1["dt_txt"]);
    // console.log('dataCity1: ', dataCity1);
    // console.log(dataCity1.weather[0]);
    // console.log(dataCity1.weather[0]["description"]);

    block__card.innerHTML = ''; // коли функція ще раз спрацьовує чищимо блок з прогнозом на пару днів
    let counterDay = 0; // рахує скільки разів запускався цикл з днями та потім додає +1 до нового блоку. day__${counterDay}
    
    let dayOneBlock = [];
    let dayTwoBlock = [];
    let dayThreeBlock = [];
    let dayFourBlock = [];
    let dayFiveBlock = [];
    let daySixBlock = [];


    let dayBlocks = [
        dayOneBlock,
        dayTwoBlock,
        dayThreeBlock,
        dayFourBlock,
        dayFiveBlock,
        daySixBlock
    ];

    console.log(dayBlocks);

    for (let i = 0; i < cityList.length; i++) {

        let dt_txt = data["list"][i].dt_txt;
        let date = new Date(dt_txt);
        // console.clear()
        // console.log("date", date);
        
        const currDate = new Date();
        let dayOfMonth = currDate.getDate(); // сьогоднішній день
        // console.log("dayOfMonth", dayOfMonth);


        let currentDayOfMonth = date.getDate();
        // console.log("currentDayOfMonth", currentDayOfMonth); // дні в масиві cityList

        if (dayOfMonth === currentDayOfMonth) {
            // Додаємо об'єкт до об'єкта dayOneBlock за допомогою його дати як ключа
            dayOneBlock[date] = data["list"][i];
        }
        if ((dayOfMonth + 1) === currentDayOfMonth) {
            dayTwoBlock[date] = data["list"][i];
            console.log("день другий", data["list"][i]);
            console.log();
        }
        if ((dayOfMonth + 2) === currentDayOfMonth) {
            dayThreeBlock[date] = data["list"][i];
        }
        if ((dayOfMonth + 3) === currentDayOfMonth) {
            dayFourBlock[date] = data["list"][i];
        }
        if ((dayOfMonth + 4) === currentDayOfMonth) {
            dayFiveBlock[date] = data["list"][i];
        }
        if ((dayOfMonth + 5) === currentDayOfMonth) {
            daySixBlock[date] = data["list"][i];
        }

    }

    // console.log("dayOneBlock", Object.keys(dayOneBlock).length);
    // console.log("dayTwoBlock", Object.keys(dayTwoBlock).length);
    console.log("dayTwoBlock", dayTwoBlock);    
    // console.log("dayThreeBlock", Object.keys(dayThreeBlock).length);
    // console.log("dayFourBlock", Object.keys(dayFourBlock).length);
    // console.log("dayFiveBlock", Object.keys(dayFiveBlock).length);
    // console.log("daySixBlock", Object.keys(daySixBlock).length);


    for (let i = 0; i < cityList.length; i++) {
        block__card.style.display = "flex";

        let dt_txt = cityList[i].dt_txt;
        let date = new Date(dt_txt);
        // console.clear()
        // console.log("date", date);
        let hour = date.getHours();
        
        const currDate = new Date();
        const dayOfMonth = currDate.getDate();
        // console.log("dayOfMonth", dayOfMonth);


        let currentDayOfMonth = date.getDate();
        // console.log("currentDayOfMonth", currentDayOfMonth);



        if (hour === 0 || cityList[i] === cityList[0]) {
            let dayOfWeek = date.toLocaleDateString('ua', { weekday: 'long' });
            let dayNumber = date.toLocaleDateString('ua', {day: 'numeric'});
            let monthNumber = date.toLocaleDateString('ua', {month: 'long'});
            let result = cityList[i];
            // console.log(result);
            
            // console.log("counterDay", counterDay);
            counterDay++;
            for (let j = 0; j < 1; j++) {  
            // console.log(result);
            block__card.insertAdjacentHTML("beforeend", // додаємо прогноз погоди на пару днів
                `
                <div class="day__${counterDay}">
                <p class="week__day">${dayOfWeek}</p>
                <p class="number__day">${dayNumber}</p>
                <p class="month">${monthNumber}</p>
                <img src='http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png' title="${result.weather[0].description}" alt="icon">
                <div class="block__temp">
                    <div class="block__temp-min">
                    <span>мін.</span>
                    <span>${Math.round(result.main["temp_min"])}°</span>
                    </div>
                    <div class="block__temp-max">
                    <span>макс.</span>
                    <span>${Math.round(result.main["temp_max"])}°</span>
                    </div>
                </div>
                </div>
                `
            );
            
            }

        }


        if (dayOfMonth === currentDayOfMonth) {
            document.querySelector('.day__1').style.background = "#CFE2F0";
            document.querySelector('.day__1').style.transform = "scale(1.05)";
            let start = 0;
            let end = Object.keys(dayBlocks[0]).length;
            tableStart(start, end);
        }

    }

    let lastClicked = null;

    block__card.addEventListener("click", (event) => {
        event.preventDefault();
        const clicked = event.target.closest("[class^='day__']");


        if (clicked) {
                document.querySelector('.day__1').style.background = "";
                document.querySelector('.day__1').style.transform = ""
            if (lastClicked) {
                lastClicked.style.background = "";
                lastClicked.style.transform = ""
            }
            lastClicked = clicked;
            lastClicked.style.background = "#CFE2F0";
            lastClicked.style.transform = "scale(1.05)"
            if (lastClicked.classList.contains('day__1')) {
                console.log("Good1");
                // let start = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[0]).length;
                // let end = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[0]).length;
                let start = 0;
                let end = Object.keys(dayBlocks[0]).length;
                console.log(dayBlocks[0]);
                console.log(start, end);
                tableStart(start, end);
            }
            if (lastClicked.classList.contains('day__2')) {
                console.log("Good2");
                let start = Object.keys(dayBlocks[0]).length;
                let end = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length;
                console.log(dayBlocks[1]);
                console.log(start, end);
                tableStart(start, end);
            }
            if (lastClicked.classList.contains('day__3')) {
                console.log("Good3");
                let start = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length;
                let end = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length + Object.keys(dayBlocks[2]).length;
                console.log(dayBlocks[2]);
                console.log(start, end);
                tableStart(start, end);
            }
            if (lastClicked.classList.contains('day__4')) {
                let start = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length + Object.keys(dayBlocks[2]).length;
                let end = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length + Object.keys(dayBlocks[2]).length + Object.keys(dayBlocks[3]).length;
                console.log(dayBlocks[3]);
                console.log(start, end);
                tableStart(start, end);
            }
            if (lastClicked.classList.contains('day__5')) {
                let start = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length + Object.keys(dayBlocks[2]).length + Object.keys(dayBlocks[3]).length;
                let end = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length + Object.keys(dayBlocks[2]).length + Object.keys(dayBlocks[3]).length + Object.keys(dayBlocks[4]).length;
                console.log(dayBlocks[4]);
                console.log(start, end);
                tableStart(start, end);
            }
            if (lastClicked.classList.contains('day__6')) {
                let start = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length + Object.keys(dayBlocks[2]).length + Object.keys(dayBlocks[3]).length + Object.keys(dayBlocks[4]).length;
                let end = Object.keys(dayBlocks[0]).length + Object.keys(dayBlocks[1]).length + Object.keys(dayBlocks[2]).length + Object.keys(dayBlocks[3]).length + Object.keys(dayBlocks[4]).length + Object.keys(dayBlocks[5]).length;
                console.log(dayBlocks[5]);
                console.log(start, end);
                tableStart(start, end);
            }
            
        }

    });

    title__city.innerHTML = `<span>${data.city["name"]}</span> <span>${dataCity1.weather[0]["description"]}</span> <img src='http://openweathermap.org/img/wn/${dataCity1.weather[0].icon}@2x.png' alt="">`
    // tableStart(); // запускаємо функцію яка заповнює таблицю
}



function tableStart(start, end) { // функція яка вставляє години погоди

    const tdList = document.querySelectorAll('td'); // отримати список всіх тегів <td>
    for (let i = 0; i < tdList.length; i++) {
        tdList[i].remove(); // видалити поточний тег <td>, очищує таблицю коли вводимо нове місто
    }

    console.log(start);
    console.log(end);

    // const startIndex = Object.keys(result).length;
    for (let i = start; i < end; i++) {
            
        const dateTimeString = data["list"][i]["dt_txt"];
        // console.log(data["list"][i]["dt_txt"]);
        const date = new Date(dateTimeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const resultTime = `${hours}:${minutes}`; // виведе "06 30"
        // const resultTime = `${date}`; // виведе всю дату
        // цикл для часу погоди

        const cityIcon = data["list"][i];
        const resultCity = cityIcon.weather[0].icon;
        const description = cityIcon.weather[0].description;
        // цикл для icon

        const cityTemp = data["list"][i];
        const resultTemp = Math.round(cityTemp.main["temp"]);
        // цикл для температури

        const cityTempMin = data["list"][i];
        const resultTempMin = Math.round(cityTempMin.main["temp_min"]);
        // цикл МІН температури

        const cityTempMax = data["list"][i];
        const resultTempMax = Math.round(cityTempMax.main["temp_max"]);
        // цикл МАКС температури

        const cityTempFeels = data["list"][i];
        const resultTempFeels = Math.round(cityTempFeels.main["feels_like"]);
        // цикл для відчуття температури

        const cityHumidity = data["list"][i];
        const resultHumidity = cityHumidity.main["humidity"];
        // цикл для вологості

        const cityGust = data["list"][i];
        const resultGust = Math.round(cityGust.wind["gust"]);
        // цикл для пориву вітру

        const citySpeed = data["list"][i];
        const resultSpeed = Math.round(citySpeed.wind["speed"]);
        // цикл для швидкість повітря

        const cityPressure = data["list"][i];
        const resultPressure = cityPressure.main["pressure"];
        
        // цикл для тиску повітря

        if (start === 0 ) {
            tr__title.insertAdjacentHTML("beforeend", `<td class="title_today">${resultTime}</td>`)
            tr__icon.insertAdjacentHTML("beforeend", `<td class="td_today"><img src='http://openweathermap.org/img/wn/${resultCity}@2x.png' alt="result" title="${description}"></td>`)
            temp.insertAdjacentHTML("beforeend", `<td class="td_today">${resultTemp}°C</td>`)
            feels__like.insertAdjacentHTML("beforeend", `<td class="feels__like_today">${resultTempFeels}°C</td>`)
            temp__min.insertAdjacentHTML("beforeend", `<td class="td_today">${resultTempMin}°C</td>`)
            temp__max.insertAdjacentHTML("beforeend", `<td class="td_today">${resultTempMax}°C</td>`)
            humidity.insertAdjacentHTML("beforeend", `<td class="humidity_today">${resultHumidity}%</td>`)
            gust__wind.insertAdjacentHTML("beforeend", `<td class="td_today">${resultGust}</td>`)
            speed__wind.insertAdjacentHTML("beforeend", `<td class="td_today">${resultSpeed}</td>`)
            pressure.insertAdjacentHTML("beforeend", `<td class="pressure_today">${resultPressure}</td>`)
            start = 1;
        } else {
            tr__title.insertAdjacentHTML("beforeend", `<td>${resultTime}</td>`)
            tr__icon.insertAdjacentHTML("beforeend", `<td><img src='http://openweathermap.org/img/wn/${resultCity}@2x.png' alt="result" title="${description}"></td>`)
            temp.insertAdjacentHTML("beforeend", `<td>${resultTemp}°C</td>`)
            feels__like.insertAdjacentHTML("beforeend", `<td>${resultTempFeels}°C</td>`)
            temp__min.insertAdjacentHTML("beforeend", `<td>${resultTempMin}°C</td>`)
            temp__max.insertAdjacentHTML("beforeend", `<td>${resultTempMax}°C</td>`)
            humidity.insertAdjacentHTML("beforeend", `<td>${resultHumidity}%</td>`)
            gust__wind.insertAdjacentHTML("beforeend", `<td>${resultGust}</td>`)
            speed__wind.insertAdjacentHTML("beforeend", `<td>${resultSpeed}</td>`)
            pressure.insertAdjacentHTML("beforeend", `<td>${resultPressure}</td>`)
        }
        
    }
    console.log(tdList.length);
    

    // перший варіант виведення інформації в таблицю
    // for (let i = 0; i < 8; i++) {
    //     const dateTimeString = data["list"][i]["dt_txt"];
    //     console.log(data["list"][i]["dt_txt"]);
    //     const date = new Date(dateTimeString);
    //     const hours = date.getHours().toString().padStart(2, '0');
    //     const minutes = date.getMinutes().toString().padStart(2, '0');
    //     const result = `${hours}:${minutes}`; // виведе "06 30"
        
    //     tr__title.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result}</td>
    //     `
    //     )
    // } // цикл для часу погоди

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     console.log(city);
    //     const result = city.weather[0].icon;
    //     const description = city.weather[0].description;
    //     console.log(result);
    //     tr__icon.insertAdjacentHTML("beforeend", 
    //     `
    //     <td><img src='http://openweathermap.org/img/wn/${result}@2x.png' alt="result" title="${description}"></td>
    //     `
    //     )
    //     // цикл для icon
    // } 

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = Math.round(city.main["temp"]);
    //     temp.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} °C</td>
    //     `
    //     )
    //     // цикл для температури 
    // }

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = Math.round(city.main["temp_min"]);
    //     temp__min.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} °C</td>
    //     `
    //     )
    //     // цикл МІН температури
    // }

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = Math.round(city.main["temp_max"]);
    //     temp__max.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} °C</td>
    //     `
    //     )
    //     // цикл МАКС температури
    // }

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = Math.round(city.main["feels_like"]);
    //     feels__like.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} °C</td>
    //     `
    //     )
    //     // цикл для відчуття температури
    // }

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = city.main["humidity"];
    //     humidity.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} %</td>
    //     `
    //     )
    //     // цикл для вологості
    // }

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = Math.round(city.wind["gust"]);
    //     gust__wind.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} м/сек</td>
    //     `
    //     )
    //     // цикл для пориву вітру
    // }

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = Math.round(city.wind["speed"]);
    //     speed__wind.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} м/сек</td>
    //     `
    //     )
    //     // цикл для швидкість повітря
    // }

    // for (let i = 0; i < 8; i++) {
    //     const city = data["list"][i];
    //     const result = city.main["pressure"];
    //     pressure.insertAdjacentHTML("beforeend", 
    //     `
    //     <td>${result} Па</td>
    //     `
    //     )
    //     // цикл для тиску повітря
    // }

}

// function tableStart() { // функція яка вставляє години погоди

//     console.log(cityList);

//     const tdList = document.querySelectorAll('td'); // отримати список всіх тегів <td>
//     for (let i = 4; i < tdList.length; i++) {
//         tdList[i].remove(); // видалити поточний тег <td>, очищує таблицю коли вводимо нове місто
//     }

//     const createTableCell = (data, property) => {
//         let result = "";
//         for (let i = 0; i < 8; i++) {
//             result += `<td>${data["list"][i][property]}</td>`;
//         }
//         return result;
//     }

//     const createIconCell = (data) => {
//         let result = "";
//         for (let i = 0; i < 8; i++) {
//             const icon = data["list"][i].weather[0].icon;
//             const description = data["list"][i].weather[0].description;
//             result += `<td><img src='http://openweathermap.org/img/wn/${icon}@2x.png'
//                         alt="${icon}" title="${description}"></td>`;
//         }
//         return result;
//     }

//     const createTemperatureCell = (data, property) => {
//         let result = "";
//         for (let i = 0; i < 8; i++) {
//             const temperature = Math.round(data["list"][i].main[property]);
//             result += `<td>${temperature} °C</td>`;
//         }
//         return result;
//     }

//     tr__title.insertAdjacentHTML("beforeend", createTableCell(data, "dt_txt"));
//     tr__icon.insertAdjacentHTML("beforeend", createIconCell(data));
//     temp.insertAdjacentHTML("beforeend", createTemperatureCell(data, "temp"));
//     temp__min.insertAdjacentHTML("beforeend", createTemperatureCell(data, "temp_min"));
//     temp__max.insertAdjacentHTML("beforeend", createTemperatureCell(data, "temp_max"));
//     feels__like.insertAdjacentHTML("beforeend", createTemperatureCell(data, "feels_like"));
//     humidity.insertAdjacentHTML("beforeend", createTableCell(data, "humidity"));
//     gust__wind.insertAdjacentHTML("beforeend", createTemperatureCell(data, "gust"));
//     speed__wind.insertAdjacentHTML("beforeend", createTemperatureCell(data, "speed"));
//     pressure.insertAdjacentHTML("beforeend", createTableCell(data, "pressure"));
// } скорочений варіант