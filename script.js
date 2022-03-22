// vetor de itens da lista
let todoItems = [];

// função para renderizar os itens da lista
function renderTodo(todo) {
    // selecionando o primeiro elemento da lista de todos
    const list = document.querySelector('.js-todo-list');

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

    // append do elemento para a DOM
    list.append(node);
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
});