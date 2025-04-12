class Retangulo {
    constructor (largura, altura) {
        this.largura = largura;
        this.altura = altura;
    }
    area() {
        let area = this.largura * this.altura;
        console.log(`A área de um retângulo de ${this.largura} de largura por ${this.altura} de altura é de: ${area}`);
    }
    perimetro() {
        let perimetro = this.largura * 2 + this.altura * 2;
        console.log(`O perimetro de um retângulo de ${this.largura} de largura por ${this.altura} de altura é de: ${perimetro}`);
    }
}

const retangulo = new Retangulo(10, 15);

area();
perimetro();
