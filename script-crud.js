const btnAddTarefa = document.querySelector('.app__button--add-task')
const formAddTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const btnDeletar = document.querySelector('.app__form-footer__button--delete')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const iconeStatus = document.querySelector('.app__section-task-icon-status')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')


    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
`

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick  = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        //console.log("Nova descrição é: " + novaDescricao)
        if(novaDescricao) {
        paragrafo.textContent = novaDescricao
        tarefa.descricao = novaDescricao
        atualizarTarefas()
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/assets/edit.png')
    imagemBotao.setAttribute('alt', 'Icone de editar a tarefa')

    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
        if (tarefaSelecionada === tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        li.classList.add('app__section-task-list-item-active')
    }

    return li
}

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})

let id = 0

formAddTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        id: id++,
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    textarea.value = ''
    formAddTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
})

const limparFormulario = () => {
    textarea.value = ''
    formAddTarefa.classList.add('hidden')
}     

const apagarTextoTarefa = () => {
    textarea.value = ''
}

btnCancelar.addEventListener('click', limparFormulario)
btnDeletar.addEventListener('click', apagarTextoTarefa)

//localStorage.removeItem('tarefas')

