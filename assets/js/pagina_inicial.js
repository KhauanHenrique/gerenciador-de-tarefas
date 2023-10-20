// Função para criar uma nova tarefa
function criarTarefa() {
    const categoriaSelecionada = document.getElementById("categoria").value;
    const data = document.getElementById("data").value;
    const descricao = document.getElementById("descricao-criar").value;

    if (categoriaSelecionada === 'padrao' || !descricao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaTarefa = new Tarefa(categoriaSelecionada, data, descricao);
    novaTarefa.salvar();
    limparCampos();
    exibirTarefas();
}

// Classe para representar uma tarefa
class Tarefa {
    constructor(categoria, data, descricao) {
        this.categoria = categoria;
        this.data = data;
        this.descricao = descricao;
    }

    salvar() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(this);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
}

// Função para limpar campos após criar uma tarefa
function limparCampos() {
    document.getElementById("categoria").value = 'padrao';
    document.getElementById("data").value = '';
    document.getElementById("descricao-criar").value = '';
}

// Função para exibir tarefas nos feeds
function exibirTarefas() {
    exibirTarefasPorCategoria('pessoal', "#feed1");
    exibirTarefasPorCategoria('trabalho', "#feed2");
    exibirTarefasPorCategoria('estudo', "#feed3");
}

// Função para exibir tarefas por categoria em um feed
function exibirTarefasPorCategoria(categoria, feedId) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const feedContent = document.querySelector(feedId);
    feedContent.innerHTML = '';

    const tarefasCategoria = tarefas.filter(tarefa => tarefa.categoria === categoria);

    tarefasCategoria.forEach(tarefa => {
        const cardAviso = document.createElement("div");
        cardAviso.className = "card-state-layer-outlined estilo-conteiner-secundario";

        const headerAviso = document.createElement("p");
        headerAviso.className = "header-aviso";

        const descricao = document.createElement("div");
        descricao.className = "header2";
        descricao.textContent = tarefa.descricao;

        const divData = document.createElement("div");
        divData.className = "divDataCategoria";

        const divinfo = document.createElement("div");
        divinfo.className = "divinfo";

        const divAcoes = document.createElement("div");
        divAcoes.className = "acoesTarefas";

        const BtnEditar = document.createElement("button");
        BtnEditar.className = "botoes botao-selecionado-editar";
        BtnEditar.innerHTML = `
            <svg 
                xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960" width="24">
                <path fill="#45483D" d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12-11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
        `;

        const BtnApagar = document.createElement("button");
        BtnApagar.className = "botoes botao-selecionado-deletar";
        BtnApagar.innerHTML = `
            <svg 
                xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960" width="24">
                <path fill="#45483D" d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        `;

        const dataSpan = document.createElement("span");
        dataSpan.id = "data";
        dataSpan.textContent = tarefa.data;

        const categoriaSpan = document.createElement("span");
        categoriaSpan.id = "categoria";
        categoriaSpan.textContent = tarefa.categoria;

        cardAviso.appendChild(headerAviso);
        headerAviso.appendChild(descricao);
        headerAviso.appendChild(divinfo);

        divinfo.appendChild(divData);
        divData.appendChild(dataSpan);
        divData.appendChild(categoriaSpan);

        divinfo.appendChild(divAcoes);
        divAcoes.appendChild(BtnEditar);
        divAcoes.appendChild(BtnApagar);

        feedContent.appendChild(cardAviso);
    });
}

// Chame exibirTarefas inicialmente
exibirTarefas();

// CONTEINER CENTRAL 
const modal = document.querySelector(".modal-false");

function toggleModalExpand() {
    if (!modal.classList.contains("modal-expand")) {
        modal.classList.add("modal-expand");
    } else {
        modal.classList.remove("modal-expand");
    }
}

// Função para pegar o nome do usuário logado
function pegaUsuario() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        if (usuario.situacao === true) {
            return usuario.nome;
        }
    }
    return "Usuário não encontrado";
}

// exibir o nome do usuário
const h2 = document.querySelector('.ola-usuario');

h2.textContent = "Olá, " + pegaUsuario();

// Pega o Usuário logado e altera ele para ativo
function pegaUsuarioAtivo() {
    for (let i = 0; i < localStorage.length; i++) {
        const userKey = localStorage.key(i)
        const informationsKey = localStorage.getItem(userKey)
        let informationsKeyJson = JSON.parse(informationsKey)
        informationsKeyJson.situacao = false
        informationsKeyJson = JSON.stringify(informationsKeyJson)
        localStorage.setItem(userKey, informationsKeyJson);
    }

}

// Evento de deslogar usuário
const sair = document.querySelector('.sair')
const loginPage = '../../index.html'
sair.addEventListener('click', () => {
    pegaUsuarioAtivo()
    window.location.href = loginPage;
})

//Alternar entre semana e mês 

function alternarPaginas(conteudo) {

    if (conteudo === 'usuario') {
        document.querySelector('.sessoes').style.display = 'flex';
        document.querySelector('.semana').style.display = 'none';
        document.querySelector('.mes').style.display = 'none';
    }
    
    if (conteudo === 'semana') {
        document.querySelector('.week').style.display = 'flex';
        document.querySelector('.mes').style.display = 'none';
        document.querySelector('.sessoes').style.display = 'none';
    }
    if (conteudo === 'mes') {
        document.querySelector('.week').style.display = 'none';
        document.querySelector('.mes').style.display = 'flex';
        document.querySelector('.semana').style.display = 'flex';
        document.querySelector('.sessoes').style.display = 'none';
    }
    
    
}

//Evento para deslizar barra lateral
function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    let content = document.querySelector('.content');
    let header = document.getElementById('header');
    let displayTarefas = document.querySelector('.sessoes').style.display;
    
    
    if (sidebar.style.width === '0px' || sidebar.style.width === '') {
        sidebar.style.width = '250px';
        if (window.innerWidth < 991) {
            if (displayTarefas === 'none') {
                content.style.marginLeft = '384px';
                header.style.marginLeft = '250px';
            } else {
                content.style.marginLeft = '500px';
                header.style.marginLeft = '250px';
            }
        } else if (displayTarefas === 'none') {
            content.style.marginLeft = '0px';
        }
        else {
            content.style.marginLeft = '100px';
        }
    } else {
        sidebar.style.width = '0px';
        content.style.marginLeft = '0';
        header.style.marginLeft = '0';
    }
}


// function updateWeek() {
//     let week = document.getElementById('week');
//     let days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

//     let today = new Date();
//     let currentDay = today.getDay(); // 0 (Domingo) a 6 (Sábado)

//     week.innerHTML = ''; // Limpa o conteúdo atual

//     for (var i = 0; i < 7; i++) {
//         var dayName = days[i];
//         var dayDiv = document.createElement('div');
//         dayDiv.classList.add('day');
//         dayDiv.onclick = function() {
//             toggleTasks(this);
//         };

//         var h3 = document.createElement('h3');
//         var dayNumber = (today.getDate() - currentDay + i) % 31 + 1; // Adicionamos 1 para evitar 0
//         h3.textContent = `${dayName} ${dayNumber}`;

//         var taskCountSpan = document.createElement('span');
//         taskCountSpan.classList.add('task-count');
//         taskCountSpan.textContent = '0';

//         h3.appendChild(taskCountSpan);
//         dayDiv.appendChild(h3);

//         if (i === currentDay) {
//             dayDiv.classList.add('current-day');
//         }

//         week.appendChild(dayDiv);
//     }
// }

// updateWeek();