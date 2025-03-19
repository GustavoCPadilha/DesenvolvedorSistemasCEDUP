function media() {
    for (let i = 0; i < lista.length; i++) {
        soma += parseFloat(lista[i]);
    }
    console.log("A média dos números é:" + soma / lista.length);
}

var input = prompt("lista separado por vírgula: ");
var lista = input.split(",");
var soma = 0;

media();