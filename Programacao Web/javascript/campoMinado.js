const tamanho = 5;
const totalBombas = 4;

function contarBombas(matrizGabarito){
    //PROFESSOR ME AJUDOU COM ESSA FUNÇÃO
    for(let i = 0; i < tamanho; i++){
        for(let j = 0; j < tamanho; j++){
            let contador = 0;
            //console.log("testando a linha " + i + " coluna " + j);
            //verifica a diagonal superior esquerda
            if(i-1 > -1 && j-1 > -1){
                if(matrizGabarito[i-1][j-1] == "💣"){
                contador++;
                //console.log(contador + " cima esquerda"); 
                }
            }
            //verifica a casa de cima
            if(i-1 > -1 && j > -1){
                if(matrizGabarito[i-1][j] == "💣"){
                contador++;
                //console.log(contador + " cima"); 
                }
            }
            //verifica a casa superior direita
            if(i-1 > -1 && j+1 > -1){
                if(matrizGabarito[i-1][j+1] == "💣"){
                contador++;
                //console.log(contador + " cima direita"); 
                }
            }
            //verifica a casa a esquerda
            if(j-1 > -1){
                if(matrizGabarito[i][j-1] == "💣"){
                contador++;
                //console.log(contador + " esquerda"); 
                }
            }
            //verifica a casa a direita
            if(j+1 < tamanho){
                if(matrizGabarito[i][j+1] == "💣"){
                contador++;
                //console.log(contador + " direita"); 
                }
            }
            //verifica a diagonal inferior esquerda
            if(i+1 < tamanho && j-1 > -1){
                if(matrizGabarito[i+1][j-1] == "💣"){
                contador++;
                //console.log(contador + " baixo esquerda"); 
                }
            }
            //verifica a casa de baixo
            if(i+1 < tamanho){
                if(matrizGabarito[i+1][j] == "💣"){
                contador++;
                //console.log(contador + " baixo"); 
                }
            }
            //verifica a casa inferior direita
            if(i+1 < tamanho && j+1 < tamanho){
                if(matrizGabarito[i+1][j+1] == "💣"){
                contador++;
                //console.log(contador + " baixo direita"); 
                }
            }
            if(matrizGabarito[i][j] != "💣"){
                matrizGabarito[i][j] = contador;
            }
            
        }
    }
/*
    for(let i = 0; i < tamanho; i++){
        console.log(matrizGabarito[i][0] + " | " + matrizGabarito[i][1] + " | " + matrizGabarito[i][2] + " | " + matrizGabarito[i][3] + " | " + matrizGabarito[i][4]);
        console.log("-----------------");
    }
*/
}

function gerarBombas() 
{
    var matriz = [];
    for (let i = 0; i < tamanho; i++) 
    {
        matriz.push(Array(tamanho).fill("-"));
    }
    var bombasColocadas = 0;
    while (bombasColocadas < totalBombas) {
        let i = Math.floor(Math.random() * tamanho);
        let j = Math.floor(Math.random() * tamanho);

        if (matriz[i][j] !== "💣") {
            matriz[i][j] = "💣";
            bombasColocadas++;
        }
    }
    return matriz;
}

function revelarZeros(campo, campo_resolvido, i, j) {
    if (i < 0 || i >= tamanho || j < 0 || j >= tamanho) return;
    if (campo[i][j] != '-') return;

    campo[i][j] = campo_resolvido[i][j];

    if (campo_resolvido[i][j] == '0') {
        revelarZeros(campo, campo_resolvido, i - 1, j - 1);
        revelarZeros(campo, campo_resolvido, i - 1, j);
        revelarZeros(campo, campo_resolvido, i - 1, j + 1);
        revelarZeros(campo, campo_resolvido, i, j - 1);
        revelarZeros(campo, campo_resolvido, i, j + 1);
        revelarZeros(campo, campo_resolvido, i + 1, j - 1);
        revelarZeros(campo, campo_resolvido, i + 1, j);
        revelarZeros(campo, campo_resolvido, i + 1, j + 1);
    }
}

function printaCampo(campo)
{      
    for(let i = 0; i < tamanho; i++){
        console.log(campo[i][0] + " | " + campo[i][1] + " | " + campo[i][2] + " | " + campo[i][3] + " | " + campo[i][4]);
        console.log("-----------------");
    }
}

