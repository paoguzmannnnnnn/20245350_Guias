//Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
//aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL BODY DEL MODAL
//PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Función principal para validar el formulario
const validarFormulario = function () {
    // Array para almacenar errores
    const errores = [];

    // a. Validar que los campos no estén vacíos
    if (formulario.elements["nombre"].value.trim() === '') {
        errores.push('El campo Nombres no puede estar vacío');
    }

    if (formulario.elements["apellidos"].value.trim() === '') {
        errores.push('El campo Apellidos no puede estar vacío');
    }

    if (formulario.elements["fechaNacimiento"].value === '') {
        errores.push('La fecha de nacimiento es obligatoria');
    }

    if (formulario.elements["email"].value.trim() === '') {
        errores.push('El campo Correo Electrónico no puede estar vacío');
    }

    if (formulario.elements["password"].value === '') {
        errores.push('La contraseña es obligatoria');
    }

    if (formulario.elements["repetirPassword"].value === '') {
        errores.push('Debe repetir la contraseña');
    }

    // b. Validar que la fecha de nacimiento no supere la fecha actual
    const fechaNac = new Date(formulario.elements["fechaNacimiento"].value);
    const fechaActual = new Date();
    
    if (fechaNac > fechaActual) {
        errores.push('La fecha de nacimiento no puede ser mayor a la fecha actual');
    }

    // c. Validar email con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = formulario.elements["email"].value.trim();
    if (email !== '' && !emailRegex.test(email)) {
        errores.push('El formato del correo electrónico no es válido');
    }

    // d. Validar que las contraseñas coincidan
    const password = formulario.elements["password"].value;
    const repetirPassword = formulario.elements["repetirPassword"].value;
    if (password !== repetirPassword) {
        errores.push('Las contraseñas no coinciden');
    }

    // e. Validar que esté seleccionada al menos una opción para "algunos intereses"
    const intereses = formulario.elements["intereses"];
    let interesesSeleccionados = 0;
    for (let i = 0; i < intereses.length; i++) {
        if (intereses[i].checked) {
            interesesSeleccionados++;
        }
    }
    if (interesesSeleccionados === 0) {
        errores.push('Debe seleccionar al menos un interés');
    }

    // f. Validar que esté seleccionada una carrera
    const carrera = formulario.elements["carrera"];
    let carreraSeleccionada = false;
    for (let i = 0; i < carrera.length; i++) {
        if (carrera[i].checked) {
            carreraSeleccionada = true;
            break;
        }
    }
    if (!carreraSeleccionada) {
        errores.push('Debe seleccionar una carrera');
    }

    // g. Validar que esté seleccionado un país de origen
    const pais = formulario.elements["pais"];
    if (pais.value === '') {
        errores.push('Debe seleccionar un país de origen');
    }

    // Si hay errores, mostrarlos
    if (errores.length > 0) {
        mostrarErrores(errores);
        return false;
    }

    // Si no hay errores, mostrar los datos en una tabla
    mostrarDatosEnTabla();
    return true;
};

// Función para mostrar errores usando DOM
function mostrarErrores(errores) {
    // Limpiar contenido anterior
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    // Actualizar título del modal
    const modalTitle = document.querySelector('#idModal .modal-title');
    modalTitle.textContent = 'Errores de Validación';

    // Crear elemento para mostrar errores
    const errorDiv = document.createElement('div');
    errorDiv.setAttribute('class', 'alert alert-danger');
    
    const errorTitle = document.createElement('h5');
    errorTitle.textContent = 'Se encontraron los siguientes errores:';
    errorDiv.appendChild(errorTitle);

    const errorList = document.createElement('ul');
    errorList.setAttribute('class', 'mb-0 mt-2');
    
    errores.forEach(error => {
        const errorItem = document.createElement('li');
        errorItem.textContent = error;
        errorList.appendChild(errorItem);
    });
    
    errorDiv.appendChild(errorList);
    bodyModal.appendChild(errorDiv);

    // Mostrar modal
    modal.show();
}

// Función para mostrar datos en tabla usando DOM (sin innerHTML)
function mostrarDatosEnTabla() {
    // Limpiar contenido anterior
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    // Actualizar título del modal
    const modalTitle = document.querySelector('#idModal .modal-title');
    modalTitle.textContent = 'Datos Validados Correctamente';

    // Crear título
    const titulo = document.createElement('h5');
    titulo.textContent = 'Información del Registro';
    titulo.setAttribute('class', 'mb-4 text-success text-center');
    bodyModal.appendChild(titulo);

    // Crear tabla
    const tabla = document.createElement('table');
    tabla.setAttribute('class', 'table table-striped table-bordered');

    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');

    // Función auxiliar para crear filas de la tabla
    function crearFila(etiqueta, valor) {
        const fila = document.createElement('tr');
        
        const celdaEtiqueta = document.createElement('td');
        celdaEtiqueta.textContent = etiqueta;
        celdaEtiqueta.setAttribute('class', 'fw-bold');
        celdaEtiqueta.style.width = '40%';
        
        const celdaValor = document.createElement('td');
        celdaValor.textContent = valor;
        
        fila.appendChild(celdaEtiqueta);
        fila.appendChild(celdaValor);
        
        return fila;
    }

    // Obtener valores seleccionados para intereses
    const intereses = formulario.elements["intereses"];
    let interesesSeleccionados = [];
    for (let i = 0; i < intereses.length; i++) {
        if (intereses[i].checked) {
            const label = document.querySelector(`label[for="${intereses[i].id}"]`);
            interesesSeleccionados.push(label ? label.textContent : intereses[i].value);
        }
    }

    // Obtener carrera seleccionada
    const carrera = formulario.elements["carrera"];
    let carreraSeleccionada = '';
    for (let i = 0; i < carrera.length; i++) {
        if (carrera[i].checked) {
            const label = document.querySelector(`label[for="${carrera[i].id}"]`);
            carreraSeleccionada = label ? label.textContent : carrera[i].value;
            break;
        }
    }

    // Agregar filas con los datos
    tbody.appendChild(crearFila('Nombres', formulario.elements["nombre"].value));
    tbody.appendChild(crearFila('Apellidos', formulario.elements["apellidos"].value));
    tbody.appendChild(crearFila('Fecha de Nacimiento', formulario.elements["fechaNacimiento"].value));
    tbody.appendChild(crearFila('Correo Electrónico', formulario.elements["email"].value));
    tbody.appendChild(crearFila('Intereses', interesesSeleccionados.join(', ')));
    tbody.appendChild(crearFila('Carrera', carreraSeleccionada));
    tbody.appendChild(crearFila('País de Origen', formulario.elements["pais"].options[formulario.elements["pais"].selectedIndex].text));
    tbody.appendChild(crearFila('Archivo de Avatar', 
        formulario.elements["avatar"].files.length > 0 ? 
        formulario.elements["avatar"].files[0].name : 'No seleccionado'
    ));

    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);

    // Mostrar modal
    modal.show();
}

// Cambiar el evento del botón para usar la validación
button.onclick = () => {
    validarFormulario();
};