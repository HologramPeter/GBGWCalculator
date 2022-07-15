'use strict';

var localStorage = window.localStorage;

//***********************************//
var version = '1.0.0';
//***********************************//

function saveCookie() {
    try {
        var saveSlot = $('save').value;

        var now = new Date();
        var datestring = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes();
        var saveObj = {
            'version': version,
            'time': datestring,
            'gundam': gundam.serialize()
        };
        var saveData = JSON.stringify(saveObj);
    } catch (e) {
        alert('save failed');
        return;
    }

    localStorage.setItem(saveSlot, saveData);
    displaySaveTime();
}

function loadCookie() {
    var saveSlot = $('save').value;
    if (localStorage.hasOwnProperty(saveSlot)) {
        var value = JSON.parse(localStorage.getItem(saveSlot));
        load(value['gundam']);
    }
}

function copyCode() {
    $("saveLoadText").value = gundam.serialize();
    $("saveLoadText").select();
    $("saveLoadText").setSelectionRange(0, 99999);
    document.execCommand("copy");
    $("saveLoadText").value = "";
    alert("Copied to clipboard");
}

function loadText() {
    load($("saveLoadText").value);
    $("saveLoadText").value = "";
}

function displaySaveTime() {
    var saveSlot = $('save').value;
    if (localStorage.hasOwnProperty(saveSlot)) {
        if (saveSlot != '') {
            var value = JSON.parse(localStorage.getItem(saveSlot));
            if (value['time']) {
                $('lastSaveTime').innerHTML = "儲存時間：" + value['time'];
                return;
            }
        }
    }
    $('lastSaveTime').innerHTML = '-空白-';
}

function load(str) {
    gundam = new Gundam();
    gundam.unserialize(str);
    displayAll();
}

// function restoreByFile(){
//     const fileToLoad = $('file').files[0];
//     var fileReader = new FileReader();

//     fileReader.onload = function(fileLoadedEvent){
//         restore(fileLoadedEvent.target.result);
//     };

//     fileReader.readAsText(fileToLoad, "UTF-8");
// }


// function download() {
//     var filename = $("output").value;
//     if (filename === "") filename = "Gunpla";

//     var element = $("download");
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(serialize(gundam)));
//     element.setAttribute('download', filename);
//     element.click();
// }