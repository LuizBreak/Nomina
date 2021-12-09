export function fixUndefinedValues (item){

    if ( typeof item  == 'undefined'){
        return "";
    } else {
        return item;
    }
}

export function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text== valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}
export function SetValidationError(FieldName, ErrorlabelName) {

    // console.log(FieldName + " - " + document.getElementById(FieldName).value)

    if (document.getElementById(FieldName).value == "") {
        isValid = false;
        document.getElementById(ErrorlabelName).classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById(ErrorlabelName).classList.contains("hide"))
            document.getElementById(ErrorlabelName).classList.add("hide");
    }
}

export function resetReportTable(tableName){
    var table = document.getElementById(tableName).getElementsByTagName('tbody')[0];
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
}
