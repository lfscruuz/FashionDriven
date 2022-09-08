let modelos = document.querySelectorAll('.modelo');
let modeloClasses;
let escolhaModelo;
let golas = document.querySelectorAll('.gola');
let golaClasses;
let escolhaGola;
let tecidos = document.querySelectorAll('.tecido');
let tecidoClasses;
let escolhaTecido;
let imagem = document.querySelector('input');
let botao = document.querySelector('.botao');
let input = document.querySelector('input');
let pedidos = document.querySelector('.ultimos-pedidos');
let pedidosAPI;
let nome = prompt('Qual o seu nome?');
let pedidoEnviado = {
	model: escolhaModelo,
	neck: escolhaGola,
	material: escolhaTecido,
	image: 'https://cdn.rushordertees.com/design/ZoomImage.php?src=NTUyMTM2Mw_f&style=RT2000&colorCode=WHT&x=240&y=300&width=880&height=880&scale=1.7&watermark=false&autoInvertDesign=true',
	owner: nome,
	author: nome
}

const promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
const envioPedido = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
carregarPedidos();

function carregarPedidos(){
    promessa.then(resposta);
};

function mandarPedido(){  
    pedidos.innerHTML = ''
    if (ativarBotao){
        alert(`
        Seu pedido foi encomendado:
        Modelo: ${pedidoEnviado.model};
        Gola: ${pedidoEnviado.neck};
        Tecido: ${pedidoEnviado.material};
        `)
    }
    carregarPedidos();
}

function resposta(resposta){
    pedidosAPI = resposta.data;
    ultimosPedidos();
};

function selecionarModelo(escolha){
    modelos.forEach(element => {
        element.classList.remove('selecionado');
    });
    escolhaModelo = escolha.id;
    modeloEscolhido = escolha.parentNode.querySelector('p').innerHTML
    modeloClasses = escolha.parentNode.classList;
    modeloClasses.add('selecionado');
    ativarBotao();
};

function selecionarGola(escolha){
    golas.forEach(element => {
        element.classList.remove('selecionado');
    })
    escolhaGola = escolha.id;
    golaEscolhida = escolha.parentNode.querySelector('p').innerHTML
    golaClasses = escolha.parentNode.classList;
    golaClasses.add('selecionado');
    ativarBotao();    
}

function selecionarTecido(escolha){
    tecidos.forEach(element => {
        element.classList.remove('selecionado');
    })
    escolhaTecido = escolha.id;
    tecidoEscolhido = escolha.parentNode.querySelector('p').innerHTML
    tecidoClasses = escolha.parentNode.classList;
    tecidoClasses.add('selecionado');
    ativarBotao();
    
}

function validarURL(url) {
    const regra =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    return regra.test(url);
  }

function linkarImagem(){

    if (!validarURL(imagem.value)){
        alert('Essa URL não é válida!');
    }else{
        botao.innerHTML = `<button onclick="mandarPedido();">Confirmar pedido</button>`;
        botao.classList.add('botao-ativado');
        pedidoEnviado.model = escolhaModelo;
        pedidoEnviado.neck = escolhaGola;
        pedidoEnviado.material = escolhaTecido;
        pedidoEnviado.image = imagem.value;
    }
}

function ativarBotao(){
    if (modeloClasses[2] == "selecionado" && golaClasses[2] == "selecionado" && tecidoClasses[2] == "selecionado" && imagem.value.length > 0){
        linkarImagem();
    }
}

function ultimosPedidos(){
    for(let i = 0; i < pedidosAPI.length; i++){
        pedidos.innerHTML += `
        <li id="${pedidosAPI[i].id}" onclick="encomendarPronta(this);">
            <img class="imagem-pedido" src="${pedidosAPI[i].image}" alt="camisa${[i]}">
            <p><strong>Criador: </strong>${pedidosAPI[i].owner}</p>
        </li>
        `;
    }
    console.log(pedidosAPI);
    console.log(pedidos.innerHTML);
}

function encomendarPronta(encomenda){
    for (let i = 0; i < pedidosAPI.length; i++){
        if (pedidosAPI[i].id == encomenda.id){
            console.log(pedidosAPI[i])
            pedidoEnviado = {
                model: pedidosAPI[i].model,
                neck: pedidosAPI[i].neck,
                material: pedidosAPI[i].material,
                image: pedidosAPI[i].image,
                owner: pedidosAPI[i].owner,
                author: pedidosAPI[i].author
            }
            console.log(pedidoEnviado)
            if(confirm('tem certeza de que quer encomendar essa camiseta?')){
                mandarPedido();
            }
        } 
    }
}