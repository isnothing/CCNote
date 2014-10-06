var Data = null;

/**var socket = io.connect('localhost');
socket.on('result', function (data) {
    Data = data;
    socket.emit('showNote', {my : 'data'});
    draw();
});*/

var draw = function () {
    if (Data != null) {
        for (var i in Data) {
            console.log(Data[i].nid + ' ' + Data[i].name + ' ' + Data[i].content);
        }
    }
}

/* The switch function to show or hidden the note list.*/
$(document).ready(function() {
    console.log("run here.");
    $("#noteSwitch").click(function() {
        hideNoteList();        
    });
});

/* Show the note list.*/
var showNoteList = function() {
    $(".note-list").show();
}

/* Hidden the note list.*/
var hiddenNoteList = function() {
    $(".note-list").hide();
}

var addNoteItem = function (nid, name, content) {
    
}
