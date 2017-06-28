//Button Logic
$("#saveDocumentServer").click(function(){
    $.post("http://localhost:4000", {filename: $("#filenameInput").val(), jsonData: editor.getText()}, function(){
      console.log($("#filenameInput").val() + editor.getText());
      updateDropDown();
    });
});

var filenameList = [];

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
