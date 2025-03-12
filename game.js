/* 
Crie a classe guerreiro que tem como atributos HP, ataque e defesa. Além disso,
deve ser criado o método atacar, que calcula o valor de ataque do agressor, menos o valor da defesa
do defensor, tirando o valor restante do HP de quem está sendo atacado. Fazer os dois lutarem até que
algum dos personagens não tenha mais HP. Após isso, tente acrescentar o uso de poções de regeneração, armas
que regenerem HP, ataques críticos...
*/


class Guerreiro {
    constructor (nome, hp, ataque, defesa, escudo) {
        this.nome = nome;
        this.hp = hp;
        this.ataque = ataque;
        this.defesa = defesa;
        this.escudo = escudo;
    }
    atacar (player_2) {
        player_2.hp -= this.ataque - player_2.defesa - player_2.escudo;
    }
    defender () {
        this.escudo += 100;        
    }
    pocao () {
        if (this.hp > 1000) {
            console.log("Vida máxima atingida!");
        }
        else {
            this.hp += 200;
        }
    }
}

const pudim = new Guerreiro ("Pudim", 700, 350, 150, 0); // Nome, HP, Ataque, Defesa, Escudo
const isabeli = new Guerreiro ("Isabeli", 300, 200, 150, 0); // Nome, HP, Ataque, Defesa, Escudo

let minimo = 1;
let maximo = 3;

console.log(pudim.hp, pudim.ataque, pudim.defesa);

while (pudim.hp > 0 || isabeli.hp > 0) 
{
    acao = parseInt(prompt("O que deseja fazer? \n[1] Atacar\n[2] Defender\n[3] Poção regenerativa (+300HP)")); 
    var opcao_aleatoria = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    console.log(opcao_aleatoria);

    switch (acao) {
        case 1:
            pudim.atacar(isabeli);
            console.log("A vida atual da isabeli é de: "+  isabeli.hp);            
            break;
        case 2:
            pudim.defender();
            break;
        case 3:
            pudim.pocao();
            console.log("A sua vida atual é de: "+  pudim.hp);
            break;
        default:
            console.log("Ação inválida! Tente novamente. ");
        }
    switch (opcao_aleatoria) {
        case 1:
            isabeli.atacar(pudim);
            console.log("A sua vida atual é de: "+  pudim.hp);
            break;
        case 2:
            isabeli.defender();
            break;
        case 3:
            isabeli.pocao();
            console.log("A vida atual da isabeli é de: "+  isabeli.hp);            
            break;
        }
}
if (pudim.hp <= 0) {
    console.log("TEMOS UM VENCEDOR! "+ pudim.nome);
}
else {
    console.log("TEMOS UM VENCEDOR! "+ isabeli.nome);
}
