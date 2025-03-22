class Agenda {
    constructor (nome, telefone) {
        this.nome = nome;
        this.telefone = telefone;
        this.contatos = [];
    }
    adicionar(nome, telefone){
        this.contatos.push(nome, telefone);
    }
    editar() {

    }
    remover() {
        let edit = prompt("Qual contato deseja excluir?\n"+ this.contatos);
        var index = contatos.indexOf(edit)
        if (index > -1) {
            this.contatos.splice(index, 1)
        }
    }
    buscar() {
        let nome_telefone = prompt("Você deseja buscar ")
        for (let i = 0; i < this.contatos.length; i++) {

        }
    }
}

const contatos = new Agenda("Gustavo", 49948375038);

while (true) {
    opcao = parseInt(prompt("Opção desejada:\n[1] Adicionar contatos\n[2] Editar contatos\n[3] Remover contatos\n[4] Buscar contatos\n[5] Sair\n"));
    switch (opcao) {
        case 1:
            adicionar();
            break;
        case 2:
            editar();
            break;
        case 3:
            remover();
            break;
        case 4:
            buscar();
            break;
        case 5:
            break;
        default:
            console.log("Opção inválida! Tente novamente.");
            break;
    }
}