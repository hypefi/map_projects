

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
leaf_layer = L.geoJson(layer, {
      onEachFeature: function (feature, layer) {
        layer.on('click', layerClickHandler);
      }
    });

//leaf_layer.bindPopup(layer.roperties.name);
//console.log(layer.properties.name);

//leaf_layer.bindPopup(template);
leaf_layer.addTo(map);
// value name does not exist until the popup is opened ie the layer is clicked 

}

// extend click on layer to showpopup function + add populating html template 
function layerClickHandler (e) {

  var marker = e.target,
      properties = e.target.feature.properties;

  console.log("marker", marker);
  if (marker.hasOwnProperty('_popup')) {
    marker.unbindPopup();
    console.log("yes")
  }

  marker.bindPopup(template);
  marker.openPopup();
  console.log(L.DomUtil.get('value-name'));
  console.log(properties.name);
  L.DomUtil.get('value-name').textContent = properties.name;
 // L.DomUtil.get('value-shade').textContent = properties.shade;

}





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
