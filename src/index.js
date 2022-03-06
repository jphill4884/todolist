const formInput = document.forms.newtodo;
const description = formInput.todotext;
const priority = formInput.ranking;
const deadline = formInput.querySelector("#duedate")



function addItem(todotext, ranking, dueDate) {
  const todoRank = document.querySelector(`.${ranking}`)
    const template = `
    <div class="${ranking}item" data-date="${new Date().toLocaleTimeString()}">
    <div class="dateelement">
    <span>Due by:</span>
    <span>${dueDate}</span>
    </div>
    <div class="todoelement">
    <span>Task Description:</span>
    <p>${todotext}</p>
    </div>
    <div class="todobuttons">
    <button id="complete" class="btn btn-success">Done!</button>
    <button id="delete" class="btn btn-danger">Remove</button>
    </div>
    </div>
    `;
    todoRank.innerHTML += template;
}

function handleSubmitForm(event) {
  event.preventDefault();
  addItem(description.value, priority.value, deadline.value)
  formInput.reset();
}

  formInput.addEventListener("submit", handleSubmitForm);

  function testToDos() {
    addItem("Add urgent ToDo", "urgent", "2022-03-06" );
    addItem("Add important ToDo", "important", "2022-03-06" );
    addItem("Add nice-to-have ToDo", "nicetohave", "2022-03-06" );
  }

  testToDos()