
let usuario;
function login(){

    
    usuario = document.querySelector('.login-input').value;
   const nomeUsuario = {
    name: usuario
   }
    console.log(usuario);

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nomeUsuario);
    promessa.then(podeEntrar)
    promessa.catch(naoPodeEntrar);

  
}

function naoPodeEntrar (erro){
console.log(erro);
alert ('Nome indisponível, favor entrar com outro nome!!!');
}

function podeEntrar (){
   
        const fecharTelaLogin = document.querySelector('.login-pagina');
        fecharTelaLogin.classList.add('esconder');
        const mostrarMensagens = document.querySelector('.pagina');
        mostrarMensagens.classList.remove('esconder');
        pegarDados();
        setInterval (pegarDados,3000);
        verificarStatus();
        setInterval (verificarStatus,5000);
       
}

function verificarStatus (){
    const conectado = {
        name:usuario
    };
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',conectado);
    promessa.then(usuarioON);
    promessa.catch(usuarioOff);
}

function usuarioON (resposta){
    console.log(resposta);
}

function usuarioOff (erro){
    console.log(erro);
   
}


let tipo = "";
let mensagens=[];

function pegarDados(){

const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promessa.then(processarRespota)
promessa.catch(deuErro);

}


function processarRespota (resposta){
  
    mensagens = resposta.data;
   console.log(resposta);
    renderizarMensagens ();
}

function deuErro(erro){
    console.log(erro);
    alert('Algo deu errado, favor entrar com outro nome!');
}

function renderizarMensagens () {
    const ul = document.querySelector('.caixa-mensagens');
    
    ul.innerHTML="";

    for( let i = 0 ; i < mensagens.length; i++){
        tipo = mensagens[i].type;
        if (tipo == 'message'){
        ul.innerHTML += `
        <li class="mensagem-chat">
        <p class="mensagem">
            <span class="hora">(${mensagens[i].time})</span>
            <span class="usuario">${mensagens[i].from}</span> para <span class="destinatario">${mensagens[i].to}</span>: ${mensagens[i].text}
                                   
        </p>

    </li>
        `;
    } 
    else if(tipo == 'status'){
        
        ul.innerHTML = ul.innerHTML + 
        `
        <li class="mensagem-entrou-saiu">
        <p class="mensagem">
            <span class="hora">(${mensagens[i].time})</span>
            <span class="usuario">${mensagens[i].from}</span> ${mensagens[i].text}
        </p>
    </li>`;
} else if(tipo == 'private_message'){
    if (usuario === mensagens[i].to || usuario === mensagens[i].from){
    ul.innerHTML += `
    <li class="mensagem-privada">
        <p class="mensagem">
            <span class="hora">(${mensagens[i].time})</span>
            <span class="usuario">${mensagens[i].from}</span> reservadamente para <span class="destinatario">${mensagens[i].to}</span>: ${mensagens[i].text}
        </p>
    </li>`
}
    
}
}
ultimaMensagem();
}


function ultimaMensagem (){
    const scrollUltima = document.querySelector('.caixa-mensagens li:last-child');
    scrollUltima.scrollIntoView();
    console.log(scrollUltima);
}

function enviarMensagem(){

    const textoMensagem = document.querySelector('.enviar-mensagem');
    let novaMensagem = {
        from:usuario,
	    to:"Todos",
	    text:textoMensagem.value,
	    type:"message" 
    };

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',novaMensagem);
    promessa.then(pegarDados)
    promessa.catch(mensagemNaoEnviada);

renderizarMensagens();

textoMensagem.value="";
}

function mensagemNaoEnviada (erro){
    console.log(erro);
    alert ('mensagem não enviada')
  
}

function enviarComEnter (event){
    let tecla = event.key;
    if (tecla ==="Enter"){
        enviarMensagem();
}
}