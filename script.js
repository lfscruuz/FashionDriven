let modelos = document.querySelectorAll('.modelo');
let modeloClasses;
let escolhaModelo;
let golas = document.querySelectorAll('.gola');
let golaClasses;
let escolhaGola;
let tecidos = document.querySelectorAll('.tecido');
let tecidoClasses;
let escolhaTecido;
let botao = document.querySelector('.botao');
let input = document.querySelector('input');
let pedidos = document.querySelector('.ultimos-pedidos');
let pedidosAPI;
let nome = prompt('Qual o seu nome?')
let pedidoEnviado = {
	model: escolhaModelo,
	neck: escolhaGola,
	material: escolhaTecido,
	image: 'https://cdn.rushordertees.com/design/ZoomImage.php?src=NTUyMTM2Mw_f&style=RT2000&colorCode=WHT&x=240&y=300&width=880&height=880&scale=1.7&watermark=false&autoInvertDesign=true',
	owner: nome,
	author: nome
}

const promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');

function carregarPedidos(){
    promessa.then(resposta);

};

function mandarPedido(){  
    pedidos.innerHTML = ''
    if (ativarBotao){
        // axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', pedidoEnviado)
        console.log('pode ir')
    }
    carregarPedidos()
    console.log(pedidoEnviado)
}

carregarPedidos();

function resposta(resposta){
    pedidosAPI = resposta.data;
    ultimosPedidos();
};

function selecionarModelo(escolha){
    modelos.forEach(element => {
        element.classList.remove('selecionado');
    });
    escolhaModelo = escolha.id;
    modeloClasses = escolha.parentNode.classList;
    modeloClasses.add('selecionado');
    ativarBotao();
};

function selecionarGola(escolha){
    golas.forEach(element => {
        element.classList.remove('selecionado');
    })
    escolhaGola = escolha.id;
    golaClasses = escolha.parentNode.classList;
    golaClasses.add('selecionado');
    ativarBotao();    
}

function selecionarTecido(escolha){
    tecidos.forEach(element => {
        element.classList.remove('selecionado');
    })
    escolhaTecido = escolha.id;
    tecidoClasses = escolha.parentNode.classList;
    tecidoClasses.add('selecionado');
    ativarBotao();
    
}

function ativarBotao(){
    if (modeloClasses[2] == "selecionado" && golaClasses[2] == "selecionado" && tecidoClasses[2] == "selecionado"){
        botao.innerHTML = `<button onclick="mandarPedido();">Confirmar pedido</button>`
        botao.classList.add('botao-ativado');
        console.log(botao)
        pedidoEnviado.model = escolhaModelo;
        pedidoEnviado.neck = escolhaGola;
        pedidoEnviado.material = escolhaTecido;
        console.log(pedidoEnviado)
    }
}

function ultimosPedidos(){
    for(let i = 0; i < pedidosAPI.length; i++){
        pedidos.innerHTML += `
        <li>
            <img class="imagem-pedido" src="${pedidosAPI[i].image}" alt="Blusa1">
            <p><strong>Criador: </strong>${pedidosAPI[i].owner}</p>
        </li>
        `
    }    
};
