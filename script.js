/**
 * Jarod Mateus - 2020
 * jarodsim@gmail.com
 * jarodmateus.herokuapp.com
    @description script do jogo da velha
 */

const player1 = 'X';
const player2 = 'O';
var vezJogador = player1;
var gameOver = false;


atualizaMostrador();
inicializarEspacos();

function atualizaMostrador() {
    if (gameOver == true) {
        return;
    }
    if (vezJogador == player1) {
        //vai ver se é a vez do jogador e setar a imagem dele
        var player = document.querySelectorAll("div#mostrador img")[0];
        player.setAttribute("src", "imagens/x.png");
    } else {
        var player = document.querySelectorAll("div#mostrador img")[0];
        player.setAttribute("src", "imagens/o.png");
    }
}


function inicializarEspacos() {
    var espacos = document.getElementsByClassName('espaco');
    for (var i = 0; i < espacos.length; i++) {
        // o que será executado quando houver o click, dentro de cadas espaço
        espacos[i].addEventListener('click', function () {
            if (gameOver == true) {
                return;
            }

            if (this.getElementsByTagName('img').length == 0) {
                if (vezJogador == player1) {
                    this.innerHTML = '<img src="imagens/x.png">';
                    this.setAttribute('jogada', player1);
                    vezJogador = player2;
                } else {
                    this.innerHTML = '<img src="imagens/o.png">';
                    this.setAttribute('jogada', player2);
                    vezJogador = player1;
                }
            }
            //para depois exibir o próximo jogador
            atualizaMostrador();
            //depois que clicar, verificar se há um vencedor
            verificarVencedor();
        });
    }
}


async function verificarVencedor() {
    var a1 = document.getElementById('a1').getAttribute('jogada');
    var a2 = document.getElementById('a2').getAttribute('jogada');
    var a3 = document.getElementById('a3').getAttribute('jogada');

    var b1 = document.getElementById('b1').getAttribute('jogada');
    var b2 = document.getElementById('b2').getAttribute('jogada');
    var b3 = document.getElementById('b3').getAttribute('jogada');

    var c1 = document.getElementById('c1').getAttribute('jogada');
    var c2 = document.getElementById('c2').getAttribute('jogada');
    var c3 = document.getElementById('c3').getAttribute('jogada');

    var vencedor = "";

    if ((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "")) {
        vencedor = a1;
    } else if ((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")) {
        vencedor = b2;
    } else if ((c3 == c2 && c3 == c1 && c3 == "") || (c3 == a3 && c3 == b3) || (c1 == c2 && c1 == c3) && c3 != "") {
        vencedor = c3;
    } else if (a1 != "" && a2 != "" && a3 != "" && b1 != "" && b2 != "" && b3 != "" && c1 != "" && c2 != "" && c3 != "") {
        await sleep(50);
        alert('Deu velha')
        await sleep(1500);
        resetar();
    }

    if (vencedor != "") {
        gameOver == true;

        //função para esperar antes do alert
        await sleep(50);
        alert(`O ganhador foi o: ${vencedor}`);
        await sleep(1500);
        resetar();
    }
}

//uma promisse
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// função para resetar o jogo
function resetar() {
    window.location.reload();
}