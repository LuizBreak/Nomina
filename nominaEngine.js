import * as utils from "./util.js";

var selectedRow = null
var isValid = true;
var formData = {};
var showModal = false;


async function onFormSubmit(MyCallback) {

    // var modalMessage = document.getElementById("modalContent");
    showModal = false;

    if (validate()) {

        // showModal = true;
        formData = readFormData();

        return putApiData().then(()=>{
            if (formData.timestamp === 0) {
                fetchApiData();
                // MyCallback(true, modalMessage.innerHTML = "Registro insertado con exito.");
                MyCallback(true, "Registro insertado con exito.");
            } else {
                updateResourceReportItem(formData);
                // MyCallback(true, modalMessage.innerHTML = "Registro actualizado con exito.");
                MyCallback(true, "Registro actualizado con exito.");
            }
            resetForm();

        });

    } else {
        // console.log(modalMessage.innerHTML);
        //MyCallback(false, "Validation Failed");
    }
}

function readFormData() {

    var formData = {};
    
    // primary key
    formData["timestamp"] = Number(document.getElementById("timestamp").value);

    formData["nombre"] = document.getElementById("ddNombreBkp").value;
    formData["cedula"] = document.getElementById("cedula").value;
    formData["concepto"] = document.getElementById("concepto").value;
    formData["localidad"] = document.getElementById("localidad").value;
    formData["nombreCubierta"] = document.getElementById("ddNombreCubierta").value;
    formData["diasCobertura"] = document.getElementById("diasCobertura").value;
    formData["mesCobertura"] = document.getElementById("mesCobertura").value;
    formData["horaEntrada"] = document.getElementById("horaEntrada").value;
    formData["horaSalida"] = document.getElementById("horaSalida").value;
    formData["horaAlmuerzo"] = document.getElementById("horaAlmuerzo").value;
    formData["montosNegociados"] = document.getElementById("montosNegociados").value;
    formData["otrosPagos"] = document.getElementById("otrosPagos").value;
    formData["comentarios"] = document.getElementById("comentarios").value;
    formData["evidencia"] = document.getElementById("evidencia").value;
    formData["supervisor"] = document.getElementById("ddSupervisor").value;

    return formData;
}