function obterPosicao(mensagem) {
    try {
        var pos = parseInt(prompt(mensagem)) - 1;
        if (isNaN(pos) || pos < 0 || pos > 4) throw "Posição inválida!";
        return pos;
    } catch (erro) {
        console.log(erro);
        return obterPosicao(mensagem);
    }
}

function verificaPosicao(campo, linha, coluna)
{
    while (campo[linha][coluna] != '0' && campo[linha][coluna] != '-' && campo[linha][coluna] != '1' && campo[linha][coluna] != '2' && 
        campo[linha][coluna] != '3' && campo[linha][coluna] != '💣' && campo[linha][coluna] != '🚩') 
    {
        console.log('Posição inválida, digite outra posição: ');
        linha = obterPosicao("Digite a linha que você deseja revelar: ");
        coluna = obterPosicao("Digite a coluna que você deseja revelar: ");
    }
}

function colocaBandeira(campo, linha, coluna)
{
    while (campo[linha][coluna] != '-') 
    {
        console.log('Você não pode colocar uma bandeira em um local já revelado! Digite outra posição: ');
        linha = obterPosicao("Digite a linha que você deseja revelar: ");
        coluna = obterPosicao("Digite a coluna que você deseja revelar: ");
    }
    campo[linha][coluna] = '🚩';
    if (campo[linha][coluna] == '🚩' && campo_resolvido[linha][coluna] == '💣')
    {
        acertos += 1;
        if (acertos == totalBombas)
        {
            console.log("Parabéns! Você venceu!");
            ganhou = true;
        }
    }
}

function tiraBandeira(campo, linha, coluna)
{
    while (campo[linha][coluna] != '🚩') 
    {
        console.log("Você não pode tirar a bandeira de um local que já não tem bandeira!");
        continua = prompt("Quer mesmo remover uma bandeira? [S/N] ").toLowerCase();
        if (continua == 'n')
        {
            break;
        }
        linha = obterPosicao("Digite a linha que você deseja remover a bandeira: ");
        coluna = obterPosicao("Digite a coluna que você deseja remover a bandeira: ");
    }
    if (campo[linha][coluna] == '🚩')
    {
        campo[linha][coluna] = '-';
        acertos -= 1;
    }
}


var campo_resolvido = gerarBombas();
contarBombas(campo_resolvido);
var campo = [['-','-','-','-','-'],['-','-','-','-','-'],['-','-','-','-','-'],['-','-','-','-','-'],['-','-','-','-','-']]
var opcao = 1;
var linha = 0;
var coluna = 0;
var acertos = 0;
var ganhou = false;

printaCampo(campo);

while (ganhou == false)
{
    opcao = parseInt(prompt("[1] Revelar posição\n[2] Colocar uma bandeira\n[3] Remover uma bandeira\nO que deseja fazer? "));
    while (opcao != 1 && opcao != 2 && opcao != 3)
    {
        console.log("Opção Inválida! Tente novamente");
        opcao = parseInt(prompt("[1] Revelar posição\n[2] Colocar uma bandeira\n[3] Remover uma bandeira\nO que deseja fazer? "));
    }
    if (opcao == 1)
    {
        linha = obterPosicao("Digite a linha que você deseja revelar: ");
        coluna = obterPosicao("Digite a coluna que você deseja revelar: ");
        verificaPosicao(campo, linha, coluna);

        if (campo_resolvido[linha][coluna] == '💣')
        {
            console.log("VOCÊ PERDEU!");
            printaCampo(campo_resolvido);
            break;
        }
        else if (campo_resolvido[linha][coluna] == '0') 
        {
            revelarZeros(campo, campo_resolvido, linha, coluna);
        }
        else
        {
            campo[linha][coluna] = campo_resolvido[linha][coluna];
        }
    }
    else if (opcao == 2)
    {
        linha = obterPosicao("Digite a linha que você deseja colocar uma bandeira: ");
        coluna = obterPosicao("Digite a coluna que você deseja colocar uma bandeira: ");
        colocaBandeira(campo, linha, coluna);
    }
    else if (opcao == 3)
    {
        linha = obterPosicao("Digite a linha que você deseja remover a bandeira: ");
        coluna = obterPosicao("Digite a coluna que você deseja remover a bandeira: ");
        tiraBandeira(campo, linha, coluna);
    }
    printaCampo(campo);
}
