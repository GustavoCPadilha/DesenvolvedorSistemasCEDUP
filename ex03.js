function depositar(deposito) {
    var deposito = parseFloat(prompt("Que valor deseja depositar?"));
    if (deposito > 1000) {
        console.log("Nenhum depósito pode ser maior que R$1000,00 por vez")
    }
    else {
        conta_bancaria["saldo"] += deposito;
    }
}

function sacar(saque) {
    var saque = parseFloat(prompt("Que valor deseja sacar?"));
    if (saque > conta_bancaria["saldo"]) {
        console.log('ERRO! Saldo insuficiente.')
    }
    else {
        conta_bancaria["saldo"] -= saque;
    }
}

function saldo() {
    console.log("Seu saldo é de:", conta_bancaria["saldo"])
}
var conta_bancaria = {};

conta_bancaria["numero_conta"] = parseInt(prompt("Número da conta: "));
conta_bancaria["nome_titular"] = prompt("Nome do titular: ");
conta_bancaria["saldo"] = 0;
conta_bancaria["saldo"] = parseFloat(prompt("Saldo atual da conta: "));
console.log(conta_bancaria);

while (true) {
    var opcao = parseInt(prompt("Selecione uma operação: \n[0] Depósito\n[1] Saque\n[2] Verificar saldo\n[3] Sair"));
    switch (opcao) {
        case 0:
            depositar();
            break;
        case 1:
            sacar();
            break;
        case 2:
            saldo();
            break;
        case 3:
            console.log("Volte sempre ao Banco do Gustavo!");
            break;
        default:
            console.log("Opção inválida! Tente novamente.");
    }
}

function aritmetica() {   
    var soma = 0
    for (i = 0; i < lista.length; i++) {
    soma = soma + parseFloat(lista[i]);
    }
    var media = soma / lista.length;
    console.log(media)
}

var input = prompt('Digite uma lista de números separados por vírgula');
var lista = input.split(",");
aritmetica(lista)

function maior(num1, num2, num3){
    var ma = 0;
    if (num1 > num2 && num1 > num3){
        ma = num1;
    }
    else if (num2 > num1 && num2 > num3){
        ma = num2;
    }
    else if (num3 > num1 && num3 > num2){
        ma = num3;
    }
}
function menor(num1, num2, num3){
    var me = 0;
    if (num1 < num2 && num1 < num3){
        me = num1;
    }
    else if (num2 < num1 && num2 < num3){
        me = num2;
    }
    else if (num3 < num1 && num3 < num2){
        me = num3;
    }
}

var n1 = prompt('Primeiro número: ');
var n2 = prompt('Segundo número: ');
var n3 = prompt('Terceiro número: ');
maior(n1, n2, n3);
console.log('O maior valor é:', ma);
menor(n1, n2, n3);
console.log('O menor valor é:', me);
