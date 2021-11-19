var selectedRow = null

function onFormSubmit() {

    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
        {
            addNominaEntry();
            fetchApiData();
        }
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {

    var formData = {};
    
    // primary key
    formData["timestamp"] = document.getElementById("timestamp").value;

    formData["NombreBkp"] = document.getElementById("ddNombreBkp").value;
    formData["cedula"] = document.getElementById("cedula").value;
    formData["concepto"] = document.getElementById("concepto").value;
    formData["localidad"] = document.getElementById("localidad").value;
    formData["ddNombreCubierta"] = document.getElementById("ddNombreCubierta").value;
    formData["diasCobertura"] = document.getElementById("diasCobertura").value;
    formData["mesCobertura"] = document.getElementById("mesCobertura").value;
    formData["horaEntrada"] = document.getElementById("horaEntrada").value;
    formData["horaSalida"] = document.getElementById("horaSalida").value;
    formData["horaAlmuerzo"] = document.getElementById("horaAlmuerzo").value;
    formData["montosNegociados"] = document.getElementById("montosNegociados").value;
    formData["comentariosAdicionales"] = document.getElementById("comentariosAdicionales").value;

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
        cell1.innerHTML = element.nombre;
        cell1.setAttribute("data-label", "Nombre");

        cell2 = newRow.insertCell(1);
        cell2.innerHTML = element.cedula;
        cell2.setAttribute("data-label", "Cedula");
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = element.concepto;
        cell3.setAttribute("data-label", "Concepto");
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = element.Localidad;
        cell4.setAttribute("data-label", "Localidad");
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = element.personaCubierta;
        cell5.setAttribute("data-label", "Persona Cubierta");
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = element.diasCobertura;
        cell6.setAttribute("data-label", "Dias de cobertura");
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = element.mesCobertura;
        cell7.setAttribute("data-label", "Mes de cobertura");
        cell8 = newRow.insertCell(7);
        cell8.innerHTML = element.horaEntrada;
        cell8.setAttribute("data-label", "Hora de entrada");
        cell9 = newRow.insertCell(8);
        cell9.innerHTML = element.horaSalida;
        cell9.setAttribute("data-label", "Hora de salida");
        cell10 = newRow.insertCell(9);
        cell10.innerHTML = element.horaAlmuerzo;
        cell10.setAttribute("data-label", "Mantener hora de almuerzo");
        cell11 = newRow.insertCell(10);
        cell11.innerHTML = element.montosNegociados;
        cell11.setAttribute("data-label", "Montos Negociados");
        cell12 = newRow.insertCell(11);
        cell12.innerHTML = element.comentariosAdicionales;
        cell12.setAttribute("data-label", "Comentarios Adicionales");
        cell13 = newRow.insertCell(12);
        cell13.innerHTML = element.evidencia;
        cell13.setAttribute("data-label", "Evidencia");
        cell14 = newRow.insertCell(13);
        cell14.innerHTML = element.supervisor;
        cell14.setAttribute("data-label", "Supervisor");
        cell15 = newRow.insertCell(14);
        cell15.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                            <a onClick="onDelete(this)">Delete</a>`;

        cell15.setAttribute("data-label", "Action");
        
        cell10 = newRow.insertCell(10);
        cell10.innerHTML = element.timestamp;
        cell10.setAttribute("data-label", "Timestamp");
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

        console.log(resources.nombre)
        console.log(resources.cargo)
        if (resources.cargo == 'Supervisor'|| resources.cargo == 'Supervisora') {

            option = document.createElement('option');
            option.setAttribute('value', resources.nombre);
            option.appendChild(document.createTextNode(resources.nombre));
            selectSupervisor.appendChild(option);
    
        } else if (resources.cargo == 'Medico' || resources.cargo == 'Enfermero' || resources.cargo == 'Enfermera') {

            option = document.createElement('option');
            option.setAttribute('value', resources.nombre);
            option.appendChild(document.createTextNode(resources.nombre));
            selectCubierta.appendChild(option);
    
        } else {
            option = document.createElement('option');
            option.setAttribute('value', resources.nombre);
            option.appendChild(document.createTextNode(resources.nombre));
            selectNombreBkp.appendChild(option); 
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
    document.getElementById("comentariosAdicionales").value = "";
    document.getElementById("evidencia").value = "";
    document.getElementById("ddSupervisor").value = "";
    document.getElementById("timestamp").value = "";

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    var objSelect = document.getElementById("ddNombreBkp");
    setSelectedValue(objSelect, selectedRow.cells[0].innerHTML);
    // document.getElementById("ddNombreBkp").value = selectedRow.cells[0].innerHTML;

    document.getElementById("cedula").value = selectedRow.cells[1].innerHTML;

    var objSelect = document.getElementById("concepto");
    setSelectedValue(objSelect, selectedRow.cells[2].innerHTML);
    // document.getElementById("concepto").value = selectedRow.cells[2].innerHTML;

    document.getElementById("localidad").value = selectedRow.cells[3].innerHTML;
    document.getElementById("diasCobertura").value = selectedRow.cells[5].innerHTML;
    document.getElementById("mesCobertura").value = selectedRow.cells[6].innerHTML;
    document.getElementById("horaEntrada").value = selectedRow.cells[7].innerHTML;
    document.getElementById("horaSalida").value = selectedRow.cells[8].innerHTML;
    document.getElementById("horaAlmuerzo").value = selectedRow.cells[9].innerHTML;
    document.getElementById("montosNegociados").value = selectedRow.cells[10].innerHTML;
    document.getElementById("comentariosAdicionales").value = selectedRow.cells[11].innerHTML;
    document.getElementById("evidencia").value = selectedRow.cells[12].innerHTML;
    document.getElementById("ddSupervisor").value = selectedRow.cells[13].innerHTML;

    var objSelect = document.getElementById("ddNombreCubierta-List");
    setSelectedValue(objSelect, selectedRow.cells[4].innerHTML);
    // document.getElementById("ddNombreCubierta").value = selectedRow.cells[4].innerHTML;
        
    var objSelect = document.getElementById("ddSupervisor-List");
    setSelectedValue(objSelect, selectedRow.cells[8].innerHTML);
    // document.getElementById("ddSupervisor").value = selectedRow.cells[8].innerHTML;
    // [9] -> Action
    document.getElementById("timestamp").value = selectedRow.cells[10].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.ddNombreBkp;
    selectedRow.cells[1].innerHTML = formData.cedula;
    selectedRow.cells[2].innerHTML = formData.concepto;
    selectedRow.cells[3].innerHTML = formData.localidad;
    selectedRow.cells[4].innerHTML = formData.ddNombreCubierta;
    selectedRow.cells[5].innerHTML = formData.diasCobertura;
    selectedRow.cells[6].innerHTML = formData.mesCobertura;
    selectedRow.cells[7].innerHTML = formData.horaEntrada;
    selectedRow.cells[8].innerHTML = formData.horaSalida;
    selectedRow.cells[9].innerHTML = formData.horaAlmuerzo;
    selectedRow.cells[10].innerHTML = formData.montosNegociados;
    selectedRow.cells[11].innerHTML = formData.comentariosAdicionales;
    selectedRow.cells[12].innerHTML = formData.evidencia;
    selectedRow.cells[13].innerHTML = formData.ddSupervisor;
    // [14] -> Action 
    selectedRow.cells[15].innerHTML = formData.timestamp;
}

function onDelete(td) {

    row = td.parentElement.parentElement;
    let timestamp = row.cells[10].innerHTML;

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

    // console.log(document.getElementById("concepto").value);
    // return

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
    SetValidationError("montosNegociados", "mesCoberturaValidationError");
    SetValidationError("comentariosAdicionales", "comentariosAdicionalesValidationError");
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

function fetchApiData(){
    
    // Article Reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/nomina/all';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let nominaItems = data.Items;
    return nominaItems.map(function(item) {

        refreshNominaReport(item);

        })
    })
    .catch(function(error) {
    console.log(error);
    });
}

function postApiData(){

    // Article Reference: https://stackabuse.com/using-fetch-to-send-http-requests-in-javascript/

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/entries';
    

    let data = {
        
        "timestamp": formData.timestamp,
        "nombre": formData.ddNombreBkp,
        "Localidad": formData.Localidad,
        "hora": formData.hora,
        "personaCubierta": formData.ddNombreCubierta,
        "evidencia": formData.evidencia,
        "concepto": formData.Concepto,
        "fecha": formData.fecha,
        "cedula": formData.cedula,
        "supervisor": formData.supervisor
       }


    var request = new Request(url, {
        method: 'POST',
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
}
    
function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text== valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}
