let accident_data_api = "http://127.0.0.1:5000/api/v1.0/accident"

let layered_circle = [];

d3.json(accident_data_api).then(function(data) {
    

        for (let i = 0; i < data.length; i++) {
            let dict = data[i]
            let coordinates = dict.coordinates
            

            let color_type = "";
            let color_reference = dict.DEG_urban_name
                if (color_reference == "LARGE_PROVINCIAL_CITIES") {
                    color_type = "red";
                }
                else if (color_reference == "MELB_URBAN") {
                    color_type = "blue";
                }
                else if (color_reference == "MELBOURNE_CBD") {
                    color_type = "green";
                }
                else if (color_reference == "SMALL_CITIES") {
                    color_type = "pink";
                }
                else if (color_reference == "SMALL_TOWNS") {
                    color_type = "orange";
                }
                else if (color_reference == "TOWNS") {
                    color_type = "black";
                }
                else if (color_reference == "RURAL_VICTORIA") {
                     color_type = "grey";
                }
                else {color_type = "white"}

            let circle = L.circle([coordinates[0],coordinates[1]], {
                color: color_type,
                fillOpacity: 0.5,
                radius: 10
            });
            circle.bindPopup("<h3><h3>Date: " +dict.date + "<h3><h3>Time: " + dict.time + "<h3><h3>Number of people killed: " + dict.no_persons_killed + "<h3><h3>Accident Type: " + dict.accident_type).addTo(myMap2);
            
        }
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap2);

});

let myMap2 = L.map("map2", {
    center: [-36.5870, 145.0100],
    zoom: 7
});

let mapStyle = {
    color: "black",
    fillColor: "pink",
    fillOpacity: 0.1,
    weight: 1
};

// Create an HTML element for the legend
var legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    var labels = ['Large provincial cities', 'Melb urban', 'Melbourne cbd', 'Small cities', 'Small towns', 'Towns', 'Rural victoria'];
    var colors = ['red', 'blue', 'green', 'pink', 'orange', 'black', 'grey'];

    // Add a white background to the legend
    div.style.backgroundColor = 'white';

    // Loop through the DEG_urban_names and create a label with color for each
    for (var i = 0; i < labels.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};

legend.addTo(myMap2); // Add the legend to the map