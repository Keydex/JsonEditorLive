//Button Logic

var filenameList = [];
$("#saveDocumentServer").click(function(){

    $.post(hostname, {filename: $("#filenameInput").val(), jsonData: editor.get()}, function(){
      console.log($("#filenameInput").val() + editor.get());
      updateDropDown();
    });
});


$('#serverSend').on('click', function () {
  sendToServer();
})

$('#serverLoad').on('click', function () {
  loadFromServer();
})

$('#serverDelete').on('click', function () {
  var file = $("#dropdownFiles :selected").text();
  if(confirm("Are you sure you want to delete "+file+" from the server?") == true){
    deleteFromServer();
    updateDropDown();
  }
});

$(document).ready(function(){
  updateDropDown();
});

function updateDropDown(){
  var dropdown = $("#dropdownFiles");
  $("#dropdownFiles").empty();
  console.log("Getting File Names");
  $.get(hostname, function(data, status){
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

$("#filenameInput").keydown(function(event){
    if(event.keyCode == 13){
        sendToServer();
    }
});
