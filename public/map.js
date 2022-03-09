var map = L.map("mapid", { drawControl: true }).setView(
  [33.9715904, -6.8498129],
  13
);


var template =
  '<form id="popup-form">\
  <table class="popup-table">\
    <tr class="popup-table-row">\
      <th class="popup-table-header">Park name:</th>\
      <td id="value-name" class="popup-table-data"></td>\
    </tr>\
    <tr class="popup-table-row">\
      <th class="popup-table-header">Shade available:</th>\
      <td id="value-shade" class="popup-table-data"></td>\
    </tr>\
  </table>\
  <button id="button-submit" type="button">Save Changes</button>\
</form>';

////////
////////

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHlwZWZpIiwiYSI6ImNsMGphOGgwNDAwMHgzZG9jZ3hwOTA3ZXkifQ.UII9N7yhDk2g9i4EjBGSTQ",
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
  position: "topleft",
  draw: {
    polygon: {
      allowIntersection: true, // Restricts shapes to simple polygons
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
// uncomment to add toolbar of drawpluginoptions
// var drawControl = new L.Control.Draw(drawPluginOptions);
// map.addControl(drawControl);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

map.on("draw:created", function (e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === "marker") {
    layer.bindPopup("A popup!");
  }
  //layer.bindPopup(template);

  editableLayers.addLayer(layer);


  //console.log(shapes);

  var geoshap = layer.toGeoJSON();
  var shape_for_db = JSON.stringify(geoshap);

  //here send to db
  console.log(shape_for_db);

  var request = new XMLHttpRequest();
  var path = "http://localhost:3003/geojson"; // enter your server ip and port number
  request.open("POST", path, true); // true = asynchronous
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  //var text= '{"member_nm":"' + txtName.value + '","member_type":"' + txtMembershipType.value + '"}';
  var text = shape_for_db;
  request.send(text);

  location.reload(); //reload in order to have ability to show pop up on new created layer may be done in another way
});

var popup = L.popup();

function onMapClick(e) {
  if ($(e.originalEvent.path[0]).attr('id') == 'mapid') map.closePopup();
  /* popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);*/
}

map.on("click", onMapClick);

//getshapes function
//

