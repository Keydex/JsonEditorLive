//Button Logic
$("#saveDocumentServer").click(function(){
    $.post("http://localhost:4000", {filename: $("#filenameInput").val(), jsonData: editor.getText()});
    console.log($("#filenameInput").val() + editor.getText());
    // console.log($("#filename").val);
});


console.log("Geing File Names");

$(document).ready(function()
{
  $.get("http://localhost:4000", function(data, status){
    var json = data;
  });
    $.getJSON(json,function(obj)
   {
         $.each(json.cars,function(key,value)
         {
             var option = $('<option />').val(value.carID).text(value.CarType);
        $("#dropDownDest").append(option);
         });

    });

    //if the selcted is volvo, then display the img
    $('#dropDownDest').on('change', function(){
        if($(this).val() == 'vol123r'){
            $('#imghide').removeClass('hide');
        }else{
            $('#imghide').addClass('hide');
        }

    });
});
