var conta_bancaria = {};
var deposito = 0;
var saque = 0;

conta_bancaria['numero_conta'] = prompt('Número da conta: ');
console.log('Número da conta:', conta_bancaria['numero_conta']);
conta_bancaria['nome_titular'] = prompt('Nome do titular: ');
console.log('Nome do titular:', conta_bancaria['nome_titular']);
conta_bancaria['saldo'] = 0;
conta_bancaria['saldo'] = prompt('Saldo atual da conta: ');

while (opcao != 2) {
    console.log('Saldo atual:', conta_bancaria['saldo']);
    var opcao = prompt('Selecione uma operação: \n[0] Depósito\n[1] Saque\n[2] Sair');
    if (opcao == 0) {
        var deposito = prompt('Que valor deseja depositar?');
        conta_bancaria['saldo'] += deposito;
        var deposito = 0;
    }
    if (opcao == 1) {
        var saque = prompt('Que valor deseja sacar?');
        conta_bancaria['saldo'] -= saque;
        var saque = 0;
    }
}
console.log(conta_bancaria);
}
