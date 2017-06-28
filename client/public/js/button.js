//Button Logic
$("#saveDocumentServer").click(function(){
    $.post("http://localhost:4000", {filename: $("#filenameInput").val(), jsonData: editor.getText()});
    console.log($("#filenameInput").val() + editor.getText());
    // console.log($("#filename").val);
});

var filenameList = [];

$(document).ready(function()
{
  var dropdown = $("#dropdownFiles")
  console.log("Geing File Names");
  $.get("http://localhost:4000", function(data, status){
    var filenameList = data;
    console.log(filenameList);
    $.each(filenameList, function(filenameList) {
        dropdown.append($("<option />").val(this).text(this));
        console.log("Attempting to write");
    });
  });
});
