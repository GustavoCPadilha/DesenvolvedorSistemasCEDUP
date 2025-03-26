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
    var username = lerCookie("nomeUsuario");
    if (username != "") {
        alert("Bem-vindo novamente " + username);
        return username;
    } else {
        var username = prompt("Digite seu nome:");
        if (username != "" && username != null) {
            criarCookie("nomeUsuario", username, "Tue, 01 Jan 2115 12:00:00 UTC");
            return username;
        }
    }
    return "";
}

function alterarSenha() {
    var login = prompt("Digite seu login para alterar a senha do usuário:");
    var index = lista_login.indexOf(login);
    if (index != -1) {
        var novaSenha = prompt("Digite a nova senha para o usuário " + login + ":");
        lista_senha[index] = novaSenha;
        alert("Senha alterada com sucesso!");
    } else {
        alert("Login não encontrado!");
    }
}


function logout() {
    document.cookie = "nomeUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    alert("Você foi deslogado. Faça login novamente.");
}

function login() {
    var login = prompt("Digite seu login: ");
    var senha = '';
    var valido = false;
    for (i = 0; i < lista_login.length; i++) {
        if (login == lista_login[i]) {
            console.log("Login válido!");
            valido = true;
            senha = prompt("Digite sua senha: ");
            while (senha != lista_senha[i]) {
                console.log("Senha inválida!")
                senha = prompt("Digite sua senha: ");
            }
            if (senha == lista_senha[i]) {
                console.log("Senha válida!");
            }
        }
    }
    if (valido == false) {
        console.log("Login inválido!");
    }
}

function criaLogin() {
    var login = prompt("Digite o login que deseja criar: ");
    var senha = prompt("Digite a senha que deseja criar: ");
    lista_login.push(login);
    lista_senha.push(senha);
    criarCookie("nomeUsuario", username, "Tue, 01 Jan 2115 12:00:00 UTC");
    alert("Usuário cadastrado com sucesso!");
    return username;
}

var lista_login = ["gustavo", "kauane", "estoulouco"];
var lista_senha = [1234, 5678, "coringuei"];

login();
var username = verificarCookie(); 

var opcao = -1;
while (opcao != 3) {
    opcao = parseInt(prompt("Digite a opção desejada:\n[1] Cadastrar novo usuário e senha\n[2] Alterar a senha do seu usuário\n[3] Sair\n"));
    switch (opcao) {
        case 1:
            criaLogin();
            break;
        case 2:
            alterarSenha();
            break;
        case 3:
            logout();
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
}

console.log("Lista de usuários:", lista_login);
console.log("Lista de senhas:", lista_senha);
