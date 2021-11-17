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
    formData["NombreCubierta"] = document.getElementById("ddNombreCubierta").value;
    formData["fecha"] = document.getElementById("fecha").value;
    formData["horas"] = document.getElementById("horas").value;
    formData["evidencia"] = document.getElementById("evidencia").value;
    formData["supervisor"] = document.getElementById("ddSupervisor").value;

    return formData;
}

function refreshNominaReport(element) {
    
    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    

        var newRow = table.insertRow(table.length);

        cell1 = newRow.insertCell(0);
        cell1.innerHTML = element.nombre;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = element.cedula;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = element.concepto;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = element.Localidad;
        cell4 = newRow.insertCell(4);
        cell4.innerHTML = element.personaCubierta;
        cell5 = newRow.insertCell(5);
        cell5.innerHTML = element.fecha;
        cell6 = newRow.insertCell(6);
        cell6.innerHTML = element.hora;
        cell7 = newRow.insertCell(7);
        cell7.innerHTML = element.evidencia;
        cell8 = newRow.insertCell(8);
        cell8.innerHTML = element.supervisor;

        cell9 = newRow.insertCell(9);
        cell9.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a onClick="onDelete(this)">Delete</a>`;

        cell10 = newRow.insertCell(10);
        cell10.innerHTML = element.timestamp;
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

        // console.log(resources.nombre)
        // console.log(resources.cargo)
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
    document.getElementById("fecha").value = "";
    document.getElementById("horas").value = "";
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

    var objSelect = document.getElementById("ddNombreCubierta");
    setSelectedValue(objSelect, selectedRow.cells[4].innerHTML);
    // document.getElementById("ddNombreCubierta").value = selectedRow.cells[4].innerHTML;
    
    document.getElementById("fecha").value = selectedRow.cells[5].innerHTML;
    document.getElementById("horas").value = selectedRow.cells[6].innerHTML;
    document.getElementById("evidencia").value = selectedRow.cells[7].innerHTML;
    
    var objSelect = document.getElementById("ddSupervisor");
    setSelectedValue(objSelect, selectedRow.cells[8].innerHTML);
    // document.getElementById("ddSupervisor").value = selectedRow.cells[8].innerHTML;
    // [9] -> Action
    document.getElementById("timestamp").value = selectedRow.cells[10].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.ddNombreBkp;
    selectedRow.cells[1].innerHTML = formData.cedula;
    selectedRow.cells[2].innerHTML = formData.Concepto;
    selectedRow.cells[3].innerHTML = formData.Localidad;
    selectedRow.cells[4].innerHTML = formData.ddNombreCubierta;
    selectedRow.cells[5].innerHTML = formData.fecha;
    selectedRow.cells[6].innerHTML = formData.hora;
    selectedRow.cells[7].innerHTML = formData.evidencia;
    selectedRow.cells[8].innerHTML = formData.supervisor;
    // [9] -> Action 
    selectedRow.cells[10].innerHTML = formData.timestamp;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("timestamp").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {

    // console.log(document.getElementById("concepto").value);
    // return

    isValid = true;
    return;

    if (document.getElementById("ddNombreBkp").value == "") {
        isValid = false;
        document.getElementById("ddNombreBkpValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("ddNombreBkpValidationError").classList.contains("hide"))
            document.getElementById("ddNombreBkpValidationError").classList.add("hide");
    }
    if (document.getElementById("cedula").value == "") {
        isValid = false;
        document.getElementById("cedulaValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("cedulaValidationError").classList.contains("hide"))
            document.getElementById("cedulaValidationError").classList.add("hide");
    }
    if (document.getElementById("concepto").value == "") {
        isValid = false;
        document.getElementById("conceptoValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("conceptoValidationError").classList.contains("hide"))
            document.getElementById("conceptoValidationError").classList.add("hide");
    }
    if (document.getElementById("localidad").value == "") {
        isValid = false;
        document.getElementById("localidadValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("localidadValidationError").classList.contains("hide"))
            document.getElementById("localidadValidationError").classList.add("hide");
    }
    if (document.getElementById("ddNombreCubierta").value == "") {
        isValid = false;
        document.getElementById("personaCubiertaValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("personaCubiertaValidationError").classList.contains("hide"))
            document.getElementById("personaCubiertaValidationError").classList.add("hide");
    }
    if (document.getElementById("fecha").value == "") {
        isValid = false;
        document.getElementById("fechaValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fechaValidationError").classList.contains("hide"))
            document.getElementById("fechaValidationError").classList.add("hide");
    }
    if (document.getElementById("horas").value == "") {
        isValid = false;
        document.getElementById("horasValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("horasValidationError").classList.contains("hide"))
            document.getElementById("horasValidationError").classList.add("hide");
    }
    if (document.getElementById("ddSupervisor").value == "") {
        isValid = false;
        document.getElementById("supervisoraValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("supervisoraValidationError").classList.contains("hide"))
            document.getElementById("supervisoraValidationError").classList.add("hide");
    }
    return isValid;
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
