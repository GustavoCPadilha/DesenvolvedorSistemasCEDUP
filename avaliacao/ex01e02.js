/*
1 - Receber um código binário e converter em palavra. Cada letra em
binário terá um total de 5 dígitos. É permitido receber a entrada com algum
limitador entre as letras, porém terá desconto na nota.
Exemplo de entrada:
001000100100001
Saída:
Dia

2 - No algoritmo acima desenvolva uma função que receba em string e
converta novamente em binário.
*/

function decimalPraBinario(num) {
    let binario = "";

    while (num > 0) 
    {
        binario = (num % 2) + binario;
        num = Math.floor(num / 2);
    }

    return binario.padStart(5, '0');
}


function stringPraBinario(str) 
{
    let alfabeto = "abcdefghijklmnopqrstuvwxyz";
    let resultado = "";

    for (let i = 0; i < str.length; i++) {
        let indice = alfabeto.indexOf(str[i].toLowerCase());
        let binario = decimalPraBinario(indice);
        resultado += binario;
    }

    return resultado;
}


var alfabeto = ["gambiarra", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var binario = "";
var lista = [];
var opcao = 0;

while (true)
{
    opcao = parseInt(prompt("Digite a opção desejada:\n[1] Binário para string\n[2] String para binário\n"))
    if (opcao == 1)
    {
        var temp = prompt("Digite uma palavra em binário: ");
        for (var i = 0; i < temp.length; i++)
        {   
            lista.push(temp[i]);
            if ((i + 1) % 5 == 0)
            {
                lista.push("-");
            }
        }

        for (var i = 0; i < lista.length; i++)
        {
            binario += lista[i];
        }

        binario = binario.split("-");
        var decimal = 0;
        var letra = '';
        var resultado = '';

        for (var i = 0; i < binario.length; i++)
        {
            decimal = parseInt(binario[i], 2);
            letra = alfabeto[decimal];
            if (letra)
            {
                resultado += letra
            }
        }
        console.log("Palavra:" + resultado);
    }
    else if (opcao == 2)
    {
        var string = prompt("Digite a string para passar pra binário: ");
        var result_binario = stringPraBinario(string);
        console.log(result_binario);
    }
}
