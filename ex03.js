var n = parseInt(prompt("Digite um número para ver seu fatorial: "));
var fatorial = 1;
for (i = n; i > 0; i--) {
    fatorial *= i;
}

console.log(`O fatorial de ${n} é: ${fatorial}`);