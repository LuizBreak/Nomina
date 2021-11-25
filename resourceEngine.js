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
    formData["tipoDePago"] = document.getElementById("tipoDePago").value;
    formData["fechaDeInicio"] = document.getElementById("fechaDeInicio").value;
    formData["exequatur"] = document.getElementById("exequatur").value;
    formData["comentario"] = document.getElementById("comentario").value;
    return formData;
}

function refresResourceReport(element) {
    
    // Responsive Table (Browser and Mobile)
    // Article Reference: https://www.youtube.com/watch?v=ZtopjfXhUZI

    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    

        var newRow = table.insertRow(table.length);

        cell1 = newRow.insertCell(0);
        cell1.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                            <a onClick="onDelete(this)">Delete</a>`;
        cell1.setAttribute("data-label", "Action");

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

        console.log("fecha de inicio:" + element.fechaDeInicio);
        
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
    document.getElementById("Corriente").selected = true;
    document.getElementById("cuenta").value = "";

    document.getElementById("tipoDePago").value = "";
    document.getElementById("fechaDeInicio").value = "";
    document.getElementById("exequatur").value = "";
    document.getElementById("comentario").value = "";

    document.getElementById("timestamp").value = "";
    
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    // [0] -> Action

    document.getElementById("nombre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("apellido").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cedula").value = selectedRow.cells[3].innerHTML;
    document.getElementById("direccion").value = selectedRow.cells[4].innerHTML;
    document.getElementById("telefono").value = selectedRow.cells[5].innerHTML;
    document.getElementById("email").value = selectedRow.cells[6].innerHTML;
    document.getElementById("banco").value = selectedRow.cells[8].innerHTML;

    var tipoDeCuenta = selectedRow.cells[9].innerHTML;

    if (tipoDeCuenta == "corriente") {
        document.getElementById("Corriente").checked = true;
    } else {
        document.getElementById("Ahorro").checked = true;
    }
        
    var objSelect = document.getElementById("ddCargo");
    setSelectedValue(objSelect, selectedRow.cells[7].innerHTML);
    
    document.getElementById("cuenta").value = selectedRow.cells[10].innerHTML;
    document.getElementById("tipoDePago").value = selectedRow.cells[11].innerHTML;
    document.getElementById("fechaDeInicio").value = selectedRow.cells[12].innerHTML;
    document.getElementById("exequatur").value = selectedRow.cells[13].innerHTML;
    document.getElementById("comentario").value = selectedRow.cells[14].innerHTML;

    document.getElementById("timestamp").value = selectedRow.cells[15].innerHTML;
}
function updateRecord(formData) {

    // [0] -> Action 
    selectedRow.cells[1].innerHTML = formData.nombre;
    selectedRow.cells[2].innerHTML = formData.apellido;
    selectedRow.cells[3].innerHTML = formData.cedula;
    selectedRow.cells[4].innerHTML = formData.direccion;
    selectedRow.cells[5].innerHTML = formData.email;
    selectedRow.cells[6].innerHTML = formData.cargo;
    selectedRow.cells[7].innerHTML = formData.mesCobertura;
    selectedRow.cells[8].innerHTML = formData.banco;
    selectedRow.cells[9].innerHTML = formData.tipoDeCuenta;
    selectedRow.cells[10].innerHTML = formData.cuenta;

    selectedRow.cells[11].innerHTML = formData.tipoDePago;
    selectedRow.cells[12].innerHTML = formData.fechaDeInicio;
    selectedRow.cells[13].innerHTML = formData.exequatur;
    selectedRow.cells[14].innerHTML = formData.comentario;
     
    selectedRow.cells[15].innerHTML = formData.timestamp;
    // selectedRow.cells[10].innerHTML = formData.timestemp;
}

function onDelete(td) {

    row = td.parentElement.parentElement;
    let timestamp = row.cells[15].innerHTML;

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

    SetValidationError("nombre", "nombreValidationError");
    // SetValidationError("apellido", "apellidoValidationError");
    SetValidationError("cedula", "cedulaValidationError");
    // SetValidationError("direccion", "localidadValidationError");
    // SetValidationError("telefono", "telefonoValidationError");
    // SetValidationError("correo", "diasCoberturaValidationError");
    // SetValidationError("cargo", "cargoValidationError");
    // SetValidationError("banco", "horaEntradaValidationError");
    // SetValidationError("tipoDeCuenta", "horaSalidaValidationError");
    // SetValidationError("cuenta", "horaAlmuerzoValidationError");
    SetValidationError("fechaDeInicio", "fechaDeInicioValidationError");


    return isValid;
}

function SetValidationError(FieldName, ErrorlabelName) {

        console.log(FieldName + " - " + document.getElementById(FieldName).value)

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
        "supervisor": formData.supervisor,
        "tipoDePago": formData.tipoDePago,
        "fechaDeInicio": formData.fechaDeInicio,
        "exequatur": formData.exequatur,
        "comentario": formData.comentario
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
// function PrintNames(nombre){

//     //	document.write(nombreCompleto + "<br><br>") 
    
//         let nombres = nombre.split(" ")
    
    
//          for (let i=0; i<nombres.length; i++){
    
//         	document.write(i + "->" + nombres[i] + "<br><br>")  
           
//            var encontre = false;
           
//             for (let j=0; j<informe.length; j++){
                
     
//                 if(nombres[i] == informe[j][0]) {
//                     encontre = true;
//                    informe[j][1]++;
                   
//                    return;
//                 }
//             }
//             if(encontre == false) informe.push([nombres[i],1]);
//         }
//     }
    
