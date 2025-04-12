function criarCookie(nome, valor, expira) {
    var dtExpira = "expires=" + expira;
    document.cookie = nome + "=" + valor + "; " + dtExpira;
}


function lerCookie(nome) {
    var vnome = nome + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(vnome) == 0)
            return c.substring(vnome.length, c.length);
    }
    return "";
}


function aplicarPreferencias(texto, fonte, ordem) {
    let resultado = texto;
    if (fonte === "MAIUSCULA") 
    {
        resultado = maiscula(resultado);
    }
    else if (fonte === "minuscula") 
    {
        resultado = minuscula(resultado);
    }
    else if (fonte === "alternada") 
    {
        resultado = alternada(resultado);
    }

    if (ordem === "inverso") resultado = inverte(resultado);

    alert("Resultado: " + resultado);
}


function verificarCookie(texto) {
    var fonte = lerCookie("fonte");  
    var ordem = lerCookie("ordem");

    if (fonte && ordem) {
        alert("Preferências carregadas: Fonte - " + fonte + ", Ordem - " + ordem);
        aplicarPreferencias(texto, fonte, ordem);
        return;
    }

    let opcaoFonte = parseInt(prompt("Escolha o estilo da fonte:\n[1] MAIÚSCULA\n[2] minúscula\n[3] AlTeRnAdA"));
    let estiloFonte = "";
    switch (opcaoFonte) {
        case 1:
            estiloFonte = "MAIUSCULA";
            break;
        case 2:
            estiloFonte = "minuscula";
            break;
        case 3:
            estiloFonte = "alternada";
            break;
        default:
            alert("Fonte inválida");
            return;
    }

    let opcaoOrdem = parseInt(prompt("Escolha a ordem:\n[1] Padrão\n[2] Invertido"));
    let estiloOrdem = "";
    switch (opcaoOrdem) {
        case 1: 
            estiloOrdem = "padrao";
            break;
        case 2: 
            estiloOrdem = "inverso";
            break;
        default: 
            alert("Ordem inválida");
            return;
    }

    criarCookie("fonte", estiloFonte, "Tue, 01 Jan 2115 12:00:00 UTC");
    criarCookie("ordem", estiloOrdem, "Tue, 01 Jan 2115 12:00:00 UTC");

    aplicarPreferencias(texto, estiloFonte, estiloOrdem);
}


function logout() {
    document.cookie = "nomeUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    alert("Você foi deslogado. Faça login novamente.");
}


function maiscula(texto) {
    texto = texto.toUpperCase();
    return texto;
}


function minuscula(texto) {
    texto = texto.toLowerCase();
    return texto;
}


function alternada(texto) {
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        if (i % 2 == 0) {
            resultado += texto[i].toUpperCase();
        }
        else {
            resultado += texto[i].toLowerCase();
        }
    }
    return resultado;
}


function inverte(texto) {
    let palavraInvertida = '';
    for (let i = texto.length-1; i >= 0; i--) {
        palavraInvertida += texto[i];
    }
    return palavraInvertida;
}


function padrao(texto) {
    if (texto != texto) {
        inverte(texto);
    }
    else {
        return texto;
    }
}

texto = prompt("Digite a palavra: ");
verificarCookie();  
