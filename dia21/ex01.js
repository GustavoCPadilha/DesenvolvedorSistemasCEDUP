class Circulo {
    constructor (raio) {
    this.raio = raio;
    }
    area() {
        let area = 3.14159 * Math.pow(this.raio);
        console.log(`A área do círculo é de ${area}`);
    }
    perimetro() {
        let perimetro = 2 * 3.14159 * this.raio;
        console.log(`O perímetro do círculo é de ${perimetro}`);
    }
}

const circulo = new Circulo(11);

area();
perimetro();
