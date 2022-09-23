const btn = document.querySelector(".btn");
const cidade = document.querySelector("input");
const resultadoCidade = document.querySelector(".resultadocidade");
const resultadoPais = document.querySelector(".pais");
const resultadoEstado = document.querySelector(".estado");
const resultado = document.querySelector(".resultadotemp");
const tempoinfo = document.querySelector(".info");
const erro = document.querySelector(".erro");
btn.addEventListener("click", () => {
  buscaCidade(cidade.value);
});

function buscaCidade(valorBusca) {
  fetch(
    "http://api.weatherapi.com/v1/current.json?key=7b5691b5de8f41cfa9b203538222109&q=" +
      valorBusca
  )
    .then((response) => response.json())
    .then((data) => {
      if (typeof data.error === "undefined") {
        let cidade = data.location.name;
        let estado = data.location.region;
        let pais = data.location.country;
        let temperatura = data.current.temp_c;
        let tempo = data.current.condition.text;

        resultado.innerText = data.current.temp_c + " ºC";
        resultadoCidade.innerText = data.location.name;
        resultadoEstado.innerText = data.location.region + " -";
        resultadoPais.innerText = data.location.country;
        tempoinfo.innerText = data.current.condition.text;
        erro.classList.remove("ativo");
      } else {
        erro.classList.add("ativo");
      }
    })
    .catch(console.error);
}

function localAtual() {
  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    buscaCidade(lat + "," + long);
  });
}

localAtual();

const formulario = document.querySelector("form");

function evento(event) {
  event.preventDefault();
}
formulario.addEventListener("submit", evento);
