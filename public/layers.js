var popupContent = '<form action="" > Park Name: <input placeholder="Park Name" type="text" name="parkname" maxlength="24" size="24"/> <br/><br/>Rating:<br/> Wifi available:<input type="checkbox" name="gender" value="Wifi"/><br/> Availability of shade:<input type="checkbox" name="shade" value="Shade"/><br/><br/> :<br/> Skatepark:<input type="checkbox" name="skatepark" value="Skatepark"/><br/> Camping:<input type="checkbox" name="food[]" value="Pizza"/><br/> Chicken:<input type="checkbox" name="food[]" value="Chicken"/><br/><br/> <textarea wrap="physical" cols="20" name="quote" rows="5" placeholder="message"></textarea><br/><br> Select a Level of Education:<br/> <select name="education"> <option value="Jr.High">Jr.High</option> <option value="HighSchool">HighSchool</option> <option value="College">College</option></select><br/><p><input type="submit" /></p></form><pre id="result"></pre>';



$.getJSON('/maplay',function(result){
    $.each(result, function(i, mlayer){
        // console.log("mlayer", mlayer);
        addLayer(mlayer);
        //populate layer with properties Data
   });
});

function addLayer(layer){
var leaf_layer;
// console.log(layer);
leaf_layer = L.geoJson(layer, {
      onEachFeature: function (feature, layer) {
// layer.bindPopup('<ul id="myList"><li id="name">'+feature.properties.name+'</li><li>Shade</li><li>Greenery</li></ul>'+'<button onClick="updatefields()">'+'update'+'</button>'+'<button>'+'save'+'</button>', {removable: true, editable: true} );
layer.bindPopup(popupContent);
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
 
    $('form').submit(function() {
  console.log("here");
  console.log(JSON.stringify($('form').serializeObject()));
        $('#result').text(JSON.stringify($('form').serializeObject()));
        return false;
    });

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

