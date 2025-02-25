n = 10;
cont = 0;

console.log('1) Par ou Ímpar e Primo ou Não primo:');
console.log('Número', n);

if (n % 2 == 0) {
    console.log('É par');
} else {
    console.log('É ímpar');
}

for (c = 1; c <= n; c++) {
    if (n % c === 0) {
        cont++;
    }
}
if (cont == 2) {
    console.log('É primo');
} else {
    console.log('Não é primo');
}
console.log('-=-=-=-=-=-=')

x = 5;
lista = [0, 1];

console.log('2) Sequência de Fibonacci:');
console.log('Posição', x);

for (i = 2; i <= x; i++) {
    lista[i] = lista[i-2] + lista[i-1];
}
console.log(lista[i-2]);

console.log('-=-=-=-=-=-=');
console.log('3) Conjunto de números em ordem crescente:');

numeros = [2, 7, 5, 1];
console.log("Desorganizado: ", numeros);
numeros.sort();
console.log('Organizado: ', numeros);
console.log('-=-=-=-=-=-=');

console.log('4) Calculadora:');

n1 = 10;
n2 = 8;
opcao = 1;
soma = n1 + n2;
subtracao = n1 - n2;
multiplicacao = n1 * n2;
divisao = n1 / n2;
potencia = n1 ** n2;

console.log('Primeiro número: ', n1);
console.log('Segundo número: ', n2);
console.log('Opção: ', opcao);

if (opcao == 0) {
    console.log('Soma: ', soma);
}
if (opcao == 1) {
    console.log('Subtração', subtracao);
}
if (opcao == 2) {
    console.log('Multiplicação', multiplicacao);
}
if (opcao == 3) {
    console.log('Divisão', divisao);
}
if (opcao == 4) {
    console.log('Potência', potencia);
}
console.log('-=-=-=-=-=-=');

console.log('5) Validação de Dados: ');
nome = 'Gustavo'
console.log(nome)

