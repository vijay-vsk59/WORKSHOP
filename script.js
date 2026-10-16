
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

// Load saved tasks
let todos = [];

try {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  if (!Array.isArray(todos)) todos = [];
} catch {
  todos = [];
}

// Save tasks
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Display tasks
function render() {
  todoList.innerHTML = '';

  emptyState.classList.toggle('hidden', todos.length > 0);

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className =
      `todo-item ${todo.completed ? 'completed' : ''}`;

    const left = document.createElement('div');
    left.className = 'todo-content-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', 'Complete task');

    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id);
    });

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    left.append(checkbox, span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    li.append(left, deleteBtn);
    todoList.appendChild(li);
  });
}

// Add a task
function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  render();
}

// Mark task complete or incomplete
function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }

    return todo;
  });

  saveTodos();
  render();
}

// Delete a task
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

// Handle form submission
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();

  if (text !== '') {
    addTodo(text);
    todoInput.value = '';
    todoInput.focus();
  }
});

// Show saved tasks on page load
render();
