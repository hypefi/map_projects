var map = L.map("mapid", { drawControl: true }).setView(
  [33.9715904, -6.8498129],
  13
);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);



setTimeout(function () {
  window.dispatchEvent(new Event("resize"));
}, 100);

// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var drawPluginOptions = {
  position: "topright",
  draw: {
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: "#e1e100", // Color the shape will turn when intersects
        message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
      },
      shapeOptions: {
        color: "#97009c",
      },
    },
    // disable toolbar item by setting it to false
    polyline: false,
    circle: false, // Turns off this drawing tool
    rectangle: false,
    marker: false,
  },
  edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: false,
  },
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

map.on("draw:created", function (e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === "marker") {
    layer.bindPopup("A popup!");
  }


  editableLayers.addLayer(layer);

var shapes = getShapes(editableLayers);

//console.log(shapes);

  var geoshap = editableLayers.toGeoJSON()
  var shape_for_db = JSON.stringify(geoshap);

//here send to db
console.log(shape_for_db);


});

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);

//getshapes function 
//


var getShapes = function(drawnItems) {

    var shapes = [];

    drawnItems.eachLayer(function(layer) {

        // Note: Rectangle extends Polygon. Polygon extends Polyline.
        // Therefore, all of them are instances of Polyline
        if (layer instanceof L.Polyline) {
            shapes.push(layer.getLatLngs())
        }

        if (layer instanceof L.Circle) {
            shapes.push([layer.getLatLng()])
        }

        if (layer instanceof L.Marker) {
            shapes.push([layer.getLatLng()]);
        }

    });

    return shapes;
};

//
//functions to handle map data and mouseover 
//

function handleFeature(feature, layer) {
   layer.on({
                mouseover: mouseoverfunction,
                mouseout: mouseoutfunction
            });
   L.marker(layer.getBounds().getCenter())
    .bindTooltip(feature.properties['where'], { noHide: true })
    .addTo(map);
}

function mouseoverfunction(e) {
    var properties = e.target.feature.properties;
    for (var prop in properties) {
       if (properties.hasOwnProperty(prop)) {
       // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
         console.log("prop: " + prop + " value: " + properties[prop]);
            document.getElementById("properties").innerHTML = document.getElementById("properties").innerHTML + "<tr><td>" + prop + "</td><td>" + properties[prop] + "</td></tr>";
       }
    }
}

function mouseoutfunction(e) {
     document.getElementById("properties").innerHTML = "";
}



function getData() {
return {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
        "properties": { "id": "1", "where": "north" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1.3842773437499998,
              50.91688748924508
            ],
            [
              0.24169921874999997,
              50.10648772767335
            ],
            [
              0.263671875,
              49.1242192485914
            ],
            [
              1.9775390625,
              48.850258199721495
            ],
            [
              3.80126953125,
              48.73445537176822
            ],
            [
              4.7021484375,
              49.396675075193976
            ],
            [
              5.3173828125,
              50.17689812200105
            ],
            [
              3.6254882812499996,
              50.94458443495011
            ],
            [
              1.3842773437499998,
              50.91688748924508
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
        "properties": {  "id": "2", "where": "west" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -2.83447265625,
              49.28214015975995
            ],
            [
              -0.98876953125,
              47.56170075451973
            ],
            [
              -2.021484375,
              46.40756396630067
            ],
            [
              -3.9111328125000004,
              46.10370875598026
            ],
            [
              -5.053710937499999,
              46.76996843356982
            ],
            [
              -5.778808593749999,
              47.945786463687185
            ],
            [
              -5.44921875,
              48.8936153614802
            ],
            [
              -2.83447265625,
              49.28214015975995
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
        "properties": {  "id": "3", "where": "south" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -1.9335937499999998,
              45.521743896993634
            ],
            [
              -0.3515625,
              45.98169518512228
            ],
            [
              1.9116210937499998,
              46.042735653846506
            ],
            [
              3.1201171874999996,
              45.35214524585177
            ],
            [
              3.4716796874999996,
              43.61221676817573
            ],
            [
              3.6474609374999996,
              42.69858589169842
            ],
            [
              2.08740234375,
              41.55792157780418
            ],
            [
              -0.439453125,
              41.983994270935625
            ],
            [
              -1.9775390625,
              42.58544425738491
            ],
            [
              -2.83447265625,
              43.8186748554532
            ],
            [
              -1.9335937499999998,
              45.521743896993634
            ]
          ]
        ]
      }
    }
  ]
};
}

L.geoJson(getData(), {
    onEachFeature: handleFeature
    }
).addTo(map);
