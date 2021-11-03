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
        layer.bindPopup('<h1>'+feature.properties.name+'</h1>'+'<button>'+'update'+'</button>'+'<button>'+'save'+'</button>' );
        layer.on({click: layerClickHandler, mouseover: mouseoverfunction});
      }
    });

//leaf_layer.bindPopup(layer.roperties.name);
//console.log(layer.properties.name);
//leaf_layer.bindPopup(template);
leaf_layer.addTo(map);
// value name does not exist until the popup is opened ie the layer is clicked 

}

// extend click on layer to showpopup function + add populating html template 
// on closing popup you may lose data, on reopning again the popup is not populated?? why does console log show data
//
function layerClickHandler (e) {
  console.log(e);
  var marker = e.target,
      properties = e.target.feature.properties;
  marker.openPopup();
//  if (marker.hasOwnProperty('_popup')) {
//   marker.unbindPopup();
//  marker.closePopup();
//  }
//  marker.bindPopup(template);
//  marker.openPopup();
//  L.DomUtil.get('value-name').textContent = properties.name;
}

function mouseoverfunction(){
}

