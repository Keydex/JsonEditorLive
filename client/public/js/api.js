var serverPort = 4000;
var hostname = "http://" + $(location).attr('hostname') + ":" + serverPort;

function sendToServer(){
  var fileName = $("#filenameInput").val();
  var form = document.getElementById("serverForm");

  $.get(hostname, function(data, status){
    var filenameList = data;
    console.log(filenameList);
    for(i = 0; i<filenameList.length; ++i){
      if(fileName == filenameList[i] || fileName+".json" == filenameList[i]){
        if(confirm(fileName + ".json already exists. Are you sure you want to overwrite?") == true){
          $.post(hostname, {filename: $("#filenameInput").val(), jsonData: editor.getText()}, function(){
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
    $.post(hostname, {filename: $("#filenameInput").val(), jsonData: editor.getText()}, function(){
        console.log("sending" + $("#filenameInput").val());
        updateDropDown();
    });
    form.reset();
  });
}

function serverHost(val){
  $.post(hostname + "/api/request_" + val, {filename: $("#dropdownFiles :selected").text()}, function(data, status){
    console.log("sending " + $("#filenameInput").val() + ".json for Hosting");
    alert("Api is now being hosted at " + hostname + "/api/request_" + val)
  });
}

function loadFromServer(){
  console.log("The button has been pressed");
  console.log("Selected field is = " + $("#dropdownFiles :selected").text());
  $.post(hostname + "/load", {filename: $("#dropdownFiles :selected").text()}, function(data, status){
    console.log("sending " + $("#filenameInput").val() + ".json");
    editor.set($.parseJSON(data));
    editor.expandAll();
  });
}

function deleteFromServer(){
  $.post(hostname + "/delete", {filename: $("#dropdownFiles :selected").text()}, function(data, status){
    console.log("Deleting " + $("#filenameInput").val() + ".json");
    console.log("response");
});
}
