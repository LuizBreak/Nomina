var selectedRow = null

function onFormSubmit() {

    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
        {
            // addNominaEntry();
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

    formData["nombre"] = document.getElementById("nombre").value;
    formData["apellido"] = document.getElementById("apellido").value;
    formData["cedula"] = document.getElementById("cedula").value;
    formData["direccion"] = document.getElementById("direccion").value;
    formData["telefono"] = document.getElementById("telefono").value;
    formData["email"] = document.getElementById("email").value;
    formData["cargo"] = document.getElementById("ddCargo").value;
    formData["banco"] = document.getElementById("banco").value;

    if (document.getElementById("Corriente").value == true) {
        formData["tipoCuenta"]  = "corriente"
    } else {
        formData["tipoCuenta"]  = "ahorro"
    }

    formData["cuenta"] = document.getElementById("cuenta").value;

    return formData;
}

function refresResourceReport(element) {
    
    // Responsive Table (Browser and Mobile)
    // Article Reference: https://www.youtube.com/watch?v=ZtopjfXhUZI

    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    

        var newRow = table.insertRow(table.length);

        cell1 = newRow.insertCell(0);
        cell1.innerHTML = element.nombre;
        cell1.setAttribute("data-label", "Nombre");

        cell2 = newRow.insertCell(1);
        cell2.innerHTML = element.apellido;
        cell2.setAttribute("data-label", "Apellido");

        cell3 = newRow.insertCell(2);
        cell3.innerHTML = element.cedula;
        cell3.setAttribute("data-label", "Cedula");

        cell4 = newRow.insertCell(3);
        cell4.innerHTML = element.direccion;
        cell4.setAttribute("data-label", "Direccion");

        cell5 = newRow.insertCell(4);
        cell5.innerHTML = element.telefono;
        cell5.setAttribute("data-label", "Telefono");

        cell6 = newRow.insertCell(5);
        cell6.innerHTML = element.correo;
        cell6.setAttribute("data-label", "Correo");

        cell7 = newRow.insertCell(6);
        cell7.innerHTML = element.cargo;
        cell7.setAttribute("data-label", "Cargo");

        cell8 = newRow.insertCell(7);
        cell8.innerHTML = element.banco;
        cell8.setAttribute("data-label", "Banco");

        cell9 = newRow.insertCell(8);
        cell9.innerHTML = element.tipoDeCuenta;
        cell9.setAttribute("data-label", "Tipo de Cuenta");
        
        cell10 = newRow.insertCell(9);
        cell10.innerHTML = element.cuenta;
        cell10.setAttribute("data-label", "Numero de Cuenta");

        cell11 = newRow.insertCell(10);
        cell11.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                            <a onClick="onDelete(this)">Delete</a>`;
        cell11.setAttribute("data-label", "Action");
        
        cell12 = newRow.insertCell(11);
        cell12.innerHTML = element.timestamp;
        cell12.setAttribute("data-label", "Timestamp");
}

function createForm(){

    fetchApiData();
}
function resetForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("ddCargo").value = "";
    document.getElementById("banco").value = "";
    document.getElementById("Corriente").value = true;
    document.getElementById("cuenta").value = "";
    document.getElementById("timestamp").value = "";
    
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    document.getElementById("nombre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("apellido").value = selectedRow.cells[1].innerHTML;
    document.getElementById("cedula").value = selectedRow.cells[2].innerHTML;
    document.getElementById("direccion").value = selectedRow.cells[3].innerHTML;
    document.getElementById("telefono").value = selectedRow.cells[4].innerHTML;
    document.getElementById("email").value = selectedRow.cells[5].innerHTML;
    document.getElementById("banco").value = selectedRow.cells[7].innerHTML;
    document.getElementById("cuenta").value = selectedRow.cells[9].innerHTML;
    
    if (selectedRow.cells[8].innerHTML=="corriente") {
        document.getElementById("Corriente").value = true;

    } else {
        document.getElementById("Ahorro").value = true;
    }
        
    var objSelect = document.getElementById("ddCargo");
    setSelectedValue(objSelect, selectedRow.cells[6].innerHTML);
    
    document.getElementById("timestamp").value = selectedRow.cells[11].innerHTML;
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
function fetchApiData(){
    
    // Article Reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/resources/all';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let resourceItems = data.Items;
    return resourceItems.map(function(item) {

        refresResourceReport(item);

        })
    })
    .catch(function(error) {
    console.log(error);
    });
}
