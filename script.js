let modelos = document.querySelectorAll('.modelo');
let escolhaModelo;
let golas = document.querySelectorAll('.gola');
let escolhaGola;
let tecidos = document.querySelectorAll('.tecido');
let escolhaTecido;
let botao = document.querySelector('button')
let input = document.querySelector('input')
let pedidos = document.querySelector('.ultimos-pedidos')
let pedidosAPI;

const promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts')
promessa.then(resposta)

function resposta(resposta){
    console.log(resposta.data)
    pedidosAPI = resposta.data
    console.log(pedidosAPI)
    ultimosPedidos()
}

function selecionarModelo(escolha){
    modelos.forEach(element => {
        element.classList.remove('selecionado')
    });
    escolhaModelo = escolha.parentNode.classList
    escolhaModelo.add('selecionado')
    console.log(escolhaModelo)
    console.log(escolhaGola)
    console.log(escolhaTecido)
    ativarBotao();
}

function selecionarGola(escolha){
    golas.forEach(element => {
        element.classList.remove('selecionado')
    })
    escolhaGola = escolha.parentNode.classList
    escolhaGola.add('selecionado')
    console.log(escolhaModelo)
    console.log(escolhaGola)
    console.log(escolhaTecido)
    ativarBotao();
}

function selecionarTecido(escolha){
    tecidos.forEach(element => {
        element.classList.remove('selecionado')
    })
    escolhaTecido = escolha.parentNode.classList
    escolhaTecido.add('selecionado')
    console.log(escolhaModelo)
    console.log(escolhaGola)
    console.log(escolhaTecido)
    ativarBotao();
}

function ativarBotao(){
    if (escolhaModelo[2] == "selecionado" && escolhaGola[2] == "selecionado" && escolhaTecido[2] == "selecionado"){
        botao.classList.add('botao-ativado')
    }
}

function ultimosPedidos(){
    for(let i = 0; i < pedidosAPI.length; i++){
        console.log(pedidosAPI[i])
        pedidos.innerHTML += `
        <li>
            <img class="imagem-pedido" src="${pedidosAPI[i].image}" alt="Blusa1">
            <p><strong>Criador: </strong>${pedidosAPI[i].owner}</p>
        </li>
        `
    }    
};