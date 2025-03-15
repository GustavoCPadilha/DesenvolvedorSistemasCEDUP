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
        let ataque_variado = Math.floor(Math.random() * 20) + this.ataque; // Ataque varia em 20
        let chance_critico = Math.random();
        let ataque_critico = chance_critico < 0.2; // 20% de chance de crítico
        
        if (ataque_critico) {
            console.log("Ataque Crítico!");
            ataque_variado *= 1.5;
        } else {
            console.log("Ataque normal");
        }

        let dano = ataque_variado - player_2.defesa - player_2.escudo;
        dano = dano > 0 ? dano : 0; // Impede que o ataque seja negativo (se fosse negativo o oponente iria curar a vida)
        player_2.hp -= dano;
        console.log(`${this.nome} infringiu ${ataque_variado} de dano!`)
        console.log(`A vida atual de ${player_2.nome} é de:${player_2.hp}\n`);            
    }
    defender () {
        let aumento_defesa = Math.floor(Math.random() * 50) + 50; // aumenta defesa em 50 até 100
        this.escudo += aumento_defesa;
        console.log(`${this.nome} aumentou o escudo em ${aumento_defesa}`);
        console.log(`O escudo atual de ${this.nome} é de:${this.escudo}\n`);            
    }
    pocao () {
        if (this.hp >= 300) {
            console.log(`${this.nome} tentou se curar mas já tinha a vida máxima atingida!`);
        }
        else {
            let aumento_hp = Math.floor(Math.random() * 50) + 75; // aumenta hp em 75 até 125
            this.hp += aumento_hp;
            if (this.hp > 300) {
                this.hp = 300;
                console.log("Vida máxima atingida!\n");
            }
            console.log(`${this.nome} curou a vida em ${aumento_hp}`);
            console.log(`A vida atual de ${this.nome} é de:${this.hp}\n`);            
        }
    }
}

const pudim = new Guerreiro ("Pudim", 300, 200, 100, 0); // Nome, HP, Ataque, Defesa, Escudo
const isabeli = new Guerreiro ("Isabeli", 300, 200, 100, 0); // Nome, HP, Ataque, Defesa, Escudo

let minimo = 1;
let maximo = 3;

console.log(`Sua vida:${pudim.hp}, Seu ataque:${pudim.ataque}, Sua defesa:${pudim.defesa}`);
console.log(`Vida do inimigo:${isabeli.hp}, Ataque do inimigo:${isabeli.ataque}, Defesa do inimigo:${isabeli.defesa}\n`);

while (pudim.hp > 0 && isabeli.hp > 0) 
{
    let acao = parseInt(prompt("O que deseja fazer? \n[1] Atacar (180-220)\n[2] Defender (50-100)\n[3] Poção regenerativa (75-125)\n")); 
    var opcao_aleatoria = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo; // opção aleatória entre 1, 2 e 3

    switch (acao) {
        case 1:
            pudim.atacar(isabeli);
            break;
        case 2:
            pudim.defesa = 0;
            pudim.defender();
            break;
        case 3:
            pudim.pocao();
            break;
        default:
            console.log("Ação inválida! Perdeu o turno!\n");
            }
        if (isabeli.hp > 0) {
        switch (opcao_aleatoria) {
            case 1:
                isabeli.atacar(pudim);
                break;
            case 2:
                isabeli.defesa = 0;
                isabeli.defender();
                break;
            case 3:
                isabeli.pocao();
                break;
            }
        }
}
if (pudim.hp > 0) {
    console.log("TEMOS UM VENCEDOR! "+ pudim.nome);
}
else {
    console.log("TEMOS UM VENCEDOR! "+ isabeli.nome);
}
 
