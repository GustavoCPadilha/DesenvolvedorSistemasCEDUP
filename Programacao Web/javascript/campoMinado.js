function printaCampo(campo)
{      
    for (var i = 0; i < campo.length; i++)
    {
        for(var j = 0; j < campo.length; j++)
        {
            process.stdout.write(`${campo[i][j]} `);
        }
        console.log();
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

var campo_resolvido = 
[
    ['x ','1 ','💣','💣','1 '],
    ['x ','1 ','2 ','3 ','2 '],
    ['x ','x ','x ','1 ','💣'],
    ['1 ','1 ','x ','1 ','1 '],
    ['💣','1 ','x ','x ','x ']
];
var campo = [['- ','- ','- ','- ','- '],['- ','- ','- ','- ','- '],['- ','- ','- ','- ','- '],['- ','- ','- ','- ','- '],['- ','- ','- ','- ','- ']];
printaCampo(campo);
//printaCampo(campo_resolvido);

while (true)
{
    var linha = obterPosicao("Digite a linha que você deseja revelar: ");
    var coluna = obterPosicao("Digite a coluna que você deseja revelar: ");

    while (campo[linha][coluna] != '- ' && campo[linha][coluna] != '1 ' && campo[linha][coluna] != '2 ' && campo[linha][coluna] != '💣' && campo[linha][coluna] != '3 ') 
    {
        console.log('Posição inválida, digite outra posição: ');
        linha = obterPosicao("Digite a linha que você deseja revelar: ");
        coluna = obterPosicao("Digite a coluna que você deseja revelar: ");
    }

    if (campo_resolvido[linha][coluna] == '💣')
    {
        console.log("VOCÊ PERDEU!");
        printaCampo(campo_resolvido);
        break;
    }
    else if (campo_resolvido[linha][coluna] == 'x ')
    {
        for (var i = 0; i < campo.length; i++)
        {
            for(var j = 0; j < campo.length; j++)
            {
                if (campo_resolvido[i][j] == 'x ' || campo_resolvido[i][j] == '1 ' || campo_resolvido[i][j] == '2 ' || campo_resolvido[i][j] == '3 ')
                {
                    campo[i][j] = campo_resolvido[i][j];
                }
            }
        }
    }
    else
    {
        campo[linha][coluna] = campo_resolvido[linha][coluna];
    }
    printaCampo(campo);
}
