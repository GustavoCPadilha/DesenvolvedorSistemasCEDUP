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
