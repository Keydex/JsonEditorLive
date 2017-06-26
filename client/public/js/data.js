var json = {
  "ns0:Envelope": {
    "xmlns:ns0": "http://www.ual.com/eai/ops/uflifo",
    "ns0:Header": {
      "ns1:eventHeader": {
        "xmlns:ns1": "http://www.ual.com/eai/ops/uflifo/event/header",
        "eventID": "BE-FLIFO1489005934532",
        "eventName": "GATE",
        "eventCreationSystem": "BE-FLIFO",
        "eventCreationTime": "2017-03-08T20:45:34.532Z",
        "version": "1.0.0"
      }
    },
    "ns0:Body": {
      "FlightLeg": {
        "ns0:ScheduledFlightLeg": {
          "airlineIataCd": "UA",
          "schedFltNbr": "1",
          "schedLegLclDepDate": "2017-03-08",
          "schedLegDepArptIATACd": "SFO",
          "schedLegArrArptIATACd": "SIN",
          "schedLegLclDepDtTm": "2017-03-08T22:20:00-08:00",
          "schedLegGMTDepDtTm": "2017-03-09T06:20:00Z",
          "fltTypeCd": "PS",
          "schedLegLclArrDtTm": "2017-03-10T07:45:00+08:00",
          "schedLegGMTArrDtTm": "2017-03-09T23:45:00Z",
          "schedTaxiInMin": "7",
          "schedTaxiOutMin": "23",
          "starFltInd": "0",
          "fltNoOpsInd": "0",
          "priorityFltInd": "0",
          "intlInd": "0",
          "schedLegNbr": "1"
        },
        "ns0:OperationsFlightLeg": {
          "opsLegDepArptIATACd": "SFO",
          "opsLegArrArptIATACd": "SIN",
          "opsLegDepOccurNbr": "0",
          "lclEstDepDtTm": "2017-03-08T22:20:00-08:00",
          "gmtEstDepDtTm": "2017-03-09T06:20:00Z",
          "lclEstArrDtTm": "2017-03-10T07:45:00+08:00",
          "gmtEstArrDtTm": "2017-03-09T23:45:00Z",
          "depGateNbr": "   96",
          "fltLegActvInd": "1",
          "fltDepXstpInd": "0",
          "fltDepNstpInd": "0",
          "fltDepDvrtInd": "0",
          "fltDepOnlDvrtInd": "0",
          "fltDepRtblInd": "0",
          "fltDepRtflInd": "0",
          "fltArrXstpInd": "0",
          "fltArrNstpInd": "0",
          "fltArrDvrtInd": "0",
          "fltArrOnlDvrtInd": "0",
          "fltArrRtblInd": "0",
          "fltArrRtflInd": "0",
          "fltOutInd": "0",
          "fltOffInd": "0",
          "fltOnInd": "0",
          "fltInInd": "0",
          "fltCnclInd": "0",
          "fltDcsnInd": "0",
          "fltDlsnInd": "0",
          "fltMishapInd": "0",
          "fuelLoadInd": "0",
          "fltNoOpsInd": "0",
          "EqpCd": "78Z ",
          "TailNbr": "N26952",
          "noseNbr": "3952",
          "custDepGateNbr": "   96",
          "boardingTime": "21:30:00",
          "custDepGate": "   96",
          "ns1:Equip": {
            "xmlns:ns1": "http://www.ual.com/eai/ops/uflifo/opsFltLeg",
            "cabin1Cnt": "48",
            "cabin2Cnt": "0",
            "cabin3Cnt": "204",
            "cabin4Cnt": "0",
            "wideBdyInd": "1",
            "eqpDesc": "Boeing 787-9"
          },
          "ns1:OperationsFlightLoad": {
            "xmlns:ns1": "http://www.ual.com/eai/ops/uflifo/opsFltLeg",
            "clrFuelWt": "0",
            "zeroFuelWt": "0",
            "firstPsgrCnt": "46",
            "busPsgrCnt": "0",
            "coachPsgrCnt": "147"
          },
          "ns1:CustRefData": {
            "xmlns:ns1": "http://www.ual.com/eai/ops/uflifo/opsFltLeg",
            "ns2:custStatusInfo": {
              "xmlns:ns2": "http://www.ual.com/eai/ops/uflifo/common",
              "displayInd": "true",
              "reasonType": "ONT",
              "ns2:FltLegStatus": [
                {
                  "ns2:code": "OT",
                  "ns2:description": "On Time",
                  "ns2:statusType": "DepartureStatus"
                },
                {
                  "ns2:code": "OT",
                  "ns2:description": "On Time",
                  "ns2:statusType": "ArrivalStatus"
                },
                {
                  "ns2:code": "NDPT",
                  "ns2:description": "Not Departed",
                  "ns2:statusType": "LegStatus"
                }
              ]
            },
            "ns2:delayCodes": { "xmlns:ns2": "http://www.ual.com/eai/ops/uflifo/common" }
          }
        }
      }
    }
  }
}
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
