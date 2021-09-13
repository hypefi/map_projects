// Pop up template 

var template = '<form id="popup-form">\
  <label for="input-speed">New speed:</label>\
  <input id="input-speed" class="popup-input" type="number" />\
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




$.getJSON('/maplay',function(result){
    $.each(result, function(i, mlayer){
        console.log("mlayer", mlayer);
            
        addLayer(mlayer);
        //populate layer with properties Data
   });
});


function addLayer(layer){
var leaf_layer;
console.log(layer);
leaf_layer = L.geoJson(layer);

//leaf_layer.bindPopup(layer.properties.name);
console.log(layer.properties.name);
leaf_layer.bindPopup(template);
leaf_layer.addTo(map);
// value name does not exist until the popup is opened ie the layer is clicked 
console.log(L.DomUtil.get('value-name'));
console.log(L.DomUtil.get('value-name'));
//leaf_layer.DomUtil.get('value-shade').textContent = layer.properties.shade;
//leaf_layer.DomUtil.get('value-name').textContent = layer.properties.name;

}


// extend click on layer to showpopup function + add populating html template 



/*
        function addLayer(layer, name) {
            var leaf_layer;
            if (layer.type == "MultiPoint") {
                leaf_layer = L.geoJson(layer, { pointToLayer: function (feature, latlng) {return L.circleMarker(latlng, layer.style); }})
                leaf_layer.bindPopup(layer.type);
            } else if (layer.type == "MultiLineString") {
                leaf_layer = L.geoJson(layer, {style: layer.style });
                leaf_layer.bindPopup(layer.type);
            } else  {
                leaf_layer = L.geoJson(layer, {
                    style: function(feature) {
                        switch (feature.properties.style) {
                        case 'Orange': return {color: "#ff0000"};
                        case 'Blue': return {color: "#0000ff"};
                    }
                    },
                    onEachFeature: function (feature, layer) {
                         layer.bindPopup(feature.properties.name);
                     }
                 });
            }
            leaf_layer.addTo(map);

            $('#' + name).click(function(e) {

                if (map.hasLayer(leaf_layer)) {
                    map.removeLayer(leaf_layer);
                } else {
                    map.addLayer(leaf_layer);
                }
            });
        }
        */
