const input: HTMLInputElement | null = document.querySelector("#input-localizacao");
const form = document.querySelector("#search-form form");
const sectionInfos = document.querySelector("#tempo-info");

const toggleThemeButton = document.querySelector("#toggle-theme > button");

let isDarkTheme: boolean = false;

toggleThemeButton?.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme;
    updateTheme();
    updateButtonColor();
    // Adicione a chamada da função updateTheme aqui
});

function updateTheme() {
    const body = document.querySelector("body");

    if (isDarkTheme) {
        body?.classList.add("dark-theme");
    } else {
        body?.classList.remove("dark-theme");
    }
}
function updateButtonColor() {
    const button = toggleThemeButton as HTMLButtonElement;

    if(isDarkTheme) {
        button.classList.add("dark-button-color");
    }else{
        button.classList.remove("dark-button-color");
    }
} 

form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!input || !sectionInfos) return;

    const localizacao = input.value;

    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos três letras!");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=a46738b18a43a2f10f7c28cf4050dfe5&lang=pt_br&units=metric`
        );

        const data = await response.json();

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
    } catch (error) {
        console.log("Deu um erro na obtenção de dados da API", error);
    }

    
});


