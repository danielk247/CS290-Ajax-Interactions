var api_key = '&APPID=0b44c82fe2726d3311d7a64b4c3d9ea5';

document.addEventListener('DOMContentLoaded', setupButton);

function setupButton() {
    document.getElementById("get_wx").addEventListener("click", function(event) {
        var req = new XMLHttpRequest();
        var rad_value = document.getElementById('c').checked;
        
        var payload = {k: null, v: null};
        if (rad_value == true) {
            var val = document.getElementById("cs_entry").value;
            var payload = {k: "q", v: val};
        } else {
            var val = document.getElementById("zip_entry").value;
            var payload = {k: "zip", v: (val + ',us')};
        }
        
        req.open('POST', 'http://api.openweathermap.org/data/2.5/weather?' 
                 + payload.k + '=' + payload.v 
                 + api_key, true);

        var startingNode = document.getElementById("output_table");
        
        //Resetting output table for next batch of info
        while (startingNode.firstChild) {
            startingNode.removeChild(startingNode.firstChild);
        }

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(response);
                fillTable(startingNode, response);
            }
        });

        req.send(null);
        event.preventDefault();
    })
}


function initElement(elementType, cName, contents) {
    var x = document.createElement(elementType);
    x.className = cName;
    if (contents != null) {x.innerHTML = contents;}
    return x;
}


function fillTable(node, obj) {
    for (var x in obj) {
        if (typeof obj[x] == "object") { 
            console.log(x + "'s value is an object!");
            console.log("calling recursion on " + x);
            
            var newRow = initElement("div", "row", null);
            var rowKey = initElement("div", "cell obj", x);
            var rowVal = initElement("div", "cell obj", null);
            fillTable(rowVal, obj[x]);
            newRow.appendChild(rowKey);
            newRow.appendChild(rowVal);
            node.appendChild(newRow);
            console.log("recursion finished on " + x);
        } else {
            console.log(x + " is not an object");
            var newRow = initElement("div", "row", null);
            var rowKey = initElement("div", "cell key", x);
            var rowVal = initElement("div", "cell value", obj[x]);
            newRow.appendChild(rowKey);
            newRow.appendChild(rowVal);
            node.appendChild(newRow);
        }
    }
}
