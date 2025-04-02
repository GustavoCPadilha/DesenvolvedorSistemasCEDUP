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

function verificarCookie() {
    var fonte = lerCookie("fonte");  
    var ordem = lerCookie("ordem")
    if (ordem != "") {
        alert(texto);
        return ordem;
    } else {
        if (ordem != "" && ordem != null) {
            criarCookie("ordem", ordem, "Tue, 01 Jan 2115 12:00:00 UTC");
            return ordem;
        }
    }

    if (fonte != "") {
        alert(texto);
        return fonte;
    } else {
        var opcao = 0;
        while (opcao != 1 || opcao != 2) {
            opcao = parseInt(prompt("Selecione a opção desejada:\n[1] Tamanho da fonte\n[2] Ordem da palavra"));
            switch (opcao) {
                case 1:
                    while (opcao != 4) {
                        opcao = parseInt(prompt("Selecione a opção desejada:\n[1] MAIÚSCULA\n[2] minúscula\n[3] AlTeRnAdA\n[4] Voltar"));
                        switch (opcao) {
                            case 1:
                                retorno = maiscula(texto);
                                alert(retorno);
                                break;
                            case 2:
                                retorno = minuscula(texto);
                                alert(retorno);
                                break;
                            case 3:
                                retorno = alternada(texto);
                                alert(retorno);
                                break;
                            case 4:
                                break;
                            default:
                                alert("Opção inválida! Tente novamente");
                                break;
                        }
                    }
                case 2:
                    while (opcao != 3) {
                        opcao = parseInt(prompt("Selecione a opção desejada:\n[1] Padrão\n[2] Invertido\n[3] Voltar"));
                        switch (opcao) {
                            case 1:
                                retorno = padrao(texto);
                                alert(retorno);
                                break;
                            case 2:
                                retorno = inverte(texto);
                                alert(retorno);
                                break;
                            case 3:
                                break;
                            default:
                                alert("Opção inválida! Tente novamente");
                                break;
                        }
                    }
                case 3:
                    break;
                default:
                    alert("Opção inválida! Tente novamente");
                    break; 
        }         
        if (fonte != "" && fonte != null) {
            criarCookie("fonte", fonte, "Tue, 01 Jan 2115 12:00:00 UTC");
            return fonte;
            }
        return "";
        }
    }
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
