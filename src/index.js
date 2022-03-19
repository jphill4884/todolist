const formInput = document.forms.newtodo;
const description = formInput.todotext;
const priority = formInput.ranking;
const deadline = formInput.querySelector("#duedate");
const taskStatus = "Pending";


const APP_NAMESPACE = 'DoItNow';

const rankings = ["urgent", 'important', 'nicetohave']

let tasks = [] 

if (localStorage.getItem(APP_NAMESPACE)){
  tasks = JSON.parse(localStorage.getItem(APP_NAMESPACE));
}


function addItem(todotext, ranking, dueDate, taskID, currentStatus) {
  const todoRank = document.querySelector(`.${ranking}`)
    const template = `
    <div id="tasks" class="${ranking}item" data-value="${taskID}">
      <div class="dateelement">
        <span>Due by:</span>
        <span class="changeduedate" contentEditable="true">${dueDate}</span>
        <span id="status" class="status">${currentStatus}</span>
      </div>
      <div class="todoelement">
        <span>Task Description:</span>
        <p contenteditable="true">${todotext}</p>
      </div>
      <div class="todobuttons">
        <button id="complete" class="btn btn-success">Done!</button>
        <button id="remove" class="btn btn-danger">Remove</button>
      </div>
    </div>
    `;
    todoRank.innerHTML += template;
    activateButtons();

}

function handleSubmitForm(event) {
const lastTaskId = tasks.length === 0 ? 0 : tasks[tasks.length -1].id;
  event.preventDefault();
  tasks.push({
    id: lastTaskId + 1,
    name: description.value,
    ranking:  priority.value,
    dueDate: deadline.value,
    currentStatus: taskStatus
  })
  localStorage.setItem(APP_NAMESPACE, JSON.stringify(tasks));
  cleanAndRender();
  formInput.reset();
console.log(currentStatus);
}

formInput.addEventListener("submit", handleSubmitForm);



