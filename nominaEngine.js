var selectedRow = null
var isValid = true;
var formData = {};

function onFormSubmit() {

    if (validate()) {

        formData = readFormData();
        
        putApiData().then(()=>{
            if (formData.timestamp === 0) {
                fetchApiData();
            } else {
                updateResourceReportItem(formData);
            }
            resetForm();
        });

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

        cell1 = newRow.insertCell(0);
        cell1.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                            <a onClick="onDelete(this)">Borrar</a>`;

        cell1.setAttribute("data-label", "Acción");
        
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = FixUndefined(element.nombre);
        cell2.setAttribute("data-label", "Nombre");

        cell3 = newRow.insertCell(2);
        cell3.innerHTML = FixUndefined(element.cedula);
        cell3.setAttribute("data-label", "Cedula");
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = FixUndefined (element.concepto);
        cell4.setAttribute("data-label", "Concepto");
        cell5 = newRow.insertCell(4);
        cell5.innerHTML =  FixUndefined(element.localidad);
        cell5.setAttribute("data-label", "Localidad");
        cell6 = newRow.insertCell(5);
        cell6.innerHTML =  FixUndefined(element.personaCubierta);
        cell6.setAttribute("data-label", "Persona Cubierta");
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = FixUndefined(element.diasCobertura);
        cell7.setAttribute("data-label", "Dias de cobertura");
        cell8 = newRow.insertCell(7);
        cell8.innerHTML = FixUndefined(element.mesCobertura);
        cell8.setAttribute("data-label", "Mes de cobertura");
        cell9 = newRow.insertCell(8);
        cell9.innerHTML = FixUndefined(element.horaEntrada);
        cell9.setAttribute("data-label", "Hora de entrada");
        cell10 = newRow.insertCell(9);
        cell10.innerHTML = FixUndefined(element.horaSalida);
        cell10.setAttribute("data-label", "Hora de salida");
        cell11 = newRow.insertCell(10);
        cell11.innerHTML = FixUndefined(element.horaAlmuerzo);
        cell11.setAttribute("data-label", "Mantener hora de almuerzo");
        cell12 = newRow.insertCell(11);
        cell12.innerHTML = FixUndefined(element.montosNegociados);
        cell12.setAttribute("data-label", "Montos Negociados");
        cell13 = newRow.insertCell(12);
        cell13.innerHTML = FixUndefined(element.otrosPagos);
        cell13.setAttribute("data-label", "Otros Pagos");
        cell14 = newRow.insertCell(13);
        cell14.innerHTML = FixUndefined(element.comentarios);
        cell14.setAttribute("data-label", "Comentarios");
        cell15 = newRow.insertCell(14);
        cell15.innerHTML = FixUndefined(element.evidencia);
        cell15.setAttribute("data-label", "Evidencia");
        cell16 = newRow.insertCell(15);
        cell16.innerHTML = FixUndefined(element.supervisor);
        cell16.setAttribute("data-label", "Supervisor");
        
        cell17 = newRow.insertCell(16);
        cell17.innerHTML = FixUndefined(element.timestamp);
        cell17.setAttribute("data-label", "Timestamp");
}

function createForm(){
    // populate the dropdowns with API data

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
                option.appendChild(document.createTextNode(resources.nombre));
                selectSupervisor.appendChild(option);
        
            } else if (resources.cargo.includes("BKP")) {
                // all personall backup
                option = document.createElement('option');
                option.setAttribute('value', resources.nombre);
                option.appendChild(document.createTextNode(resources.nombre));
                selectNombreBkp.appendChild(option); 
        
            } else {
            // all employees like  'MEDICO' || 'ENFERMERO' || 'ENFERMERA') {

                option = document.createElement('option');
                option.setAttribute('value', resources.nombre);
                option.appendChild(document.createTextNode(resources.nombre));
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
    setSelectedValue(objSelect, selectedRow.cells[3].innerHTML);

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

function onDelete(td) {

    row = td.parentElement.parentElement;
    let timestamp = row.cells[16].innerHTML;

    if (confirm('Are you sure to delete this record ? -> ' + timestamp.toString())) {

        
        if (timestamp=="") alert("Unable to delete this record.")
        
        const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/entries/' + timestamp;
            
        let data = {
                "pathParameters": {
                    "timestamp": timestamp 
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
        });

        document.getElementById("informe").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {

    isValid = true;

    SetValidationError("ddNombreBkp", "ddNombreBkpValidationError");
    SetValidationError("cedula", "cedulaValidationError");
    SetValidationError("concepto", "conceptoValidationError");
    SetValidationError("localidad", "localidadValidationError");
    SetValidationError("ddNombreCubierta", "ddNombreCubiertaValidationError");
    SetValidationError("diasCobertura", "diasCoberturaValidationError");
    SetValidationError("mesCobertura", "mesCoberturaValidationError");
    SetValidationError("horaEntrada", "horaEntradaValidationError");
    SetValidationError("horaSalida", "horaSalidaValidationError");
    SetValidationError("horaAlmuerzo", "horaAlmuerzoValidationError");
    SetValidationError("montosNegociados", "montosNegociadosValidationError");
    SetValidationError("ddSupervisor", "ddSupervisorValidationError");

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
function resetResourceReport(){
    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
}

async function fetchApiData(){
    
    // Article Reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    resetResourceReport();

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
    
function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {

        // console.log( selectObj.options[i].value  + "-" + valueToSet)
        // console.log("result: " + selectObj.options[i].value == valueToSet)
        
        if (selectObj.options[i].value.includes(valueToSet)) {
            selectObj.options[i].selected = true;
            // console.log("Found it ->: " + selectObj.options[i].value)
            return selectObj.options[i].value;
        }
    }
}

function FixUndefined (item){

    if ( typeof item  == 'undefined'){
        return "";
    } else {
        return item;
    }
}