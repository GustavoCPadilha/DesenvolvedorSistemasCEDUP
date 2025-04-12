console.log('1) Par ou Ímpar e Primo ou Não primo:');
var n = prompt('Digite um valor: ');
var cont = 0;
console.log('Número', n);

if (n % 2 == 0) {
    console.log('É par');
} else {
    console.log('É ímpar');
}

for (c = 1; c <= n; c++) {
    if (n % c == 0) {
        cont++;
    }
}
if (cont == 2) {
    console.log('É primo');
} else {
    console.log('Não é primo');
}
console.log('-='.repeat(55));

console.log('2) Sequência de Fibonacci:');
var x = prompt('Posição desejada: ');
var lista = [0, 1];
console.log('Posição', x);

for (i = 2; i <= x; i++) {
    lista[i] = lista[i-2] + lista[i-1];
}
console.log(lista[i-2]);

console.log('-='.repeat(55));
console.log('3) Conjunto de números em ordem crescente:');
var input = prompt('Digite valores separados por vírgula: ');
var numeros = input.split(',');
var numeros_ordenados = [];

console.log("Desorganizado: ", numeros);

for (i = 0; i < numeros.length; i++) {
    for (j = 0; j < numeros.length - 1 - i; j++) {
        if (numeros[j] > numeros[j+1]) {
            var temporaria = numeros[j];
            numeros[j] = numeros[j+1];
            numeros[j+1] = temporaria;
        }
    }
}

console.log("Ordenado: ", numeros);
console.log('Organizado: ', numeros_ordenados);
console.log('-='.repeat(55));

console.log('4) Calculadora:');

var n1 = prompt('Primeiro valor: ');
console.log('Primeiro número: ', n1);
var n2 = prompt('Segundo valor: ');
console.log('Segundo número: ', n2);
var opcao = prompt('Opção: \n [0] Soma\n [1] Subtração\n [2] Multiplicação\n [3] Divisão\n [4] Potência');
console.log('Opção: ', opcao);
var soma = n1 + n2;
var subtracao = n1 - n2;
var multiplicacao = n1 * n2;
var divisao = n1 / n2;
var potencia = n1 ** n2;

if (opcao == 0) {
    console.log('Soma =', soma);
}
if (opcao == 1) {
    console.log('Subtração =', subtracao);
}
if (opcao == 2) {
    console.log('Multiplicação =', multiplicacao);
}
if (opcao == 3) {
    console.log('Divisão =', divisao);
}
if (opcao == 4) {
    console.log('Potência =', potencia);
}
console.log('-='.repeat(55));

console.log('5) Validação de Dados: ');
var nome = prompt('Digite um nome: ');
var idade = prompt('Idade: ');
var salario = prompt('Salário: ');
var sexo = prompt('Sexo: ')[0];
var estado_civil = prompt('Estado Civil: ')[0];
var validacoes = {};

if (nome.length > 3) {
    validacoes['Nome'] = 'Validado';
} else {
    validacoes['Nome'] = 'Ínvalido';
}
if (0 <= idade <= 150){
    validacoes['Idade'] = 'Validado';
} else {
    validacoes['Idade'] = 'Invalidado';
} 
if (salario >= 0) {
    validacoes['Salario'] = 'Validado';
} else {
    validacoes['Salario'] = 'Inválidado';
}
if (sexo == 'f' || sexo == 'm') {
    validacoes['Sexo'] = 'Validado';
} else {
    validacoes['Sexo'] = 'Inválidado';
}
if (estado_civil == 's' || estado_civil == 'c' || estado_civil == 'd' || estado_civil == 'v') {
    validacoes['Estado Civil'] = 'Validado';
} else {
    validacoes['Estado Civil'] = 'Inválidado';
}
console.log(validacoes);
