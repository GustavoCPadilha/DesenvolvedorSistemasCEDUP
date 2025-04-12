var lista_login = ["gustavo", "sarah", "kauane"];
var lista_senha = ["lindao", "pudim", "123"];
var opcao = -1;
while (opcao != 3) {
    opcao = parseInt(prompt("Digite a opção desejada:\n[1] Acessar login\n[2] Cadastrar novo login\n[3] Sair\n"))
    switch (opcao) {
        case 1:
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
            break;
        case 2:
            var login = prompt("Digite o login que deseja criar: ");
            var senha = prompt("Digite a senha que deseja criar: ");
            lista_login.push(login);
            lista_senha.push(senha);
            break;
        case 3:
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
}
console.log("Volte sempre!")
