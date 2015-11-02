var api_key = '&APPID=0b44c82fe2726d3311d7a64b4c3d9ea5';

document.getElementById("get_wx").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();
    var rad_value = document.getElementsByName("input_type").valueOf;
    
    var payload = {k: null, v: null};
    if (rad_value == "text") {
        var val = document.getElementById("cs_entry").value;
        var payload = {k: "q", v: val};
    } else {
        var val = document.getElementById("zip_entry").value;
        var payload = {k: "zip", v: (val + ',us')};
    }
    req.open('POST', 'http://api.openweathermap.org/data/2.5/weather?' 
             + payload.k + '=' + payload.v 
             + api_key, true);
    //req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            
            
            for (var x in response) {
                if (typeof response[x] == "object") { //create a new row
                    console.log(x + " is an object");
                    
                    var newObjectRow = document.createElement("tr"); 
                    var newObjectRowKey = document.createElement("td");
                    var newObjectRowValue = document.createElement("td");
                    newObjectRowKey.innerHTML = x;
                    newObjectRow.appendChild(newObjectRowKey);
                    for (var y in response[x]) {
                        var newRow = document.createElement("tr");
                        var rowKey = document.createElement("td");
                        var rowVal = document.createElement("td");
                        console.log(y, response[x][y]);
                        rowKey.innerHTML = y;
                        rowVal.innerHTML = response[x][y];
                        newRow.appendChild(rowKey);
                        newRow.appendChild(rowVal);
                        newObjectRowValue.appendChild(newRow);
                    }
                    newObjectRow.appendChild(newObjectRowValue);
                    document.getElementById("output_table").appendChild(newObjectRow);
                } else {
                    console.log(x + " is not an object");
                    var newRow = document.createElement("tr");
                    var rowKey = document.createElement("td");
                    rowKey.innerHTML = x;
                    var rowVal = document.createElement("td");
                    rowVal.innerHTML = response[x];;
                    newRow.appendChild(rowKey);
                    newRow.appendChild(rowVal);
                    document.getElementById("output_table").appendChild(newRow);
                }
            }
        }
    });
    
    req.send(null);
    event.preventDefault();
})