function refreshNominaReport(element) {
    
    // Responsive Table (Browser and Mobile)
    // Article Reference: https://www.youtube.com/watch?v=ZtopjfXhUZI

    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    

        var newRow = table.insertRow(table.length);

        // let cell1 = newRow.insertCell(0);
        // cell1.innerHTML = `<a onClick="onEdit(this)">Editar</a>
        //                     <a onClick="onDelete(this)">Borrar</a>`;

        // cell1.setAttribute("data-label", "Acción");


        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = `<a onClick="callOnEdit(this)">
                            <img src="assets/pencil.png" 
                                class="linkActions" 
                                alt="Editar" 
                                style="width:25px;height:25px;"
                                title="Editar">
                            </a>
                            <a onClick="callOnDelete(this)">
                            <img src="assets/remove.png" 
                                class="linkActions" 
                                alt="Borrar" 
                                style="width:25px;height:25px;"
                                title="Borrar">
                            </a>`;

        cell1.setAttribute("data-label", "Acción");
        
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = utils.fixUndefinedValues(element.nombre);
        cell2.setAttribute("data-label", "Nombre");

        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = utils.fixUndefinedValues(element.cedula);
        cell3.setAttribute("data-label", "Cedula");
        
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = utils.fixUndefinedValues (element.concepto);
        cell4.setAttribute("data-label", "Concepto");
        
        let cell5 = newRow.insertCell(4);
        cell5.innerHTML =  utils.fixUndefinedValues(element.localidad);
        cell5.setAttribute("data-label", "Localidad");
        
        let cell6 = newRow.insertCell(5);
        cell6.innerHTML =  utils.fixUndefinedValues(element.personaCubierta);
        cell6.setAttribute("data-label", "Persona Cubierta");
        
        let cell7 = newRow.insertCell(6);
        cell7.innerHTML = utils.fixUndefinedValues(element.diasCobertura);
        cell7.setAttribute("data-label", "Dias de cobertura");
        
        let cell8 = newRow.insertCell(7);
        cell8.innerHTML = utils.fixUndefinedValues(element.mesCobertura);
        cell8.setAttribute("data-label", "Mes de cobertura");
        
        let cell9 = newRow.insertCell(8);
        cell9.innerHTML = utils.fixUndefinedValues(element.horaEntrada);
        cell9.setAttribute("data-label", "Hora de entrada");
        
        let cell10 = newRow.insertCell(9);
        cell10.innerHTML = utils.fixUndefinedValues(element.horaSalida);
        cell10.setAttribute("data-label", "Hora de salida");
        
        let cell11 = newRow.insertCell(10);
        cell11.innerHTML = utils.fixUndefinedValues(element.horaAlmuerzo);
        cell11.setAttribute("data-label", "Mantener hora de almuerzo");
        
        let cell12 = newRow.insertCell(11);
        cell12.innerHTML = utils.fixUndefinedValues(element.montosNegociados);
        cell12.setAttribute("data-label", "Montos Negociados");
        
        let cell13 = newRow.insertCell(12);
        cell13.innerHTML = utils.fixUndefinedValues(element.otrosPagos);
        cell13.setAttribute("data-label", "Otros Pagos");
        
        let cell14 = newRow.insertCell(13);
        cell14.innerHTML = utils.fixUndefinedValues(element.comentarios);
        cell14.setAttribute("data-label", "Comentarios");
        
        let cell15 = newRow.insertCell(14);
        cell15.innerHTML = utils.fixUndefinedValues(element.evidencia);
        cell15.setAttribute("data-label", "Evidencia");
        
        let cell16 = newRow.insertCell(15);
        cell16.innerHTML = utils.fixUndefinedValues(element.supervisor);
        cell16.setAttribute("data-label", "Supervisor");
        
        let cell17 = newRow.insertCell(16);
        cell17.innerHTML = utils.fixUndefinedValues(element.timestamp);
        cell17.setAttribute("data-label", "Timestamp");
}

function createForm(){
    // populate the dropdowns with API data
    var option;
    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/resources/all';
    
    var selectSupervisor = document.getElementById("ddSupervisor-List");
    var selectNombreBkp = document.getElementById("ddNombreBkp-List");
    var selectCubierta = document.getElementById("ddNombreCubierta-List");

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let resources = data.Items;
    return resources.map(function(resources) {

            // console.log(resources.nombre)
            // console.log(resources.cargo)
            if (resources.cargo == 'SUPERVISOR'|| resources.cargo == 'SUPERVISORA') {

                option = document.createElement('option');
                option.setAttribute('value', resources.nombre);
                option.appendChild(document.createTextNode(resources.cedula));
                selectSupervisor.appendChild(option);
        
            } else if (resources.cargo.includes("BKP")) {
                // all personall backup
                option = document.createElement('option');
                option.setAttribute('value', resources.nombre + " - " + resources.cedula);
                //option.appendChild(document.createTextNode(resources.cedula));
                selectNombreBkp.appendChild(option); 
        
            } else {
            // all employees like  'MEDICO' || 'ENFERMERO' || 'ENFERMERA') {

                option = document.createElement('option');
                option.setAttribute('value', resources.nombre);
                option.appendChild(document.createTextNode(resources.cedula));
                selectCubierta.appendChild(option);
        
            }
        })
    })
    .catch(function(error) {
    console.log(error);
    });

    fetchApiData();
}

function resetForm() {
    document.getElementById("ddNombreBkp").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("concepto").value = "";
    document.getElementById("localidad").value = "";
    document.getElementById("ddNombreCubierta").value = "";
    document.getElementById("diasCobertura").value = "";
    document.getElementById("mesCobertura").value = "";
    document.getElementById("horaEntrada").value = "";
    document.getElementById("horaSalida").value = "";
    document.getElementById("horaAlmuerzo").value = "";
    document.getElementById("montosNegociados").value = "";
    document.getElementById("otrosPagos").value = "";
    document.getElementById("comentarios").value = "";
    document.getElementById("evidencia").value = "";
    document.getElementById("ddSupervisor").value = "";
    document.getElementById("timestamp").value = "";

    selectedRow = null;
}

