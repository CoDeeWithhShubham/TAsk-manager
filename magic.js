let date = new Date;
y = date.getFullYear();
m = date.getMonth();
d = date.getDate();
H = date.getHours();
M = date.getMinutes();
S = date.getSeconds();

let currentDateTime = `${d}-${m + 1}-${y} ${H}:${M}:${S}`;

let status = 'newTask';
printNotes();

document.getElementById('addbtn').addEventListener('click', (e) => {
    //e.preventDefault();
    let description = document.getElementById("description");
    let title = document.getElementById("title");
    let subTask = document.getElementsByClassName("subTask");
    let subTaskValue = [];
    for (let el of subTask) {
        if (el.value !== '') {
            subTaskValue.push(el.value);
        }
    }
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    newobj1 = {
        description: description.value,
        title: title.value,
        subTask: subTaskValue,
        status: 'newTask',
        currentDateTime: currentDateTime
    }

    notesObj.push(newobj1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    description.value = "";
    title.value = "";
    for (let el of subTask) {
        el.value = '';
    }
    printNotes();
    $('#newTaskModal').modal('hide');
});

function printNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.status === status) {
            let subTaskHtml = '';
            if (element.subTask.length > 0) {
                subTaskHtml = `<ul class="list-group">`;
                element.subTask.forEach((el) => {
                    subTaskHtml += `<li class="list-group-item">${el}</li>`;  
                });
                subTaskHtml += `</ul>`;
            }

            html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Note ${index + 1}</h5>
                            <h2 class="card-text"> ${element.title}</h2>
                            <p class="card-text"> ${element.currentDateTime}</p>
                            <p class="card-text"> ${element.description}</p>
                            ${subTaskHtml}
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        </div> 
                    </div>`;
        }
    });

    let newNotes = document.getElementById("notes");
    if (notesObj.length != 0) {
        newNotes.innerHTML = html;
    } else {
        newNotes.innerHTML = `<h3>write something to add</h3>`;
    }
}

function getTaskData(data) {
    status = data;
    printNotes();
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    printNotes();
}

//below code for subtask
var max_fields = 10; //maximum input boxes allowed
var wrapper = document.getElementsByClassName("input_fields_wrap"); //Fields wrapper
var add_button = document.getElementsByClassName("add_field_button"); //Add button ID

var x = 1; //initlal text box count
$(add_button).click(function(e){ //on add input button click
    e.preventDefault();
    if(x < max_fields){ //max input box allowed
        x++; //text box increment
        $(wrapper).append('<div class="input-group mb-3"><input placeholder="Enter Subtask" type="text" class="form-control subTask"><div class="input-group-append"><button class="btn btn-outline-danger remove_field" type="button">Remove</button></div></div>'); //add input box
    }
});

$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault();
    $(this).parent('div').parent('div').remove();
    x--;
});
