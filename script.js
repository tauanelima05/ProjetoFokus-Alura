// CONST: SERVE PARA CRIAR VARIÁVEIS DO TIPO TEXTO
// AddEventListener(): SERVE PARA/CRIAR UM EVENTO.
// SetAttribute(): É UM ELEMENTO QUE SERVE PARA RECEBER DOIS PARAMETROS.
// ACTIVE: SERVE PARA ATIVAR O BOTÃO QUANDO CLICAR.
// CHANGE: É UM EVENTO QUE USA PARA PARA TRABALHAR COM INPUTS DO TIPO CHECKBOX (TRUE AND FALSE).
// -=: SERVE PARA DECREMENTAR (OU SEJA, SÃO OPERADORES UNITARIOS QUE AUMENTAM OU DIMINUEM O VALOR DE UMA VARIAVEL EM UMA UNIDADE, RESPECTIVAMENTE).
// setInterval: ELE PEGA DOIS PARAMETROS, O PRIMEIRO É "QUAL METODO QUE VAI SER EXECUTADO" E O SEGUNDO É "POR QUANTO TEMPO QUER Q SERJA EXECUTADO".
// clearInterval: SERVE PARA INTERROMPER A EXECUCAO DE ALGUM CÓDIGO. 
// 2-DIGIT: SERVE PARA COLOCAR 2 ZEROS DEPOIS DOS :.

const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

/* FOI CRIADO UMA LET POIS O VALOR VAI SER ALTERADO DINAMICAMENTE */
/* DEIXANDO O TEMPORIZADOR COM 25 MIN*/
let tempoDecorridoEmSegundos = 1500

let intervaloId = null

/* COMANDO SERVE PARA A MUSICA FICAR TOCANDO REPETIDAMENTE ATÉ PAUSAR */
musica.loop = true;

/* COMANDO SERVE PARA QUANDO CLICAR NO INPUT TOCAR A MUSICA OU DESLIGAR */
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

/* COMANDO SIMPLIFICADO QUE SERVE PARA CRIAR UM EVENTO DE CLIQUE NOS BOTOES E MUDAR A FT, COR E TEXTO DE ACORDO COM O BOTAO */
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    /* COMANDO PARA QUANDO CLICAR NO BOTÃO ELE APLICAR UM ESTILO */
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    /* COMANDO PARA QUANDO CLICAR EM UM BOTAO REMOVER O ESTILO DE OUTRO BOTAO */ 
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    /* COMANDO PARA MUDAR O TEXTO */
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

/* COMANDO PARA DECREMENTAR/DMINUIR O TEMPO */
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        /*COMANDO PARA O AUDIO TOCAR */
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);

