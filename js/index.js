"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.querySelector("#input-localizacao");
const form = document.querySelector("#search-form form");
const sectionInfos = document.querySelector("#tempo-info");
const toggleThemeButton = document.querySelector("#toggle-theme > button");
let isDarkTheme = false;
toggleThemeButton === null || toggleThemeButton === void 0 ? void 0 : toggleThemeButton.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme;
    updateTheme();
    updateButtonColor();
    // Adicione a chamada da função updateTheme aqui
});
function updateTheme() {
    const body = document.querySelector("body");
    if (isDarkTheme) {
        body === null || body === void 0 ? void 0 : body.classList.add("dark-theme");
    }
    else {
        body === null || body === void 0 ? void 0 : body.classList.remove("dark-theme");
    }
}
function updateButtonColor() {
    const button = toggleThemeButton;
    if (isDarkTheme) {
        button.classList.add("dark-button-color");
    }
    else {
        button.classList.remove("dark-button-color");
    }
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionInfos)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos três letras!");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=a46738b18a43a2f10f7c28cf4050dfe5&lang=pt_br&units=metric`);
        const data = yield response.json();
        const infos = {
            temperatura: Math.round(data.main.temp),
            local: data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        sectionInfos.innerHTML = `
      <div class="tempo-dados">
        <h2>${infos.local}</h2>
        <span>${infos.temperatura}°C</span>
      </div>
      <img src="${infos.icon}" />
    `;
    }
    catch (error) {
        console.log("Deu um erro na obtenção de dados da API", error);
    }
}));
