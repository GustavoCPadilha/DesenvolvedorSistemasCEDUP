function jogoVelha(matriz) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (j == 2) {
                process.stdout.write(matriz[i][j]);
            } else {
                process.stdout.write(matriz[i][j] + ' | ');
            }
        }
        if (i != 2) {
            console.log('\n---------');
        }
    }
}

function testaNumero(numero) {
    return numero >= 0 && numero <= 2;
}

function checaVitoria(matriz, player) {
    for (var i = 0; i < 3; i++) {
        if (matriz[i][0] == player && matriz[i][1] == player && matriz[i][2] == player) {
            return true;
        }
        if (matriz[0][i] == player && matriz[1][i] == player && matriz[2][i] == player) {
            return true;
        }
    }
    if (matriz[0][0] == player && matriz[1][1] == player && matriz[2][2] == player) {
        return true;
    }
    if (matriz[0][2] == player && matriz[1][1] == player && matriz[2][0] == player) {
        return true;
    }
    return false;
}

function checaEmpate(matriz) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (matriz[i][j] == '-') {
                return false;
            }
        }
    }
    return true;
}

function obterPosicao(mensagem) {
    try {
        var pos = parseInt(prompt(mensagem)) - 1;
        if (isNaN(pos) || pos < 0 || pos > 2) throw "Posição inválida!";
        return pos;
    } catch (erro) {
        console.log(erro);
        return obterPosicao(mensagem);
    }
}

var matriz = [['-','-','-'],['-','-','-'],['-','-','-']];

jogoVelha(matriz);
while(true) {
    // Jogador 1
    var posicaoLinha1 = obterPosicao('\nJogador 1, faça sua jogada:\nPosição da linha:');
    var posicaoColuna1 = obterPosicao('Posição da coluna:');
    while (matriz[posicaoLinha1][posicaoColuna1] != '-') {
        console.log('Posição inválida, digite outra posição: ');
        posicaoLinha1 = obterPosicao('\nJogador 1, faça sua jogada:\nPosição da linha:');
        posicaoColuna1 = obterPosicao('Posição da coluna:');
    }
    matriz[posicaoLinha1][posicaoColuna1] = 'X';
    jogoVelha(matriz);

    if (checaVitoria(matriz, 'X')) {
        console.log('\nJogador 1 venceu!');
        break;
    }

    if (checaEmpate(matriz)) {
        console.log('\nTemos um empate!');
        break;
    }

    // Jogador 2
    var posicaoLinha2 = obterPosicao('\nJogador 2, faça sua jogada:\nPosição da linha:');
    var posicaoColuna2 = obterPosicao('Posição da coluna:');
    while (matriz[posicaoLinha2][posicaoColuna2] != '-') {
        console.log('Posição inválida, digite outra posição: ');
        posicaoLinha2 = obterPosicao('\nJogador 2, faça sua jogada:\nPosição da linha:');
        posicaoColuna2 = obterPosicao('Posição da coluna:');
    }
    matriz[posicaoLinha2][posicaoColuna2] = 'O';
    jogoVelha(matriz);

    if (checaVitoria(matriz, 'O')) {
        console.log('\nJogador 2 venceu!');
        break;
    }

    if (checaEmpate(matriz)) {
        console.log('\nTemos um empate!');
        break;
    }
}
