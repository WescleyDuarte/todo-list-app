// vetor de itens da lista
let todoItems = [];

// função para renderizar os itens da lista
function renderTodo(todo) {
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    // selecionando o primeiro elemento da lista de todos
    const list = document.querySelector('.js-todo-list');

    // seleciona o item atual da todo list na dom
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted) {
        // remove o item da dom
        item.remove();
        return
    }

    // checando se o todo.checked é true, se for muda o 'isChecked' para 'done', se n passa uma string vazia
    const isChecked = todo.checked ? 'done': '';
    
    // cria um elemento 'li' e o passa em um node
    const node = document.createElement("li");

    // seta o atributo classe
    node.setAttribute('class', `todo-item ${isChecked}`);
    // seta o data-key para o id do todo
    node.setAttribute('data-key', todo.id);
    // seta o conteúdo do elemento 'li' criado acima
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href"#delete-icon"></use></svg>
    </button>
    `;

    // se o item exite na dom
    if(item) {
        // replace it
        list.replaceChild(node, item);
    } else {
        // se não appenda pro fim da lista
        list.append(node);
    }
}

// função que cria um objeto baseado no input e o coloca na lista todoItems
function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    const todo = {
        deleted: true,
        ...todoItems[index]
    };

    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

// selecionando o elemento form
const form = document.querySelector('.js-form');
// submit event listener
form.addEventListener('submit', event => {
    // evita que a página atualize no submit
    event.preventDefault();
    // selecionando o input de texto
    const input = document.querySelector('.js-todo-input');

    // pegando o valor do input e removendo o whitespace
    const text = input.value.trim();
    if(text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

// seleciona a lista
const list = document.querySelector('.js-todo-list');
// click event listener na lista e em seus children
list.addEventListener('click', event => {
    if(event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });