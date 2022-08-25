
let usuario = "";
function login(){
    
    usuario = document.querySelector('.login-input').value;
    document.querySelector('.login-input').value = "";
    console.log(usuario);
    if (usuario !== undefined){
        const fecharTelaLogin = document.querySelector('.login-pagina');
        fecharTelaLogin.classList.add('esconder');
        const mostrarMensagens = document.querySelector('.pagina');
        mostrarMensagens.classList.remove('esconder');
    }
}



















let tipo = "";
let mensagens=[];
function pegarDados(){

const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promessa.then(processarRespota);

}
pegarDados();

function processarRespota (resposta){
  
    mensagens = resposta.data;
    console.log(mensagens);
    renderizarMensagens ();
}

function renderizarMensagens () {
    const ul = document.querySelector('.caixa-mensagens');

    ul.innerHTML="";

    for( let i = 0 ; i < mensagens.length; i++){
        tipo = mensagens[i].type;
        if (tipo == 'message'){
        ul.innerHTML = ul.innerHTML + `
        <li class="mensagem-chat">
        <p class="mensagem">
            <span class="hora">${mensagens[i].time}</span>
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
            <span class="hora">${mensagens[i].time}</span>
            <span class="usuario">${mensagens[i].from}</span> ${mensagens[i].text}
        </p>
    </li>`;
    
    

}
}
}
renderizarMensagens ()