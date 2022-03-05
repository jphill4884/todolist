const formInput = document.forms.newtodo;
const description = formInput.todotext;
const priority = formInput.ranking;
const deadline = formInput.querySelector("div.input-group.date")



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
  addItem("Something to do", "urgent", "yesterday")
  // addItem(description, priority, deadline);
}

  formInput.addEventListener("submit", handleSubmitForm)
  console.log(formInput);
