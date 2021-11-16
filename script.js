var selectedRow = null


function onFormSubmit() {

    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            fetchApiData2()
            //insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["nombre"] = document.getElementById("nombre").value;
    formData["cedula"] = document.getElementById("cedula").value;
    formData["concepto"] = document.getElementById("concepto").value;
    formData["localidad"] = document.getElementById("localidad").value;
    formData["personaCubierta"] = document.getElementById("personaCubierta").value;
    formData["fecha"] = document.getElementById("fecha").value;
    formData["horas"] = document.getElementById("horas").value;
    formData["evidencia"] = document.getElementById("evidencia").value;
    formData["supervisora"] = document.getElementById("supervisora").value; 
    return formData;
}

function insertNewRecord(element) {
    
    var table = document.getElementById("informe").getElementsByTagName('tbody')[0];
    

        var newRow = table.insertRow(table.length);

        cell1 = newRow.insertCell(0);
        cell1.innerHTML = element.fromUser;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = element.transactionDate;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = element.transactionType;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = element.locationName;
        cell4 = newRow.insertCell(4);
        cell4.innerHTML = element.amount;
        cell5 = newRow.insertCell(5);
        cell5.innerHTML = element.amount;
        cell6 = newRow.insertCell(6);
        cell6.innerHTML = element.amount;
        cell7 = newRow.insertCell(7);
        cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a onClick="onDelete(this)">Delete</a>`;

}

function resetForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("concepto").value = "";
    document.getElementById("localidad").value = "";
    document.getElementById("personaCubierta").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("horas").value = "";
    document.getElementById("evidencia").value = "";
    document.getElementById("supervisora").value = "";

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nombre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("cedula").value = selectedRow.cells[1].innerHTML;
    document.getElementById("concepto").value = selectedRow.cells[2].innerHTML;
    document.getElementById("localidad").value = selectedRow.cells[3].innerHTML;
    document.getElementById("personaCubierta").value = selectedRow.cells[4].innerHTML;
    document.getElementById("fecha").value = selectedRow.cells[5].innerHTML;
    document.getElementById("horas").value = selectedRow.cells[6].innerHTML;
    document.getElementById("evidencia").value = selectedRow.cells[7].innerHTML;
    document.getElementById("supervisora").value = selectedRow.cells[8].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nombre;
    selectedRow.cells[1].innerHTML = formData.cedula;
    selectedRow.cells[2].innerHTML = formData.Concepto;
    selectedRow.cells[3].innerHTML = formData.Localidad;
    selectedRow.cells[4].innerHTML = formData.nombre;
    selectedRow.cells[5].innerHTML = formData.cedula;
    selectedRow.cells[6].innerHTML = formData.Concepto;
    selectedRow.cells[7].innerHTML = formData.Localidad;
    selectedRow.cells[8].innerHTML = formData.Localidad;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("nombre").value == "") {
        isValid = false;
        document.getElementById("nombreValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nombreValidationError").classList.contains("hide"))
            document.getElementById("nombreValidationError").classList.add("hide");
    }
    return isValid;
}

function fetchApiData2(){
    
    // Article Reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    const url = 'https://d51wibckd0.execute-api.us-east-1.amazonaws.com/dev/items';
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

