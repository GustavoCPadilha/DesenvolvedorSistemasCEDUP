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
    var num = lerCookie("Tabuada");
    if (num != "") {
        alert("Tabuada de "+ num);
        return tabuada(num);
    } else {
        var num = parseInt(prompt("Digite a tabuada desejada: "));
        if (num != "" && num != null) {
            criarCookie("Tabuada", num, "Tue, 01 Jan 2115 12:00:00 UTC");
            return tabuada(num);
        }
    }
    return "";
}

function tabuada(num) {
    alert(`1 X ${num} = ${1 * num}\n2 X ${num} = ${2 * num}\n3 X ${num} = ${3 * num}
4 X ${num} = ${4 * num}\n5 X ${num} = ${5 * num}\n6 X ${num} = ${6 * num}
7 X ${num} = ${7 * num}\n8 X ${num} = ${8 * num}\n9 X ${num} = ${9 * num}
10 X ${num} = ${10 * num}`);
}

function logout() {
    document.cookie = "Tabuada=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    alert("Você foi deslogado. Faça login novamente.");
}

verificarCookie();

var opcao = -1
while (opcao != 3) {
    opcao = parseInt(prompt("Digite a opção desejada:\n[1] Ver a tabuada novamente\n[2] Logout\n[3] Sair"))
    switch (opcao) {
        case 1:
            verificarCookie();
            break;
        case 2:
            logout();
            break;
        case 3:
            break;
        default:
            alert("Opção Inválida! Tente novamente.");
            break;
    }
}


