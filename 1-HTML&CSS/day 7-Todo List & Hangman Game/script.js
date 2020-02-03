var todoList = {
  todos: [],

  stoppedTyping: function () {
    let addTodoInput = document.getElementById('addTodoInput');
    if (addTodoInput.value.length < 3) {
      document.getElementById("disableButton").disabled = true;
    } else {
      document.getElementById("disableButton").disabled = false;
    }
  },

  addTodo: function (todoText) {
      this.todos.push({
      todoText: todoText,
      completed: false
      });
  },

  changeTodo: function (pos, newTodoText) {
    this.todos[pos].todoText = newTodoText;
  },

  deleteTodo: function (pos) {
    this.todos.splice(pos, 1);
  },

  toggleCompleted: function (pos) {
    var todo = this.todos[pos];
    todo.completed = !todo.completed;
  },

  toggleAll: function () {
    var completedTodos = 0;
    var totalTodos = this.todos.length;

    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }

    if (completedTodos === totalTodos) {
      for (i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  }
}; //end of todoList object



var buttons = {
  addTodo: function () {
    var addTodoInput = document.getElementById('addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = '';
    view.displayTodos();
  },

  changeTodo: function () {
    var changeTodoPosition = document.getElementById('changeTodoPosition');
    var changeTodoText = document.getElementById('changeTodoText');
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
    changeTodoPosition.value = '';
    changeTodoText.value = '';
    view.displayTodos();
  },

  deleteTodo: function () {
    var deleteTodoPosition = document.getElementById('deleteTodoPosition');
    todoList.deleteTodo(deleteTodoPosition.valueAsNumber);
    deleteTodoPosition.value = '';
    view.displayTodos();
  },

  toggleCompleted: function () {
    var toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = '';
    view.displayTodos();
  },

  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
}; //closing bracket for 'buttons' object


var view = {
  displayTodos: function () {
    var todoUl = document.querySelector('ul');
    todoUl.innerHTML = '';

    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      todoLi.onclick = function () {
        this.parentElement.removeChild(this)
        todoList.deleteTodo(this);
      };
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.textContent = todoTextWithCompletion;
      todoUl.appendChild(todoLi);
    }
  }
}; //end of view object