/* COMANDO PARA DEFINIR EM QUANTO TEMPO QUE VAI SER EXECUTADO, O VALOR 1000 É= 1 POIS RECEBE EM MILESEGUNDOS */
function iniciarOuPausar() {
    /* COMANDO PARA INTERROMPER A EXECUCAO DO CODIGO */
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    /*COMANDO PARA DEIXAR COM 25:00 MIN */
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()










// ------- ATTRIBUTE ------- //

/* getAttribute - COMANDO SERVE PARA OBTER O VALOR DE UM ATRIBUTO ESPECIFICO DE UM ELEMENTO HTML*/ 
// HTML: <div id="meuElemento" data-info="Exemplo de atributo">
/* const elemento = document.getElementById('meuElemento');
const valorDoAtributo = elemento.getAttribute('data-info');
console.log(valorDoAtributo); // Saída: "Exemplo de atributo"*/

/* setAttribute - COMANDO SERVE PARA DEFINIR OU MODIFICAR O VALOR DE UM ATRIBUTO EM UM ELEMENTO HTML*/ 
// HTML: <p id="meuParagrafo">Texto inicial</p>
/* const paragrafo = document.getElementById('meuParagrafo');
paragrafo.setAttribute('id', 'paragrafoModificado');
paragrafo.setAttribute('data-novo-atributo', 'Novo valor');*/

/* hasAttribute - COMANDO SERVE PARA VERFIFICAR SE O ELEMENTO POSSUI UM ATRIBUTO ESPECIFICO */
// HTML: <a href="https://www.exemplo.com" id="meuLink">Link de exemplo</a>
/* const link = document.getElementById('meuLink');
const temHref = link.hasAttribute('href');
console.log(temHref); // Saída: true
const temTarget = link.hasAttribute('target');
console.log(temTarget); // Saída: false */

/* removeAttribute - COMANDO SERVE PARA REMOVER UM ATRIBUTO ESPECIFICO DE UM ELEMENTO HTML */
// HTML: <img src="imagem.jpg" alt="Imagem de exemplo" id="minhaImagem">
/* const imagem = document.getElementById('minhaImagem');
imagem.removeAttribute('alt'); */


// ------- CLASSLIST ------- //

/* classList.add - COMANDO SERVE PARA ADICIONAR UMA CLASSE A UM ELEMENTO HTML, Este método aceita o nome da classe como argumento e adiciona a classe ao elemento, se ela ainda não estiver presente.
const element = document.getElementById('meuElemento');
element.classList.add('minhaClasse'); */

/* classList.remove - COMANDO SERVE PARA REMOVER UMA CLASSE DE UM ELEMENTO HTML, Este método aceita o nome da classe como argumento e remove a classe do elemento, se ela estiver presente.
const element = document.getElementById('meuElemento');
element.classList.remove('minhaClasse'); */

/* classList.toggle - COMANDO SERVE PARA PERMITIR ALTERNAR UMA CLASSE EM UM ELEMENTO, Se a classe já estiver presente no elemento, o método a remove; caso contrário, ele a adiciona. 
const element = document.getElementById('meuElemento');
element.classList.toggle('minhaClasse'); */

/* classList.contains - COMANDO SERVE PARA VERIFICAR SE UMA CLASSE ESTÁ PRESENTE E ASSOCIADA A UM ELEMENTO. 
const element = document.getElementById('meuElemento');
if (element.classList.contains('minhaClasse')) {
  // A classe 'minhaClasse' está presente no elemento
  // Faça algo aqui...
} */

/* substituindo classes - COMANDO SERVE PARA SUBSTITUIR UMA CLASSE POR OUTRA USANDO OS METODOS add() E remove() EM SEQUENCIA. COMO FEITO NO CURSO.
const element = document.getElementById('meuElemento');
element.classList.remove('classeAntiga');
element.classList.add('classeNova'); */

/* Manipulando várias classes simultaneamente - COMANDO SERVE PARA ADICIONAR OU REMOVER VARIAS CLASSES DE UMA VEZ USANDO O METODO add() ou remove() PASSANDO VARIOS ARGUMENTOS SEPARADOS POR VIRGULA.
const element = document.getElementById('meuElemento');
element.classList.add('classe1', 'classe2', 'classe3');
element.classList.remove('classe2', 'classe3'); */


// ------- OBJETO - AUDIO ------- //

/* Para criar um novo objeto ‘Audio’, podemos simplesmente usar a seguinte sintaxe:
const audioElement = new Audio('caminho/do/arquivo-de-audio.mp3');

/* Exemplo de utilização dos métodos do objeto Audio:
const audioElement = new Audio('caminho/do/arquivo-de-audio.mp3');
audioElement.play(); // Inicia a reprodução
audioElement.pause(); // Pausa a reprodução
audioElement.currentTime = 10; // Move para 10 segundos no áudio
audioElement.volume = 0.5; // Define o volume para metade (50%)
*/


// ------- PROPRIEDADES ------- //

/* parentNode - É UTILIZADA PARA ACESSA O NÓ PAI DE UM ELEMENTO DOM, POR MEIO DELA PODEMOS NAVEGAR PELA ARVORE DOM EM DIRECAO AO NO PAI DO ELEMENTO ATUAL.
const paragraph = document.querySelector('p');
const parentElement = paragraph.parentNode;
console.log(parentElement.id); // Saída: "container"  */

/* childNodes - É UTILIZADA PARA ACESSAR TODOS OS NÓS FILHOS DE UM ELEMENTO NO DOM, ELA RETORNA UMA LISTA DE NÓS INCLUINDO NÓS DE TEXTO E ELEMENTOS HTML.
const paragraph = document.querySelector('p');
const parentElement = paragraph.parentNode;
console.log(parentElement.id); // Saída: "container" */

/* nextElementSibling - ESSA PROPRIEDADE PERMITE ACESSAR O PROXIMO IRMAO (NÓ ADJECENTE) DE UM ELEMENTO NO DOM. 
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
const item1 = document.querySelector('li:first-child');
const item2 = item1.nextElementSibling;
console.log(item2.textContent); // Saída: "Item 2" */

/* previousElementSobling - ESSA PROPRIEDADE SERVE PARA ACESSAR O IRMAO INTERIOR (NÓ ADJECENTE) DE UM ELEMENTO DOM.
const item3 = document.querySelector('li:last-child');
const item2 = item3.previousElementSibling;
console.log(item2.textContent); // Saída: "Item 2" */


// ------- OBJETO DATE ------- //

/* SERVE PARA FORMATAR MINUTOS E SEGUNDOS, E É POSSIVEL UTILIZAR PARA OUTRAS FUNCIONAR, COMO MANIPULAR E EXIBIR DATAS E HORAS NO CÓDIGO */

/* Construtor sem argumentos:
const dataAtual = new Date();
*/

/* Construtor com argumentos (ano, mês, dia, hora, minuto, segundo, milissegundo):
const dataEspecifica = new Date(2023, 7, 3, 12, 30, 0, 0);
*/

/* Construtor com uma string que representa a data (formato padrão é "yyyy-mm-dd"):
const data = "2023-08-03";
const formatoDeData = new Date(dateString);
*/

/* Uma vez criado um objeto Date, você pode acessar informações específicas da data e hora, como o ano, mês, dia, hora, minuto e segundo usando os métodos de acesso do objeto:
const currentDate = new Date();

const ano = currentDate.getFullYear();  // Acessa o ano
const mês = currentDate.getMonth(); // Acessa o mês - Janeiro é 0, Fevereiro é 1, ..., Dezembro é 11
const dia = currentDate.getDate(); // Acessa o dia
const horas = currentDate.getHours(); // Acessa as horas 
const minutos = currentDate.getMinutes(); // Acessa os minutos
const segundos = currentDate.getSeconds(); // Acessa os segundos
const milissegundos = currentDate.getMilliseconds();  // Acessa os milissegundos 
*/

/* Você também pode modificar a data e hora usando os métodos de definição:
const data = new Date();

data.setFullYear(2024);  // Define o ano
data.setMonth(10); // Define o mês
data.setDate(25); // Define o dia
data.setHours(10);  // Define as horas
data.setMinutes(30); // Define os minutos
data.setSeconds(0); // Define os segundos
*/

/*Além disso, o objeto ‘Date’ também fornece vários métodos para trabalhar com datas, como comparar datas, adicionar ou subtrair períodos de tempo, obter o dia da semana, entre outros. */

