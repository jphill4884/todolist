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
    <span id="status" class="status">Pending</span>
    </div>
    <div class="todoelement">
    <span>Task Description:</span>
    <p>${todotext}</p>
    </div>
    <div class="todobuttons">
    <button id="complete" class="btn btn-success">Done!</button>
    <button id="remove" class="btn btn-danger">Remove</button>
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
    //addItem("Add important ToDo", "important", "2022-03-06" );
    addItem("Add nice-to-have ToDo", "nicetohave", "2022-03-06" );
  }

  testToDos();

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

        if (document.querySelector(".urgentitem").length === 0) {
          messageLocation1.innerHTML += messageTemplate1;
        };
        if (document.querySelector(".importantitem").length === 0) {
          messageLocation2.innerHTML += messageTemplate2;
        };
        if (document.querySelector(".nicetohaveitem").length === 0) {
          messageLocation3.innerHTML += messageTemplate3;
        }
    }

    randomCheerGenerator();
    
    // Delete and Done button functions
    
    function activateDeleteButtons() {
      const deleteButtons = document.querySelectorAll("#remove");
      for (const deleteButton of deleteButtons) {
        deleteButton.onclick = deleteTask;
    }
  }

  function deleteTask(event) {
     const deleteLocale = event.currentTarget.getParent
  console.log(deleteLocale);
  }

function activateCompleteButtons() {  
    const completeButtons = document.querySelectorAll("#complete");
    for (const completeButton of completeButtons) {
      completeButton.onclick = completeTask;
    }
}    
    
function completeTask(event) {
  const completeLocale = event.currentTarget.parentNode.parentNode;
  const status = completeLocale.getChild;
  console.log(completeLocale);
  //status.className = "statuscomplete";
  //status.innerText = "Complete";
    }
    
    activateDeleteButtons();
    activateCompleteButtons();