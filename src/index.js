
function addItem(todotext, ranking, dueDate) {
    const template = `<div class="${ranking} data-date="${new Date().toLocaleTimeString()}>
    <p>${todotext}</p>
    <span>${dueDate} </span>
      </div>
    </div>`;
    document.querySelector(ranking).innerHTML += template;
  }

  $('#add-new-item').modal();