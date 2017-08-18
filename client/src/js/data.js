var json = {}
;

  var container = document.getElementById('jsoneditor');
  var container2 = document.getElementById('jsoneditor2');

  var options = {
    mode: 'tree',
    modes: ['code', 'tree'], // allowed modes
    onError: function (err) {
      alert(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
      console.log('Mode switched from', oldMode, 'to', newMode);
      if(newMode == 'tree'){
        editor.expandAll();
      }
    }
  };


  var editor = new JSONEditor(container, options, json);
  editor.expandAll();


  // Load a JSON document
  FileReaderJS.setupInput(document.getElementById('loadDocument'), {
    readAsDefault: 'Text',
    on: {
      load: function (event, file) {
        editor.setText(event.target.result);
      }
    }
  });

  // Save a JSON document
  document.getElementById('saveDocument').onclick = function () {
    // Save Dialog
    fname = window.prompt("Save as...");

    // Check json extension in file name
    if(fname.indexOf(".")==-1){
      fname = fname + ".json";
    }else{
      if(fname.split('.').pop().toLowerCase() == "json"){
        // Nothing to do
      }else{
        fname = fname.split('.')[0] + ".json";
      }
    }
    var blob = new Blob([editor.getText()], {type: 'application/json;charset=utf-8'});
    saveAs(blob, fname);
  };
