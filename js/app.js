let body = document.getElementById("body");
let page = document.getElementById("page");
const form = document.getElementById("form");
const container = document.querySelector(".container");
let btnGenerate = document.getElementById("btn_generate");
let btnDone = document.getElementById("btn_done");
let btnBack = document.getElementById("btn_back");
const setNumRecibo = document.querySelector("#setNumRecibo");
const setTipoArriendo = document.querySelector("#setTipoArriendo");
const setFecha = document.querySelector("#setFecha");
const setRecibi = document.querySelector("#setRecibi");
const setMonto = document.querySelector("#setMonto");
const setPago = document.querySelector("#setPago");
const setAddress = document.querySelector("#setAddress");
const titleInfo = document.querySelector("#titleInfo");
const textInfo = document.querySelector("#textInfo");
const lifePayment = document.querySelector("#life_payment");
const setCycle = document.querySelector("#setCycle");
const getHost = window.location.host;
const pathName = window.location.pathname;

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const formatearFecha = (fecha) => {
  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  return `${diaSemana} ${dia} de ${mes} del ${año}`;
};

const getOptionsMeses = () => {
  for (let index = 0; index < meses.length; index++) {
    const element = meses[index];
    const nextElement = index + 1 < meses.length ? meses[index + 1] : meses[0];
    const option = document.createElement("option");
    option.value = `${element} - ${nextElement}`;
    // option.name = `${element} - ${nextElement}`;
    option.textContent = `${element} - ${nextElement}`;
    lifePayment.appendChild(option);
  }
};
getOptionsMeses();

const beforeDate = () => {};

const afterDate = () => {};

const validateFields = () => {
  const formData = new FormData(form, btnGenerate);
  let erros = [];
  for (const [key, value] of formData) {
    if (!value.trim()) {
      let field = document.querySelector(`.${key}`);
      field.classList.add("field-required");
      erros.push(key);
    } else {
      let field = document.querySelector(`.${key}`);
      field.classList.remove("field-required");
    }
    // if (key == "fecha") formatearFecha(new Date());
  }

  return {
    ok: erros.length == 0 && true,
    formData,
  };
};

const generatePDF = () => {
  html2PDF(page, {
    jsPDF: {
      format: "a4",
    },
    imageType: "image/jpeg",
    output: `./pdf/${formatearFecha(new Date()).trim()}.pdf`,
  });
  setTimeout(() => {
    pathName
      ? (window.location.href = pathName)
      : (window.location.href = window.location.host || "/");
  }, 1500);
};

btnBack.addEventListener("click", (e) => {
  e.preventDefault();
  pathName
    ? (window.location.href = pathName)
    : (window.location.href = window.location.host || "/");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = validateFields();
  if (!result.ok) return;
  container.style.display = "none";
  page.style.display = "block";

  // console.log(result.formData.get("life_payment"));

  setNumRecibo.textContent = result.formData.get("num_recibo");
  setAddress.textContent = result.formData.get("address");
  setCycle.textContent = result.formData.get("life_payment");
  setTipoArriendo.textContent = result.formData.get("type_ticket");
  setFecha.textContent = result.formData.get("fecha");
  setRecibi.textContent = result.formData.get("persona");
  setMonto.textContent = result.formData.get("amount");
  setPago.textContent = result.formData.get("type_payment");
});

btnDone.addEventListener("click", (e) => {
  btnDone.style.display = "none";
  btnBack.style.display = "none";
  titleInfo.style.display = "none";
  textInfo.style.display = "none";
  setTimeout(() => {
    generatePDF();
  }, 1000);
});
