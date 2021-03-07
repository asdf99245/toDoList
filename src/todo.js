const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

let toDos = [];
const TODOS_LS = 'toDos';

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function onDeleteButtonClick(event) {
  const currentList = event.currentTarget.parentNode;
  const currentId = currentList.id;
  toDoList.removeChild(currentList);

  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(currentId));

  toDos = cleanToDos;
  saveToDos();
}

function renderToDos(value) {
  const li = document.createElement('li');
  const newId = toDos.length + 1;
  const delBtn = document.createElement('button');
  const imoji = document.createElement('i');
  imoji.classList.add('fas');
  imoji.classList.add('fa-times');

  delBtn.addEventListener('click', onDeleteButtonClick);

  const span = document.createElement('span');
  span.innerText = value;

  li.appendChild(span);
  li.appendChild(delBtn);
  delBtn.appendChild(imoji);
  toDoList.appendChild(li);

  li.id = newId;
  const toDoObj = {
    text: value,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => renderToDos(toDo.text));
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const currentValue = toDoInput.value;
    toDoInput.value = '';
    renderToDos(currentValue);
  });
}

init();
