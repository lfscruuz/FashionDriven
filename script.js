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
let nome = prompt('QUAL O SEU NOME?');
let pedidoEnviado = {
	model: escolhaModelo,
	neck: escolhaGola,
	material: escolhaTecido,
	image: 'https://cdn.rushordertees.com/design/ZoomImage.php?src=NTUyMTM2Mw_f&style=RT2000&colorCode=WHT&x=240&y=300&width=880&height=880&scale=1.7&watermark=false&autoInvertDesign=true',
	owner: nome,
	author: nome
}

carregarPedidos();

function carregarPedidos(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promessa.then(resposta);
};

function resposta(response){
    pedidosAPI = response.data;
    ultimosPedidos();
};

function tratarErro(erro){
    if (erro.response.status == 404 || erro.response.status == 422){
        alert('Ops, não conseguimos processar sua encomenda')
    }
}

function mandarPedido(){  
    const envioPedidos = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', pedidoEnviado);
    envioPedidos.catch(tratarErro)
    pedidos.innerHTML = ''
    if (ativarBotao){
        alert(`
        CONFIRME SEU PEDIDO:
        Modelo: ${pedidoEnviado.model};
        Gola: ${pedidoEnviado.neck};
        Tecido: ${pedidoEnviado.material};
        `)
    }
    carregarPedidos();
}

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
    for (let i = 0; i < 3; i++){
        if (i == 2){
            if (modeloClasses[i] == "selecionado" && golaClasses[i] == "selecionado" && tecidoClasses[i] == "selecionado" && imagem.value.length > 0){
                linkarImagem();
            }
        }
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
        console.log(`foi casmisa ${i}`)
    }
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
                author: nome,
                owner: pedidosAPI[i].owner
            }
            if(confirm('tem certeza de que quer encomendar essa camiseta?')){
                mandarPedido();
            }
        } 
    }
}