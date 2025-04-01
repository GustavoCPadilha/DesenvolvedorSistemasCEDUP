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
    if (fonte != "") {
        alert("Bem-vindo novamente " + fonte);
        return fonte;
    } else {
        var opcao = 0;
        while (opcao != 1 || opcao != 2 || opcao != 3) {
            opcao = parseInt(prompt("Selecione a opção desejada:\n[1] MAIÚSCULA\n[2] minúscula\n[3] AlTeRnAdA"));
            switch (opcao) {
                case 1:
                    maiscula(nome);
                    alert(nome);
                    break;
                case 2:
                    minuscula(nome);
                    alert(nome);
                    break;
                case 3:
                    alternada(nome);
                    break;
                default:
                    alert("Opção inválida! Tente novamente");
                    break;
            }
        }
        if (fonte != "" && fonte != null) {
            criarCookie("fonte", fonte, "Tue, 01 Jan 2115 12:00:00 UTC");
            return fonte;
        }
    }
    return "";
}

function logout() {
    document.cookie = "nomeUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    alert("Você foi deslogado. Faça login novamente.");
}

function maiscula(nome) {
    nome = nome.toUpperCase();
    return nome;
}

function minuscula(nome) {
    console.log(nome.toLowerCase());
}

function alternada(nome) {
    console.log("preciso melhorar meu código");
}

nome = prompt("Digite seu nome: ");

verificarCookie(); 
