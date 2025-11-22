// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE 
// // TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");


// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnCrearElemento"); // <- corregido
const buttonValidarForm = document.getElementById("idBtnValidarForm");  // <- nuevo


// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// los helpers
function buildIdFromName(name) {
  return `id${name.trim()}`;
}

function idDisponible(oId) {
  return !document.getElementById(oId);
}

function alertar(msg) {
  window.alert(msg);
}

function limpiarModal() {
  tituloElemento.value = "";
  nombreElemento.value = "";
  tituloElemento.focus();
}

// AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
  const elemento = cmbElemento.value;
  if (elemento !== "") {
    modal.show();
  } else {
    alertar("Debe seleccionar el elemento que se creará");
  }
};


const newSelect = function () {
  const idNuevo = buildIdFromName(nombreElemento.value);
  if (!idDisponible(idNuevo)) {
    alertar(`El ID "${idNuevo}" ya existe. No se permiten IDs repetidos.`);
    return;
  }

  const addElemento = document.createElement("select");
  addElemento.setAttribute("id", idNuevo);
  addElemento.setAttribute("class", "form-select");

  for (let i = 1; i <= 10; i++) {
    const addOption = document.createElement("option");
    addOption.value = i;
    addOption.innerHTML = `Opción ${i}`;
    addElemento.appendChild(addOption);
  }

  const labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", idNuevo);
  labelElemento.textContent = tituloElemento.value;

  const labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  const divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-floating");

  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
  const idNuevo = buildIdFromName(nombreElemento.value);
  if (!idDisponible(idNuevo)) {
    alertar(`El ID "${idNuevo}" ya existe. No se permiten IDs repetidos.`);
    return;
  }

  const addElemento = document.createElement("input");
  addElemento.setAttribute("id", idNuevo);
  addElemento.setAttribute("type", newElemento); // 'radio' | 'checkbox'
  addElemento.setAttribute("class", "form-check-input");

  const labelElemento = document.createElement("label");
  labelElemento.setAttribute("class", "form-check-label");
  labelElemento.setAttribute("for", idNuevo);
  labelElemento.textContent = tituloElemento.value;

  const labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  const divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-check");

  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);

  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
  const idNuevo = buildIdFromName(nombreElemento.value);
  if (!idDisponible(idNuevo)) {
    alertar(`El ID "${idNuevo}" ya existe. No se permiten IDs repetidos.`);
    return;
  }

  // textarea no lleva atributo type
  const isTextarea = newElemento === "textarea";
  const addElemento = isTextarea
    ? document.createElement("textarea")
    : document.createElement("input");

  addElemento.setAttribute("id", idNuevo);
  addElemento.setAttribute("class", "form-control");
  addElemento.setAttribute("placeholder", tituloElemento.value);

  // tipos soportados: text, number, date, password, email, color
  if (!isTextarea) addElemento.setAttribute("type", newElemento);

  // label
  const labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", idNuevo);

  const iconLabel = document.createElement("i");
  iconLabel.setAttribute("class", "bi bi-tag");
  labelElemento.insertAdjacentElement("afterbegin", iconLabel);
  labelElemento.appendChild(document.createTextNode(` ${tituloElemento.value}`));

  // span ID
  const labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  // contenedor bootstrap
  const divElemento = document.createElement("div");
  divElemento.setAttribute("class", "form-floating mb-3");

  if (isTextarea) addElemento.setAttribute("rows", "3");

  divElemento.appendChild(addElemento);
  divElemento.appendChild(labelElemento);
  newForm.appendChild(labelId);
  newForm.appendChild(divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => vericarTipoElemento();

buttonAddElemento.onclick = () => {
  if (nombreElemento.value.trim() !== "" && tituloElemento.value.trim() !== "") {
    const tipo = cmbElemento.value;
    if (tipo === "select") newSelect();
    else if (tipo === "radio" || tipo === "checkbox") newRadioCheckbox(tipo);
    else newInput(tipo); // incluye text, number, date, password, textarea, email, color
  } else {
    alertar("Faltan campos por completar");
  }
};

// limpiar modal al abrir
document.getElementById("idModal").addEventListener("shown.bs.modal", limpiarModal);

// bvalidacion
function clearInvalids() {
  [...newForm.querySelectorAll(".is-invalid")].forEach(el => el.classList.remove("is-invalid"));
}

function validarNuevosControles() {
  clearInvalids();

  let vacios = 0, sinSeleccion = 0;

  const elementos = Array.from(newForm.elements);
  for (const el of elementos) {
    const tag = el.tagName;
    const type = (el.type || "").toLowerCase();

    // textarea o inputs de datos
    if (tag === "TEXTAREA" || ["text","number","date","password","email","color"].includes(type)) {
      const value = (el.value || "").trim();
      
      if (value === "") {
        vacios++;
        el.classList.add("is-invalid");
      }
    }

    // select
    if (tag === "SELECT") {
      if (el.value === "" || el.selectedIndex === -1) {
        sinSeleccion++;
        el.classList.add("is-invalid");
      }
    }

    // radio y checkbox individuales
    if (type === "radio" || type === "checkbox") {
      if (!el.checked) {
        sinSeleccion++;
        el.classList.add("is-invalid");
      }
    }
  }

  if (vacios === 0 && sinSeleccion === 0) {
    alertar("Validación correcta: todos los campos están completos/seleccionados.");
  } else {
    alertar(
      `Validación incompleta:\n- Campos vacíos: ${vacios}\n- Opciones sin selección (radio/checkbox/select): ${sinSeleccion}\n\nLos controles con error fueron resaltados.`
    );
  }
}

buttonValidarForm.onclick = validarNuevosControles;