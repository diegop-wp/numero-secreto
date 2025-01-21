let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto =gerarNumeroAleatorio();
let tentativas = 1;


function exebirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML =texto;
    if ('speechSynthesis' in window) {
      let utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR'; 
      utterance.rate = 1.2; 
      window.speechSynthesis.speak(utterance); 
  } else {
      console.log("Web Speech API não suportada neste navegador.");
  }
}
function mensagemInicial(){
  exebirTextoNaTela('h1','jogodo numero secreto');
   exebirTextoNaTela('p','escolha um numero de 1 a 50 ');

}

mensagemInicial();


function verificarChute(){
  let chute = document.querySelector('input').value
   
  if(chute==numeroSecreto){
    exebirTextoNaTela ('h1','Acertou!');
    let palavraTentativa = tentativas>1?  'tentativas': 'tentativa';
    let mensagemTentativas  = `você descobriu numero secreto com ${tentativas} ${palavraTentativa}`;
    exebirTextoNaTela('p',mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled'); 
  }else{
    if(chute>numeroSecreto){
      exebirTextoNaTela('p','o numero secreto é menor');
    }else{
      exebirTextoNaTela('p','o numero secreto é maior');
    }

    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
   
   if(quantidadeDeElementosNaLista == 3){
    listaDeNumerosSorteados = [];
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido) ){
    return gerarNumeroAleatorio();
   }else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido
   }
}

function limparCampo(){
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo(){
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  mensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled',true);
}