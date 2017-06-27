//Button Logic
$("#saveDocumentServer").click(function(){
    $.get("http://localhost:4000", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
    console.log("test");
});

$(document).ready(function()
{
    $.getJSON("/echo/json/",function(obj)
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
