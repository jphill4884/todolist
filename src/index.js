const formInput = document.forms.newtodo;
const description = formInput.todotext;
const priority = formInput.ranking;
const deadline = formInput.querySelector("#duedate")



function addItem(todotext, ranking, dueDate) {
  const todoRank = document.querySelector(`.${ranking}`)
  console.log(todoRank)
    const template = `
    <div class="${ranking}" data-date="${new Date().toLocaleTimeString()}">
    <p>${todotext}</p>
    <span>${dueDate}</span>
    </div>
    `;
    todoRank.innerHTML += template;
}

function handleSubmitForm(event) {
  event.preventDefault();
  addItem(description.value, priority.value, deadline.value)
}

  formInput.addEventListener("submit", handleSubmitForm);
