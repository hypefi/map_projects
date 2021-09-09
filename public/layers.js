/*     var map = L.map('map').setView([#{lat},#{lng}], 14);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);*/

        $.getJSON('/maplay',function(result){
            $.each(result, function(i, mlayer){
                  console.log("mlayer", mlayer);
                  if(mlayer.geometry == 'undefined'){
                  return 
                  }else{
                  
                  console.log($.getJSON('/mapjson/' + mlayer.geometry.type, function(data) { addLayer(data, mlayer.geometry.type ) }));
                  $.getJSON('/mapjson/' + mlayer.geometry.type, function(data) { addLayer(data, mlayer.geometry.type ) });
           }});
        });



function addLayer(layer, name){
var leaf_layer;
leaf_layer = L.geoJson(layer);
leaf_layer.addTo(map);
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
