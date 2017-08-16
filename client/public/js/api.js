function sendToServer(){
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
}

function loadFromServer(){
  console.log("The button has been pressed");
  console.log("Selected field is = " + $("#dropdownFiles :selected").text());
  $.post("http://localhost:4000/load", {filename: $("#dropdownFiles :selected").text()}, function(data, status){
    console.log("sending " + $("#filenameInput").val() + ".json");
    editor.set($.parseJSON(data));
    editor.expandAll();
  });
}

function deleteFromServer(){
  $.post("http://localhost:4000/delete", {filename: $("#dropdownFiles :selected").text()}, function(data, status){
    console.log("Deleting " + $("#filenameInput").val() + ".json");
    console.log("response");
});
}
