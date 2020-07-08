//Select All Elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const todoList = document.querySelector(".list-group");
const clear = document.querySelector("#clear-todos");


eventListeners();

//Assing Event Listeners

function eventListeners(){
  form.addEventListener("submit", addTodo);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clear.addEventListener("click", clearAllTodos);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUi);
}


//Insert New Todo

function addTodo(e){
  const newTodo = todoInput.value.trim();
  //console.log(newTodo);

  if (newTodo === ""){
    showAlert("danger", "Lütfen Bir TODO Giriniz...");

  }
  else{
    addTodoUI(newTodo);
    addTodoToStorage();
    showAlert("success",  "TODO Başarıyla Eklendi!");
  }
  e.preventDefault();
}

//Show TODO'S in UI
function addTodoUI(newTodo) {
  /*<li class="list-group-item d-flex justify-content-between">
      Todo 1
      <a href = "#" class ="delete-item">
          <i class = "fa fa-remove"></i>
      </a>
  </li> */
  const listItem = document.createElement("li"); //creating list item
  const link = document.createElement("a"); //creating link
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  console.log(listItem);

  //Append text node (escaping html chars)
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //Append listItem in to the TodoList
  todoList.appendChild(listItem);
}

//Delete Todos from ui
function deleteTodo(e) {
  if (e.target.className === 'fa fa-remove'){
    console.log("Todo Silindi.");
    //deletefromstorage
    e.target.parentElement.parentElement.remove();
    showAlert("success", "TODO Başarıyla Silindi!");
  }
}

//Get Todos From Local Storage

function getTodosFromStorage() {
  let todos;

  if (localStorage.getItem("todos") === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// Append Todos To Local Storage

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Delete Todos From Local Storage

function deleteTodosFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function(todo,index){
    if (todo === deletetodo){
      todos.splice(index, 1); //delete from array...
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Delete Todos From UI

function deleteTodo(e){
  if (e.target.className === "fa fa-remove"){
    console.log("Siliniyor..");
    deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.parentElement.remove();
    showAlert("success", "TODO Başarıyla Silindi.");
  }

}

// Filtering

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function(listItem){
    const text = listItem.textContent.toLowerCase();

    if (text.indexOf(filterValue) === -1){
      //not found...
      listItem.setAttribute("style", "display: none !important");
    }
    else{
      listItem.setAttribute("style", "display: block");
    }
  })

}
// Clear All Todos
function clearAllTodos(e) {
  if (confirm("Tümünü Silmek İstediğinize Emin Misiniz?")){
    while(todoList.firstElementChild != null){
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }

}



function loadAllTodosToUi(){
  let todos = getTodosFromStorage();

  todos.forEach(function(todo){
    addTodoUI(todo);
  });
}

//Show bootstrap alert
function showAlert(type, message){
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  //alert.role = 'alert';
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function(){
    alert.remove();
  },2000);
}
