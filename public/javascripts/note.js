var Data = null;

var socket = io.connect('localhost');
socket.on('result', function (data) {
    Data = data;
    socket.emit('showNote', {my : 'data'});
    draw();
});

var draw = function () {
    if (Data != null) {
        for (var i in Data) {
            console.log(Data[i].nid + ' ' + Data[i].name + ' ' + Data[i].content);
        }
    }
}

var addNoteItem = function (nid, name, content) {
    
}
