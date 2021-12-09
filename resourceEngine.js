import * as utils from "./util.js";

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
        });
    }
}
function readFormData() {

    var formData = {};

    // primary key
    formData["timestamp"] = Number(document.getElementById("timestamp").value);

    formData["nombre"] = document.getElementById("nombre").value;
    formData["apellido"] = document.getElementById("apellido").value;
    formData["cedula"] = document.getElementById("cedula").value;
    formData["direccion"] = document.getElementById("direccion").value;
    formData["telefono"] = document.getElementById("telefono").value;
    formData["correo"] = document.getElementById("correo").value;
    formData["cargo"] = document.getElementById("ddCargo").value;
    formData["banco"] = document.getElementById("banco").value;

    if (document.getElementById("Corriente").checked == true) {
        formData["tipoDeCuenta"]  = "corriente"
    } else {
        formData["tipoDeCuenta"]  = "ahorro"
    }

    formData["cuenta"] = document.getElementById("cuenta").value;
    formData["tipoDePago"] = document.getElementById("tipoDePago").value;
    formData["fechaDeInicio"] = document.getElementById("fechaDeInicio").value;
    formData["exequatur"] = document.getElementById("exequatur").value;
    formData["comentario"] = document.getElementById("comentario").value;

    return formData;
}

function refreshResourceReportItem(element) {
    
    // Responsive Table (Browser and Mobile)
    // Article Reference: https://www.youtube.com/watch?v=ZtopjfXhUZI

    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];


    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                        <a onClick="onDelete(this)">Borrar</a>`;
    cell1.setAttribute("data-label", "Acción");

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = element.nombre;
    cell2.setAttribute("data-label", "Nombre");

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = element.apellido;
    cell3.setAttribute("data-label", "Apellido");

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = element.cedula;
    cell4.setAttribute("data-label", "Cedula");

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = element.direccion;
    cell5.setAttribute("data-label", "Direccion");

    cell6 = newRow.insertCell(5);
    cell6.innerHTML = element.telefono;
    cell6.setAttribute("data-label", "Telefono");

    cell7 = newRow.insertCell(6);
    cell7.innerHTML = element.correo;
    cell7.setAttribute("data-label", "Correo");

    cell8 = newRow.insertCell(7);
    cell8.innerHTML = element.cargo;
    cell8.setAttribute("data-label", "Cargo");

    cell9 = newRow.insertCell(8);
    cell9.innerHTML = element.banco;
    cell9.setAttribute("data-label", "Banco");

    cell10 = newRow.insertCell(9);
    cell10.innerHTML = element.tipoDeCuenta;
    cell10.setAttribute("data-label", "Tipo de Cuenta");
    
    cell11 = newRow.insertCell(10);
    cell11.innerHTML = element.cuenta;
    cell11.setAttribute("data-label", "Numero de Cuenta");

    cell12 = newRow.insertCell(11);
    cell12.innerHTML = element.tipoDePago;
    cell12.setAttribute("data-label", "tipo De Pago");

    // console.log("fecha de inicio:" + element.fechaDeInicio);
    
    cell13 = newRow.insertCell(12);
    cell13.innerHTML = element.fechaDeInicio;
    cell13.setAttribute("data-label", "Fecha De Inicio");

    cell14 = newRow.insertCell(13);
    cell14.innerHTML = element.exequatur;
    cell14.setAttribute("data-label", "Exequatur");

    cell15 = newRow.insertCell(14);
    cell15.innerHTML = element.comentario;
    cell15.setAttribute("data-label", "Comentario");

    
    cell16 = newRow.insertCell(15);
    cell16.innerHTML = element.timestamp;
    cell16.setAttribute("data-label", "Timestamp");

}

function createForm(){

    fetchApiData();
    fetchPuestoData();
}

function resetForm() {

    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("ddCargo").value = "";
    document.getElementById("banco").value = "";
    document.getElementById("Corriente").selected = true;
    document.getElementById("cuenta").value = "";

    document.getElementById("tipoDePago").value = "";
    document.getElementById("fechaDeInicio").value = "";
    document.getElementById("exequatur").value = "";
    document.getElementById("comentario").value = "";

    document.getElementById("nombre").focus();

    document.getElementById("timestamp").value = "";
    
    // TODO: Check with Bob, why for the firs fetch after the update, 
    //       the API seems to return old value records.

    // var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    // table.innerHTML = "";

    // var node = document.getElementById("informe").getElementsByTagName('tbody')[0];
    //     while (node.hasChildNodes()) {
    //     node.removeChild(node.lastChild);
    // }

    // selectedRow = null;
}

function onEdit(td) {

    selectedRow = td.parentElement.parentElement;
    // [0] -> Acción

    document.getElementById("nombre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("apellido").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cedula").value = selectedRow.cells[3].innerHTML;
    document.getElementById("direccion").value = selectedRow.cells[4].innerHTML;
    document.getElementById("telefono").value = selectedRow.cells[5].innerHTML;
    document.getElementById("correo").value = selectedRow.cells[6].innerHTML;
    document.getElementById("banco").value = selectedRow.cells[8].innerHTML;

    var tipoDeCuenta = selectedRow.cells[9].innerHTML;

    if (tipoDeCuenta == "corriente") {
        document.getElementById("Corriente").checked = true;
    } else {
        document.getElementById("Ahorro").checked = true;
    }
        
    var objSelect = document.getElementById("ddCargo");
    utils.setSelectedValue(objSelect, selectedRow.cells[7].innerHTML);
    
    document.getElementById("cuenta").value = selectedRow.cells[10].innerHTML;
    document.getElementById("tipoDePago").value = selectedRow.cells[11].innerHTML;
    document.getElementById("fechaDeInicio").value = selectedRow.cells[12].innerHTML;
    document.getElementById("exequatur").value = selectedRow.cells[13].innerHTML;
    document.getElementById("comentario").value = selectedRow.cells[14].innerHTML;

    document.getElementById("timestamp").value = selectedRow.cells[15].innerHTML;

    document.getElementById("nombre").focus();

}

function updateResourceReportItem(formData) {

    // [0] -> Acción 
    selectedRow.cells[1].innerHTML = formData.nombre;
    selectedRow.cells[2].innerHTML = formData.apellido;
    selectedRow.cells[3].innerHTML = formData.cedula;
    selectedRow.cells[4].innerHTML = formData.direccion;
    selectedRow.cells[5].innerHTML = formData.telefono;
    selectedRow.cells[6].innerHTML = formData.correo;
    selectedRow.cells[7].innerHTML = formData.cargo;
    // selectedRow.cells[8].innerHTML = formData.mesCobertura;
    selectedRow.cells[8].innerHTML = formData.banco;
    selectedRow.cells[9].innerHTML = formData.tipoDeCuenta;
    selectedRow.cells[10].innerHTML = formData.cuenta;

    selectedRow.cells[11].innerHTML = formData.tipoDePago;
    selectedRow.cells[12].innerHTML = formData.fechaDeInicio;
    selectedRow.cells[13].innerHTML = formData.exequatur;
    selectedRow.cells[14].innerHTML = formData.comentario;
     
    selectedRow.cells[15].innerHTML = formData.timestamp;
}

function onDelete(td) {

    row = td.parentElement.parentElement;
    let timestamp = row.cells[15].innerHTML;

    if (confirm('Are you sure to delete this record ? -> ' + timestamp.toString())) {

        
        if (timestamp=="") alert("Unable to delete this record.")
        
        const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/resources/' + timestamp;
            
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

    utils.SetValidationError("nombre", "nombreValidationError");
    utils.SetValidationError("apellido", "apellidoValidationError");
    utils.SetValidationError("cedula", "cedulaValidationError");
    // utils.SetValidationError("direccion", "localidadValidationError");
    utils.SetValidationError("telefono", "telefonoValidationError");
    // utils.SetValidationError("correo", "diasCoberturaValidationError");
    // utils.SetValidationError("cargo", "cargoValidationError");
    // utils.SetValidationError("banco", "horaEntradaValidationError");
    // utils.SetValidationError("tipoDeCuenta", "horaSalidaValidationError");
    // utils.SetValidationError("cuenta", "horaAlmuerzoValidationError");
    utils.SetValidationError("fechaDeInicio", "fechaDeInicioValidationError");

    return isValid;
}

async function putApiData(){

    // Article Reference: https://stackabuse.com/using-fetch-to-send-http-requests-in-javascript/

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/resources';
    
    let data = {
        
        "timestamp": Number(formData.timestamp),
        "nombre": formData.nombre,
        "apellido": formData.apellido,
        "cedula": formData.cedula,
        "direccion": formData.direccion,
        "telefono": formData.telefono,
        "correo": formData.correo,
        "cargo": formData.cargo,
        "banco": formData.banco,
        "tipoDeCuenta": formData.tipoDeCuenta,
        "cuenta": formData.cuenta,
        "tipoDePago": formData.tipoDePago,
        "fechaDeInicio": formData.fechaDeInicio,
        "exequatur": formData.exequatur,
        "comentario": formData.comentario
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
}

function fetchApiData(){
    
    // Article Reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    utils.resetReportTable("informe");

    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/resources/all';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let resourceItems = data.Items;
    return resourceItems.map(function(item) {

        refreshResourceReportItem(item);

        })
    })
    .catch(function(error) {
        console.log(error);
    });
}

function fetchPuestoData(){
    
    const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/puestos/all';

    var ddCargos = document.getElementById("ddCargo")

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let puestoItems = data.Items;
    return puestoItems.map(function(item) {

        option = document.createElement('option');
        option.setAttribute('value', item.puesto);
        option.appendChild(document.createTextNode(item.puesto));
        ddCargos.appendChild(option);

        // console.log(item);

        })
    })
    .catch(function(error) {
    console.log(error);
    });
}

export { createForm };