function clearElement(ranking) {
  const element = document.querySelector(`.${ranking}`)
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

function cleanAndRender() {
  rankings.forEach(ranking => clearElement(ranking) )
  renderTodos()
}

  function renderTodos() {
    tasks.forEach(task => addItem(task.name, task.ranking, task.dueDate, task.id, task.currentStatus))
  }

  renderTodos();
  
  // Cheerful message when the section is empty


  const messageArray = [["Nothing on the agenda for today. Time for a coffee!"],
                         ["There's nothing to see here. Get back to your knitting."],
                         ["Not all who wander are lost. But these tasks are..."],
                         ["What will you do with all of this free time?"],
                         ["Done and dusted. I do believe it is time for tea."],
                         ["This day has been a success. You should treat yourself to a bath."],
                         ["You should be proud of the fact that you have nothing to do."],
                         ["Time to catch up on your bedside reading."],
                         ["With all your tasks out of the way there is plenty time for snacks!"]];

  const randomCheerGenerator = () => 
    {
        const cheerfulMessage = Math.floor(Math.random() * 8);
        const location1 = cheerfulMessage > 8 ? cheerfulMessage - 1 : cheerfulMessage;
        const location2 = cheerfulMessage > 7 ? cheerfulMessage - 2 : cheerfulMessage + 1;
        const location3 = cheerfulMessage > 6 ? cheerfulMessage - 3 : cheerfulMessage + 2;
        const message1 = messageArray[location1];
        const message2 = messageArray[location2];
        const message3 = messageArray[location3];
        addRandomMessages(message1, message2, message3);
};

function addRandomMessages(message1, message2, message3) {
  const messageLocation1 = document.querySelector(".urgent");
  const messageLocation2 = document.querySelector(".important");
  const messageLocation3 = document.querySelector(".nicetohave");
  const messageTemplate1 = `
    <div class="randomMessage">
    <span>${message1}</span>
    </div>
    `;
  const messageTemplate2 = `
    <div class="randomMessage">
    <span>${message2}</span>
    </div>
    `;
  const messageTemplate3 = `
    <div class="randomMessage">
    <span>${message3}</span>
    </div>
    `;

  if (messageLocation1.childElementCount < 1){
    messageLocation1.innerHTML += messageTemplate1;
  };
  if (messageLocation2.childElementCount < 1) {
    messageLocation2.innerHTML += messageTemplate2;
  };
  if (messageLocation3.childElementCount < 1) {
    messageLocation3.innerHTML += messageTemplate3;
  };
}

    
// Delete tasks
    
function activateDeleteButtons() {
  const deleteButtons = document.querySelectorAll("#remove");
  for (const deleteButton of deleteButtons) {
    deleteButton.onclick = deleteTask;
  }
}

  function deleteTask (event) {
    const DOMTaskToDelete = event.currentTarget.closest("#tasks");
    const DOMTaskParent = DOMTaskToDelete.parentNode;
    const deleteTaskId = DOMTaskToDelete.dataset.value && +DOMTaskToDelete.dataset.value; 
    const taskIndex = tasks.findIndex(deleteTask => deleteTask.id === deleteTaskId);
    const deletedTask = tasks.splice(taskIndex,1);
    localStorage.setItem(APP_NAMESPACE, JSON.stringify(tasks));
    DOMTaskParent.removeChild(DOMTaskToDelete);
    randomCheerGenerator();
  }

 // Mark tasks as complete

function activateCompleteButtons() {  
  const completeButtons = document.querySelectorAll("#complete");
  for (const completeButton of completeButtons) {
    completeButton.onclick = completeTask;
  }
}    
    
function completeTask(event) {
  const DOMUpdatedStatus = event.currentTarget.closest("#tasks");
  const taskId = DOMUpdatedStatus.dataset.value && +DOMUpdatedStatus.dataset.value;
  const updateStatus = DOMUpdatedStatus.querySelector("#status")
  const taskToUpdate = tasks.find(task => task.id === taskId);
  //updateStatus.className = "statuscomplete";
  updateStatus.innerText = "Complete";
  taskToUpdate.currentStatus = "Complete";
  localStorage.setItem(APP_NAMESPACE, JSON.stringify(tasks));
    }

    
randomCheerGenerator();
activateButtons();

// Edit ToDo Text and Due Date

function listenForUpdates() {
  const visibleTasks = document.querySelectorAll("#tasks");
  for (const visibleTask of visibleTasks) {
    visibleTask.addEventListener("keydown", addUpdateButtons);
  }
}

function addUpdateButtons(event) {
  const addButtonsParent = event.currentTarget;
  const addButtonsLocale = addButtonsParent.querySelector(".todobuttons");
  if ( addButtonsLocale.childElementCount < 3) {
    addButtonsLocale.innerHTML += '<button id="update" class="btn btn-secondary">Update</button>';
    activateButtons();
  }
}

function activateUpdateButtons() {
  const updateButtons = document.querySelectorAll("#update");
  for (const updateButton of updateButtons) {
    updateButton.onclick = updateTask;
  }
}

function updateTask (event) {
  const DOMUpdatedTask = event.currentTarget.closest("#tasks");
  const taskId = DOMUpdatedTask.dataset.value && +DOMUpdatedTask.dataset.value;
  const updatedText = DOMUpdatedTask.querySelector("p").textContent
  const updatedDate = DOMUpdatedTask.querySelector(".changeduedate").textContent
  const taskToUpdate = tasks.find(task => task.id === taskId);
  taskToUpdate.name = updatedText;
  taskToUpdate.dueDate = updatedDate;
  localStorage.setItem(APP_NAMESPACE, JSON.stringify(tasks));
}
  

function activateButtons() {
  activateDeleteButtons();
  activateCompleteButtons();
  activateUpdateButtons();
  listenForUpdates();
}