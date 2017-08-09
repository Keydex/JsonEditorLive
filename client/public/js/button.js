//Button Logic
var filenameList = [];
$("#saveDocumentServer").click(function(){

    $.post("http://localhost:4000", {filename: $("#filenameInput").val(), jsonData: editor.get()}, function(){
      console.log($("#filenameInput").val() + editor.get());
      updateDropDown();
    });
});


$('#serverSend').on('click', function () {
    var fileName = $("#filenameInput").val();
    var form = document.getElementById("serverForm");

    $.get("http://localhost:4000", function(data, status){
      var filenameList = data;
      console.log(filenameList);
      for(i = 0; i<filenameList.length; ++i){
        if(fileName == filenameList[i] || fileName+".json" == filenameList[i]){
          if(confirm(fileName + ".json already exists. Are you sure you want to overwrite?") == true){
            $.post("http://localhost:4000", {filename: $("#filenameInput").val(), jsonData: editor.getText()}, function(){
              console.log("sending" + $("#filenameInput").val());
              updateDropDown();
            });
            form.reset();
            return;
          }else{
            //cancel writing the file... exit 
            return;
          }
        }
      }//end for loop
      $.post("http://localhost:4000", {filename: $("#filenameInput").val(), jsonData: editor.getText()}, function(){
          console.log("sending" + $("#filenameInput").val());
          updateDropDown();
      });
      form.reset();
    });
})

var testobj = [{"field 1":123,"field 2":3,"field 3":1},
{"field 1":23,"field 2":12,"field 3":2},
{"field 1":3123,"field 2":123,"field 3":123}];

$('#serverLoad').on('click', function () {
   console.log("The button has been pressed");
   console.log("Selected field is = " + $("#dropdownFiles :selected").text());
   $.post("http://localhost:4000/load", {filename: $("#dropdownFiles :selected").text()}, function(data, status){
     console.log("sending " + $("#filenameInput").val() + ".json");
     editor.set($.parseJSON(data));
     editor.expandAll();
   });
})

$('#serverDelete').on('click', function () {
  var file = $("#dropdownFiles :selected").text();
  if(confirm("Are you sure you want to delete "+file+" from the server?") == true){
    $.post("http://localhost:4000/delete", {filename: $("#dropdownFiles :selected").text()}, function(data, status){
      console.log("Deleting " + $("#filenameInput").val() + ".json");
      console.log("response");
    });
    updateDropDown();
    alert(file+" was deleted from the server.");
  } else {
    console.log("User cancelled deletion.");
    alert(file+" was not deleted!");
  }

});

$(document).ready(function(){
  updateDropDown();
});

function updateDropDown(){
  var dropdown = $("#dropdownFiles");
  $("#dropdownFiles").empty();
  console.log("Getting File Names");
  $.get("http://localhost:4000", function(data, status){
    var filenameList = data;
    console.log(filenameList);
    $.each(filenameList, function(filenameList) {
        dropdown.append($("<option />").val(this).text(this));
        console.log("Attempting to write");
    });
  });
}

$('.nav a').on('click', function(){
    $('.btn-navbar').click(); //bootstrap 2.x
    $('.navbar-toggle').click() //bootstrap 3.x by Richard
});