function onEdit(td) {

    selectedRow = td.parentElement.parentElement;

    // [0] -> Acción

    // var objSelect = document.getElementById("ddNombreBkp-List");
    // let nombreValue = setSelectedValue(objSelect, selectedRow.cells[1].innerHTML);
    // document.getElementById("ddNombreBkp").value = nombreValue;

    document.getElementById("ddNombreBkp").value = selectedRow.cells[1].innerHTML;


    document.getElementById("cedula").value = selectedRow.cells[2].innerHTML;

    var objSelect = document.getElementById("concepto");
    utils.setSelectedValue(objSelect, selectedRow.cells[3].innerHTML);

    document.getElementById("localidad").value = selectedRow.cells[4].innerHTML;

    // var objSelect = document.getElementById("ddNombreCubierta-List");
    // let nombreCubiertavalue =  setSelectedValue(objSelect, selectedRow.cells[5].innerHTML);
    // document.getElementById("ddNombreCubierta").value = nombreCubiertavalue;

    document.getElementById("ddNombreCubierta").value = selectedRow.cells[5].innerHTML;

    document.getElementById("diasCobertura").value = selectedRow.cells[6].innerHTML;
    document.getElementById("mesCobertura").value = selectedRow.cells[7].innerHTML;
    document.getElementById("horaEntrada").value = selectedRow.cells[8].innerHTML;
    document.getElementById("horaSalida").value = selectedRow.cells[9].innerHTML;
    document.getElementById("horaAlmuerzo").value = selectedRow.cells[10].innerHTML;
    document.getElementById("montosNegociados").value = selectedRow.cells[11].innerHTML;
    document.getElementById("otrosPagos").value = selectedRow.cells[12].innerHTML;
    document.getElementById("comentarios").value = selectedRow.cells[13].innerHTML;
    document.getElementById("evidencia").value = selectedRow.cells[14].innerHTML;

    // var objSelect = document.getElementById("ddSupervisor-List");
    // let supervisorvalue =  setSelectedValue(objSelect, selectedRow.cells[15].innerHTML);
    // document.getElementById("ddSupervisor").value = supervisorvalue;
    document.getElementById("ddSupervisor").focus();

    document.getElementById("ddSupervisor").value = selectedRow.cells[15].innerHTML;

    document.getElementById("timestamp").value = selectedRow.cells[16].innerHTML;
}

function updateResourceReportItem(formData) {

    // [0] -> Acción
    
    selectedRow.cells[1].innerHTML = formData.nombre;

    selectedRow.cells[2].innerHTML = formData.cedula;
    selectedRow.cells[3].innerHTML = formData.concepto;
    selectedRow.cells[4].innerHTML = formData.localidad;
    selectedRow.cells[5].innerHTML = formData.nombreCubierta;
    selectedRow.cells[6].innerHTML = formData.diasCobertura;
    selectedRow.cells[7].innerHTML = formData.mesCobertura;
    selectedRow.cells[8].innerHTML = formData.horaEntrada;
    selectedRow.cells[9].innerHTML = formData.horaSalida;
    selectedRow.cells[10].innerHTML = formData.horaAlmuerzo;
    selectedRow.cells[11].innerHTML = formData.montosNegociados;
    selectedRow.cells[12].innerHTML = formData.otrosPagos;
    selectedRow.cells[13].innerHTML = formData.comentarios;
    selectedRow.cells[14].innerHTML = formData.evidencia;
    selectedRow.cells[15].innerHTML = formData.supervisor; 
    selectedRow.cells[16].innerHTML = formData.timestamp;
}

