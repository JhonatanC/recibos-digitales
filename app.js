let body = document.getElementById("body");
let page = document.getElementById("page");
const form = document.getElementById("form");
const container = document.querySelector(".container");
let btnGenerate = document.getElementById("btn_generate");
let btnDone = document.getElementById("btn_done");

const setNumRecibo = document.querySelector("#setNumRecibo");
const setTipoArriendo = document.querySelector("#setTipoArriendo");
const setFecha = document.querySelector("#setFecha");
const setRecibi = document.querySelector("#setRecibi");
const setPago = document.querySelector("#setPago");

const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
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
  // console.log(`${diaSemana} ${dia} de ${mes} del ${año}`);
  return `${diaSemana} ${dia} de ${mes} del ${año}`;
};

const beforeDate = () => {};

const afterDate = () => {};

const validateFields = () => {
  const formData = new FormData(form, btnGenerate);
  let erros = [];
  // let data = {};
  for (const [key, value] of formData) {
    if (!value.trim()) {
      let field = document.querySelector(`.${key}`);
      field.classList.add("field-required");
      erros.push(key);
    } else {
      let field = document.querySelector(`.${key}`);
      field.classList.remove("field-required");
      // data = { [key]: key };
    }

    // if (key == "fecha") formatearFecha(new Date());
    // console.log(`${key}: ${value}\n`);
  }

  // console.log(data);

  return {
    ok: erros.length == 0 && true,
    formData,
  };
};

const generatePDF = () => {
  html2PDF(body, {
    jsPDF: {
      format: "a4",
    },
    imageType: "image/jpeg",
    output: `./pdf/${formatearFecha(new Date()).trim()}.pdf`,
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = validateFields();
  if (!result.ok) return;
  container.style.display = "none";
  page.style.display = "block";

  setNumRecibo.textContent = result.formData.get("num_recibo");
  setTipoArriendo.textContent = result.formData.get("type_ticket");
  setFecha.textContent = result.formData.get("fecha");
  setRecibi.textContent = result.formData.get("persona");
  setPago.textContent = result.formData.get("type_payment");
});

btnDone.addEventListener("click", (e) => {
  btnDone.style.display = "none";
  setTimeout(() => {
    generatePDF();
  }, 1000);
});
