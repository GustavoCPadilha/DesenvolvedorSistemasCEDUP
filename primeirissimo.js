class Produto{
    constructor (codigo, nome, preco, quantidade) {
        this.cod = codigo;
        this.nome = nome;
        this.preco = preco;
        this.quant = quantidade;
    }
    vender(quantidade) {
        this.quant -= quantidade;
        console.log("Venda realizada. Quantidade atual do produto: "+ this.quant);
    }
    repor(quantidade) {
        this.quant += quantidade;
        console.log("Reposição de estoque completa. Quantidade atual do produto: "+ this.quant);
    }
    verificar() {
        console.log("A quantidade atual do produto é de: "+ this.quant);
    }
    valor(preco) {
        this.preco = preco;
        console.log("O novo preço é de: "+ this.preco);
    }
}

const laranja = new Produto (1, "laranja", 9.99, 150);
const maca = new Produto (2, "Maça", 4.89, 40);

