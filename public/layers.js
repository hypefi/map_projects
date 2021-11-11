var popupContent = '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+
          '<div class="form-group">'+
              '<label class="control-label col-sm-5"><strong>Date: </strong></label>'+
              '<input type="date" placeholder="Required" id="date" name="date" class="form-control"/>'+ 
          '</div>'+
          '<div class="form-group">'+
              '<label class="control-label col-sm-5"><strong>Gender: </strong></label>'+
              '<select class="form-control" id="gender" name="gender">'+
                '<option value="Male">Male</option>'+
                '<option value="Female">Female</option>'+
                '<option value="Other">Other</option>'+
              '</select>'+ 
          '</div>'+
          '<div class="form-group">'+
              '<label class="control-label col-sm-5"><strong>Age: </strong></label>'+
              '<input type="number" min="0" class="form-control" id="age" name="age">'+ 
          '</div>'+
          '<div class="form-group">'+
              '<label class="control-label col-sm-5"><strong>Description: </strong></label>'+
              '<textarea class="form-control" rows="6" id="descrip" name="descript">...</textarea>'+
          '</div>'+
          '<input style="display: none;" type="text" id="lat" name="lat" value="'+'" />'+
          '<input style="display: none;" type="text" id="lng" name="lng" value="'+'" />'+
          '<div class="form-group">'+
            '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn">Cancel</button></div>'+
            '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'+
          '</div>'+
          '</form>';



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
// layer.bindPopup('<ul id="myList"><li id="name">'+feature.properties.name+'</li><li>Shade</li><li>Greenery</li></ul>'+'<button onClick="updatefields()">'+'update'+'</button>'+'<button>'+'save'+'</button>', {removable: true, editable: true} );

 layer.bindPopup(popupContent,  {removable: true, editable: true} );
        layer.on({click: layerClickHandler, mouseover: mouseoverfunction});
      }
    });

  //leaf/_layer.bindPopup(layer.roperties.name);
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

// function to update fields in the layer pop up after clicking update button 
function updatefields(properties) {
// Create a new text node called "Input field with our value"
var input = document.createElement("input");
input.type = "my value";
input.value = properties.name;
  //input.className = "css-class-name"; // set the CSS class
  //container.appendChild(input);

// Get the child node of an <ul> element
var item = document.getElementById("myList").childNodes[0];

// Replace the first child node of <ul> with the newly created text node
item.replaceChild(input, item.childNodes[0]);

}

