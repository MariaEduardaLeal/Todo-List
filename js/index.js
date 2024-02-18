//SELEÇÃO DE ELEMENTOS  
const formulario_todo = document.querySelector('#todo-form');
const input_todo = document.querySelector('#todo-input');
const lista_todo = document.querySelector('#todo-list');
const formulario_edicao = document.querySelector("#edit-form");
const input_edicao = document.querySelector('#edit-input');
const botao_cancelar_edicao = document.querySelector('#cancel-edit-btn');
const input_filtro_pesquisa = document.querySelector("#search-input");
const apagar_fltro_pesquisa = document.querySelector("#earese-button");
const select_filtro_a_fazer = document.querySelector("#filter-select");

let titulo_antigo = '';

// FUNÇÃO PARA SALVAR UMA TAREFA NA LISTA TODO
function salvarTarefaListaTodo(valor_input_adicione_tarefa) {
    // Cria um elemento <div> para representar a tarefa na lista
    const lista_todo_html = document.createElement("div");
    lista_todo_html.classList.add("todo"); // Adiciona a classe "todo" à div

    // Cria um elemento <h3> para o título da tarefa
    const titulo_todo = document.createElement("h3");
    titulo_todo.innerText = valor_input_adicione_tarefa; // Define o texto do título com o valor da tarefa
    lista_todo_html.appendChild(titulo_todo); // Adiciona o título à div "todo"

    const btn_tarefa_feita = document.createElement("button");
    btn_tarefa_feita.classList.add("finish-todo");
    btn_tarefa_feita.innerHTML = '<i class="fa-solid fa-check"></i>';
    lista_todo_html.appendChild(btn_tarefa_feita);

    const btn_editar_tarefa = document.createElement("button");
    btn_editar_tarefa.classList.add("edit-todo");
    btn_editar_tarefa.innerHTML = '<i class="fa-solid fa-pen"></i>';
    lista_todo_html.appendChild(btn_editar_tarefa);

    const btn_excluir_tarefa = document.createElement("button");
    btn_excluir_tarefa.classList.add("remove-todo");
    btn_excluir_tarefa.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    lista_todo_html.appendChild(btn_excluir_tarefa);

    lista_todo.appendChild(lista_todo_html);

    valor_input_adicione_tarefa.value = "";
    input_todo.focus();
}

const toggleForms = () => {
    formulario_edicao.classList.toggle("show");
    formulario_todo.classList.toggle("hide");
    lista_todo.classList.toggle("hide");
};

const editar_todo = (valor_input_editado) => {
    
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const titulo_todo = todo.querySelector("h3");

        if (titulo_todo && titulo_todo.innerText === titulo_antigo) {
            
            titulo_todo.innerText = valor_input_editado;
        }
    });
}

function filtrarTodos(termo_pesquisa) {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex";

        

        if (!todoTitle.includes(termo_pesquisa)) {
            todo.style.display = "none";
        }
    });
}

const filtrar_select_todo_a_fazer = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));

            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        default:
            break;
    }
};

const toggleDoneStyle = (element) => {
    const h3Element = element.querySelector('h3');

    if (element.classList.contains('done')) {
        // Se a classe done estiver presente, aplicar estilos
        element.style.background = 'linear-gradient(45deg, #d32f2f, #ffb74d)';
        h3Element.style.color = '#fff';
        h3Element.style.textDecoration = 'line-through';
        h3Element.style.fontStyle = 'italic';
    } else {
        // Se a classe done estiver ausente, remover estilos
        element.style.background = '';
        h3Element.style.color = '';  // Deixe a cor do texto em branco para evitar herança
        h3Element.style.textDecoration = '';
        h3Element.style.fontStyle = '';
    }
};

//EVENTOS
formulario_todo.addEventListener("submit", (e) => {
    e.preventDefault();
    /*e.preventDefault() impede que o evento de submissão padrão ocorra, impedindo assim que a página seja recarregada quando o formulário é enviado*/
    const valor_input = input_todo.value

    if (valor_input) {
        salvarTarefaListaTodo(valor_input);
    }
});

lista_todo.addEventListener("click", (e) => {
    const elemento_selecionado = e.target
    //Seleciona o elemento pai mais próximo, nesse caso eu quero a div pai mais próxima
    const elemento_pai_proximo = elemento_selecionado.closest("div");
    let titulo_lista_todo;

    if (elemento_pai_proximo && elemento_pai_proximo.querySelector("h3")) {
        titulo_lista_todo = elemento_pai_proximo.querySelector("h3").innerText;
    }

    if (elemento_selecionado.classList.contains('finish-todo')) {
        /**classList.toggle: Este método adiciona a classe se ela não estiver presente e a remove se já estiver presente. Ou seja, ele alterna o estado da classe. */
        elemento_pai_proximo.classList.toggle("done");
        toggleDoneStyle(elemento_pai_proximo);
        
    }

    if (elemento_selecionado.classList.contains('remove-todo')) {
        elemento_pai_proximo.remove();
    }

    if (elemento_selecionado.classList.contains('edit-todo')) {
        toggleForms();

        input_edicao.value = titulo_lista_todo
        titulo_antigo = titulo_lista_todo
    }
});

botao_cancelar_edicao.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
})

formulario_edicao.addEventListener('submit', (e) => {
    e.preventDefault();

    const input_valor_editado = input_edicao.value

    if (input_valor_editado) {
        editar_todo(input_valor_editado);
    }
    toggleForms();
});

input_filtro_pesquisa.addEventListener("keyup", (e) => {
    const search = e.target.value;

    filtrarTodos(search);
});

apagar_fltro_pesquisa.addEventListener("click", (e) => {
    e.preventDefault();

    const termo_pesquisa = input_filtro_pesquisa.value;

    // Remove a última letra do termo de pesquisa
    const novo_termo_pesquisa = termo_pesquisa.slice(0, -1);

    input_filtro_pesquisa.value = novo_termo_pesquisa;

    filtrarTodos(novo_termo_pesquisa);
});

select_filtro_a_fazer.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filtrar_select_todo_a_fazer(filterValue);
});