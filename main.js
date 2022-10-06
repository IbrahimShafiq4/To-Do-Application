let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks');

// Empty Array To Store The Tasks 
let arrayOfTasks = [];

// Check If there is Tasks In Local Storage
if (localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

// Triger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
    if(input.value !== "") {
        addTaskToArray(input.value);
        input.value = '';
    }
}

// Click on Task Element
taskDiv.addEventListener('click', (e) => {
    // Delete Button
    if (e.target.classList.contains('del')) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));

        // Remove Element From Page
        e.target.parentElement.remove();
    }

    // if (e.target.className === 'del') {
    //     console.log('yes')
    // }

    // task element
    if (e.target.classList.contains('task')) {
        // Toggle Completed For The Task
        toggleStatusTaskWidth(e.target.getAttribute('data-id'));
        // Toggle Done Class
        e.target.classList.toggle('done');
    }
})

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    // Push task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFromArrayOfTasks(arrayOfTasks);
    // For Testing
    // console.log(arrayOfTasks);
    // console.log(JSON.stringify(arrayOfTasks));
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    taskDiv.innerHTML = '';
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement('div');
        div.className = 'task';
        // Check If Task is Done 
        if (task.completed === true) {
            div.className = 'task done';
        }
        /*
            this one is equal to the one above
            if (task.completed) {
                div.className = 'task done';
            } 
        */
        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement('span');
        span.className = "del";
        span.appendChild(document.createTextNode('Delete'));
        // Append Button To Main div
        div.appendChild(span);
        // add Task div To Tasks Div
        taskDiv.appendChild(div);
    });
}

function addDataToLocalStorageFromArrayOfTasks(arrayOfTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data) { // (data) === (data===true) => if the data is mowgoda
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    // For Explain Only
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    // }

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFromArrayOfTasks(arrayOfTasks);
}

function toggleStatusTaskWidth(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false) 
        }
    }
    addDataToLocalStorageFromArrayOfTasks(arrayOfTasks);
}

let deleteAll = document.createElement('button');
deleteAll.append('Delete All')
let container = document.querySelector('.container');
deleteAll.className = 'delete-all';

container.appendChild(deleteAll);

deleteAll.onclick = function () {
    taskDiv.innerHTML = '';
    localStorage.removeItem('tasks');
}