function onDelete(td, MyCallback) {

    let row = td.parentElement.parentElement;
    let timestamp = row.cells[16].innerHTML;

    if (confirm('Are you sure to delete this record?')) {

        //var modalMessage = document.getElementById("modalContent");
        
        if (timestamp=="") {
            MyCallback(true, "Unable to delete this record.");
            return;
        }
        
        const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/entries/' + timestamp;
            
        let data = {
                "pathParameters": {
                    "timestamp": Number(timestamp) 
                }
            }

        var request = new Request(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        fetch(request)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            //modalMessage.innerHTML = "Record deleted successfully.";
            MyCallback(true, "Record deleted successfully.");
        });

        document.getElementById("informe").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {

    let isValid = true;

    isValid = utils.SetValidationError("ddNombreBkp", "ddNombreBkpValidationError");
    isValid = utils.SetValidationError("cedula", "cedulaValidationError");
    isValid = utils.SetValidationError("concepto", "conceptoValidationError");
    isValid = utils.SetValidationError("localidad", "localidadValidationError");
    isValid = utils.SetValidationError("ddNombreCubierta", "ddNombreCubiertaValidationError");
    isValid = utils.SetValidationError("diasCobertura", "diasCoberturaValidationError");
    isValid = utils.SetValidationError("mesCobertura", "mesCoberturaValidationError");
    isValid = utils.SetValidationError("horaEntrada", "horaEntradaValidationError");
    isValid = utils.SetValidationError("horaSalida", "horaSalidaValidationError");
    isValid = utils.SetValidationError("horaAlmuerzo", "horaAlmuerzoValidationError");
    isValid = utils.SetValidationError("montosNegociados", "montosNegociadosValidationError");
    isValid = utils.SetValidationError("ddSupervisor", "ddSupervisorValidationError");

    return isValid;
}

function SetValidationError(FieldName, ErrorlabelName) {

    if (document.getElementById(FieldName).value == "") {
        isValid = false;
        document.getElementById(ErrorlabelName).classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById(ErrorlabelName).classList.contains("hide"))
            document.getElementById(ErrorlabelName).classList.add("hide");
    }
}

// function resetResourceReport(){
//     var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
//     while (table.hasChildNodes()) {
//         table.removeChild(table.lastChild);
//     }
// }

async function fetchApiData(){
    
    // Article Reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    utils.resetReportTable("informe");

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/nomina/all';

    try {
        const resp = await fetch(url);
        const data = await resp.json();
        let nominaItems = data.Items;
        nominaItems.map(function (item) {

            refreshNominaReport(item);

        });
        return resp;

    } catch (error) {
        console.log(error);
    }
}

async function putApiData(){

    // Article Reference: https://stackabuse.com/using-fetch-to-send-http-requests-in-javascript/

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/entries';
    
    console.log("v1: " + formData.timestamp);
    // console.log("v2: " + formData.diasCobertura);

    let data = {
        
        "timestamp": Number(formData.timestamp),
        "nombre": formData.nombre,
        "localidad": formData.localidad,
        "personaCubierta": formData.nombreCubierta,
        "evidencia": formData.evidencia,
        "concepto": formData.concepto,
        "cedula": formData.cedula,
        "supervisor": formData.supervisor,
        "diasCobertura": formData.diasCobertura,
        "mesCobertura": formData.mesCobertura,
        "horaEntrada": formData.horaEntrada,
        "horaSalida": formData.horaSalida,
        "horaAlmuerzo": formData.horaAlmuerzo,
        "montosNegociados": formData.montosNegociados,
        "otrosPagos": formData.otrosPagos,
        "comentarios": formData.comentarios

       }

       console.log(data);

    var request = new Request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    const response = await fetch(request);
    const json = await response.json();
    console.log(json);
    return response;
}

function extractCedula(){

    var ddNombreBkp = document.getElementById("ddNombreBkp");
    var miNombre = document.getElementById("ddNombreBkp");
    var miCedula = document.getElementById("cedula");

    let nombreycedula = ddNombreBkp.value.split("-")

    miNombre.value = nombreycedula[0]
    miCedula.value = nombreycedula[1]
}

function helloWorld() {

    return " Yes, I was here."
}

export { createForm, helloWorld, extractCedula, onDelete, onEdit, onFormSubmit};