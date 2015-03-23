/* Define a socket communicating with server. */
var socket = io('http://localhost:3000');

var editor = new Editor();
editor.render();

/* The basic CRUD option of the note. */
var addNote = function (username, title, content, callback) {
    if (title == null || title.length == 0) {
        return;
    }
    socket.emit('add', {'username' : username, 'title': title, 'content': content});
    socket.on('add-finished', function (data) {
        console.log(data);
        callback(data);
        if (data.nid != -1) {
           addRemind();
        }
    });
}

var deleteNote = function (nid) {
    socket.emit('delete', {'nid': nid});
    socket.on('delete-successful', function (data) {
        alert("删除成功!");
        $("#item" + nid).remove();
        addRemind();
        swi = 1;
        $("#content").animate({right:'120px'});
        $("#content").css('opacity', '1');
        $("#note-id").val(-1);
        $("#note-title").val('');
        editor.codemirror.setValue('');
    });
}

var updateNote = function (nid, title, content) {
    socket.emit('update', {'nid': nid, 'title': title, 'content': content});
    alert("保存成功！");
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
            $(".shared-note-list").hide();
            swi = 0;
            $("#content").css('opacity', '0.2');
        }
    });

    $("#shared-list-button").click(function() {
        if (swi == 0) {
            $(".shared-note-list").hide();
            $("#content").animate({right:'120px'});
            $("#content").css('opacity', '1');
            swi = 1;
        } else {
            $(".shared-note-list").show();
            $(".note-list").hide();
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
        $(".shared-note-list").hide();
        $(".note-list").hide();
        swi = 1;
        $("#content").css('opacity', '2');
        $("#content").animate({right:'120px'});
    });

    $("#save").click(function() {
        var username = $("#username").val();
        var nid = $("#note-id").val();
        var title = $("#note-title").val();
        //var content = $("#note-content").val();
        var content = editor.codemirror.getValue();
        if (nid == -1) {
            addNote(username, title, content, function(data) {
            $("#noteList").after("<div id=\"item" + data.nid + "\"class=\"note-item\">" +
                "<div><button onclick=\"showNote(" + data.nid + ")\" class=\"btn btn-embossed btn-primary\">" + title + "</button></div>" +
                "<div>" +  content + "</div>" +
                "</div><hr>");
            });
            $("#note-id").val(0);
        } else {
            updateNote(nid, title, content);
        }
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
    if ($("#shared-dialog").css('display') == "block") {
        $("#shared-dialog").css("display","none");
    } else {
        $("#shared-dialog").css("display","block");
    }
})

var shareNote = function() {
    var sharedUser = $("#shared-user").val();
    var nid = $("#note-id").val();
    if (sharedUser == "") {
        alert("分享帐号为空！");
     } else if (nid == "") {
        alert("请选中笔记！");
     } else {
        socket.emit('shareNote',{'nid': nid, 'username': sharedUser});
        socket.on('shareNote-successful', function (data) {
            alert("分享成功！")
        });
    }
}