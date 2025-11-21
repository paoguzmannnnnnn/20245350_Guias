// Expresiones regulares
const reCarnet = /^[A-Za-z]{2}\d{3}$/;                                     // AB001
const reNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/; // al menos 2 palabras
const reDui    = /^\d{8}-\d{1}$/;
const reNit    = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const reFecha  = /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;       // dd/mm/aaaa
const reEdad   = /^(0|[1-9]\d?|1[01]\d|120)$/;                              // 0–120

const $ = (id) => document.getElementById(id);
const setVal = (input, ok) => {
  input.classList.toggle("is-invalid", !ok);
  input.classList.toggle("is-valid", ok);
  return ok;
};

document.getElementById("btnValidarEst").addEventListener("click", () => {
  const okCarnet = setVal($("estCarnet"), reCarnet.test($("estCarnet").value.trim()));
  const okNom    = setVal($("estNombre"), reNombre.test($("estNombre").value.trim()));
  const okDui    = setVal($("estDui"),    reDui.test($("estDui").value.trim()));
  const okNit    = setVal($("estNit"),    reNit.test($("estNit").value.trim()));
  const okFecha  = setVal($("estFecha"),  reFecha.test($("estFecha").value.trim()));
  const okMail   = setVal($("estCorreo"), /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($("estCorreo").value.trim()));
  const okEdad   = setVal($("estEdad"),   reEdad.test($("estEdad").value.trim()));

  const allOk = [okCarnet, okNom, okDui, okNit, okFecha, okMail, okEdad].every(Boolean);
  $("estResultado").innerHTML = allOk
    ? `<div class="alert alert-success">Todo válido.</div>`
    : `<div class="alert alert-danger"> Revisa los campos marcados en rojo.</div>`;
});