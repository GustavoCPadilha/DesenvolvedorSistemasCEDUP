class ContaBancaria {
    constructor (conta, nome, saldo) {
        this.conta = conta;
        this.nome = nome;
        this.saldo = saldo;
    }
    deposito (valor) {
        this.saldo += valor;
        console.log(`Deposito de ${valor} realizado! Saldo atual = ${this.saldo}`);
    }
    saque (valor) {
        this.saldo -= valor;
        console.log(`Saque de ${valor} realizado! Saldo atual = ${this.saldo}`);
    }
}

const gustavo = new ContaBancaria(1234, "Gustavo", 1000);

