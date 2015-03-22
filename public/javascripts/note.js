/* Define a socket communicating with server. */
var socket = io('http://localhost:3000');

var editor = new Editor();
editor.render();

/* The basic CRUD option of the note. */
var addNote = function (username, title, content) {
    if (title == null || title.length == 0) {
        return;
    }
    socket.emit('add', {'username' : username, 'title': title, 'content': content});
    socket.on('add-finished', function (data) {
        console.log(data);
        if (data.result == 'success') {
           addRemind();
        }
    });
}

var deleteNote = function (nid) {
    socket.emit('delete', {'nid': nid});
    socket.on('delete-successful', function (data) {
        alert("删除成功!");
        window.location.reload();
    });
}

var updateNote = function (nid, title, content) {
    socket.emit('update', {'nid': nid, 'title': title, 'content': content});
}

var showNote = function (nid) {
    socket.emit('show',{'nid': nid});
    socket.on('show-successful', function (data) {
        var note = data.note;
        console.log(note.nid + note.title + note.content);
        $("#note-id").val(note.nid);
        $("#note-title").val(note.title);
        editor.codemirror.setValue(note.content);
    });
}

/* util function */
var addRemind = function () {
    $(".note-list").show();
    $("#content").css('opacity', '0.2');
}

/* UE */
$(document).ready(function() {
    var swi = 0;
    $("#list-button").click(function() {
        if (swi == 0) {
            $(".note-list").hide();
            $("#content").animate({right:'120px'});
            $("#content").css('opacity', '1');
            swi = 1;
        } else {
            $(".note-list").show();
            swi = 0;
            $("#content").css('opacity', '0.2');
        }
    });

    $("#new-button").click(function() {
        $(".note-list").hide();
        swi = 1;
        $("#content").animate({right:'120px'});
        $("#content").css('opacity', '1');
        $("#note-id").val(-1);
        $("#note-title").val('');
        editor.codemirror.setValue('');
    });

    $("#logout-button").click(function() {

    });

    $("#content").click(function() {
        $(".note-list").hide();
        swi = 1;
        $("#content").css('opacity', '1');
    });

    $("#save").click(function() {
        var username = $("#username").val();
        var nid = $("#note-id").val();
        var title = $("#note-title").val();
        //var content = $("#note-content").val();
        var content = editor.codemirror.getValue();
        console.log(nid + title + content);
        if (nid == -1) {
            addNote(username, title, content);
            $("#note-id").val(0);
        } else {
            updateNote(nid, title, content);
        }
        $.ajax({
          type: "POST",
          url: "/list",
          data: $("#refreshForm").serialize(),
          success: success,
          dataType: dataType
        });
        window.location.reload();
    });
    
    $("#delete").click(function() {
        var nid = $("#note-id").val();
        if (confirm("确定删除该笔记吗?")) {
            deleteNote(nid);
        }
    });
});

$(".shared-btn").on("click", function() {
    console.log("shared-btn");
  $("body").toggleClass("dialogIsOpen");
})