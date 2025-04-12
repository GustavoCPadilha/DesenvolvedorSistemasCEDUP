/*
Receber o nome e sobrenome de uma pessoa em uma string e colocar
as primeiras letras maiúsculas, exceto se for de, do ou da. Retornar o nome
devidamente formatado.
Ex.: string de entrada: pedro nascimento da silva
Saída: Pedro Nascimento da Silva
*/

function formatarNome(nomeCompleto) {
    var excecoes = ['de', 'do', 'da'];

    var palavras = nomeCompleto.toLowerCase().split(' ');

    for (var i = 0; i < palavras.length; i++) {
        if (excecoes.includes(palavras[i])) {
        } else {
            palavras[i] = palavras[i][0].toUpperCase() + palavras[i].slice(1);
        }
    }

    return palavras.join(' ');
}

var entrada = prompt("Digite seu nome completo: ");
var nomeFormatado = formatarNome(entrada);
console.log(nomeFormatado); 
