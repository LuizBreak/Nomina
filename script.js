var selectedRow = null


function onFormSubmit() {

    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
        {
            fetchApiData2()
            createForm();
            //insertNewRecord(formData);
        }
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["ddNombreBkp"] = document.getElementById("ddNombreBkp").value;
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
    formData["ddSupervisor"] = document.getElementById("ddSupervisor").value; 
    return formData;
}

function insertNewRecord(element) {
    
    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    

        var newRow = table.insertRow(table.length);

        cell1 = newRow.insertCell(0);
        cell1.innerHTML = element.ddNombreBkp;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = element.cedula;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = element.concepto;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = element.localidad;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = element.ddNombreCubierta;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = element.diasCobertura;
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = element.mesCobertura;
        cell8 = newRow.insertCell(7);
        cell8.innerHTML = element.horaEntrada;
        cell9 = newRow.insertCell(8);
        cell9.innerHTML = element.horaSalida;
        cell10 = newRow.insertCell(9);
        cell10.innerHTML = element.horaAlmuerzo;
        cell11 = newRow.insertCell(10);
        cell11.innerHTML = element.montosNegociados;
        cell12 = newRow.insertCell(11);
        cell12.innerHTML = element.comentariosAdicionales;
        cell13 = newRow.insertCell(12);
        cell13.innerHTML = element.evidencia;
        cell14 = newRow.insertCell(13);
        cell14.innerHTML = element.ddSupervisor;
        cell15 = newRow.insertCell(14);
        cell15.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a onClick="onDelete(this)">Delete</a>`;

}

function createForm(){
    // populate the dropdowns with API data

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/resources/all';
    
    var selectNombreBkp = document.getElementById("ddNombreBkp");
    var selectCubierta = document.getElementById("ddNombreCubierta");
    var selectSupervisor = document.getElementById("ddSupervisor");

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

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("ddNombreBkp").value = selectedRow.cells[0].innerHTML;
    document.getElementById("cedula").value = selectedRow.cells[1].innerHTML;
    document.getElementById("concepto").value = selectedRow.cells[2].innerHTML;
    document.getElementById("localidad").value = selectedRow.cells[3].innerHTML;
    document.getElementById("ddNombreCubierta").value = selectedRow.cells[4].innerHTML;
    document.getElementById("diasCobertura").value = selectedRow.cells[5].innerHTML;
    document.getElementById("mesCobertura").value = selectedRow.cells[6].innerHTML;
    document.getElementById("horaEntrada").value = selectedRow.cells[7].innerHTML;
    document.getElementById("horaSalida").value = selectedRow.cells[8].innerHTML;
    document.getElementById("horaAlmuerzo").value = selectedRow.cells[9].innerHTML;
    document.getElementById("montosNegociados").value = selectedRow.cells[10].innerHTML;
    document.getElementById("comentariosAdicionales").value = selectedRow.cells[11].innerHTML;
    document.getElementById("evidencia").value = selectedRow.cells[12].innerHTML;
    document.getElementById("ddSupervisor").value = selectedRow.cells[13].innerHTML;
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
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
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
function fetchApiData2(){
    
    // Article Reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    console.log("Pasamos por fetchApiData2")
    // const url = 'https://d51wibckd0.execute-api.us-east-1.amazonaws.com/dev/items'; CpnchApp

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/nomina/all';
    var done = false;

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let authors = data.Items;
    return authors.map(function(author) {

        insertNewRecord(author);

        })
    })
    .catch(function(error) {
    console.log(error);
    });
}

function postApiData2(){

    // Article Reference: https://stackabuse.com/using-fetch-to-send-http-requests-in-javascript/

    const url = 'https://w2edkzxi8h.execute-api.us-east-1.amazonaws.com/common/api/v1/transactions';
    

    let data = {
        "fromUser": "source-user-Z",
        "toUser": "test-user",
        "timestamp": 1733651606459,
        "transactionDate": "2021-10-07 20:06:46.459",
        "transactionType": "xPayment",
        "userId": 1,
        "locationName": "xPlaza de la Bandera",
        "description": "xJardin Botanico",
        "amount": 16.29,
        "longitude": 0,
        "latitude": 0
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

