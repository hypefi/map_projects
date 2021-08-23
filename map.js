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

console.log(shapes);

  var geoshap = shapes.toGeoJSON()
  var shape_for_db = JSON.stringify(geoshap);

//here send to db



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

