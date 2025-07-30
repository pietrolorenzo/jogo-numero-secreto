let listaNumSorteados = [];
let numLimite = 10;
let numSecreto = gerarNumAleatorio();
console.log(numSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
exibirTextoNaTela();

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p","Escolha um número entre 1 e 10");
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numSecreto){
        exibirTextoNaTela("h1", "Acertou!!!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if(chute > numSecreto){
            limparCampo();
            exibirTextoNaTela("p", `O número secreto é menor que ${chute}`);
        }else{
            limparCampo();
            exibirTextoNaTela("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
    }
}

function gerarNumAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numLimite + 1);
    let quantidadeElementosLista = listaNumSorteados.length;

    if(quantidadeElementosLista == numLimite){
        listaNumSorteados = [];
    }

    if (listaNumSorteados.includes(numeroEscolhido)){
        return gerarNumAleatorio();
    }else{
        listaNumSorteados.push(numeroEscolhido);
        console.log(listaNumSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input")
    chute.value = "";
}

function reiniciarJogo(){
    numSecreto = gerarNumAleatorio();
    limparCampo();
    exibirMensagemInicial();
    tentativas = 1;
}