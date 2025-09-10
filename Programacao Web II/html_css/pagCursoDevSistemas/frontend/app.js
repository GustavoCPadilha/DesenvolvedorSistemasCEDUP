async function buscaUsuario() {
    try {
        const resposta = await fetch('http://localhost:3000/buscaUsuario');
        const usuarios = await resposta.json();
        const lista = document.getElementById('listaUsuario');
        lista.innerHTML = '';

        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = usuario.nome_usuario;
            lista.appendChild(li);
        });
    }
    catch (erro) {
        console.error('Erro ao carregar os Usuários:', erro);
    }
}


async function cadastraUsuario(nome_user) {
    try {
    // Seleciona a rota a ser usada
    const resposta = await fetch('http://localhost:3000/cadastraUsuario', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        // Encaminha os dados que vieram como parametro no corpo do arquivo JSON
        body: JSON.stringify({
        nome_usuario: nome_user,
        })
    });
    
    // A variável dados recebe um objeto usuario

    if (resposta.ok) {
    console.log("O Usuário foi cadastrado com sucesso")
    } else {
    switch (resposta.status) {
        case 400:
        console.warn('⚠️ Usuário não encontrado');
        break;
        case 401:
        console.warn('⚠️ Usuário não encontrado');
        break;
        case 500:
        console.warn('💥 Erro interno no servidor. Tente novamente mais tarde.');
        break;
        default:
        console.warn(`❗ Erro inesperado: ${resposta.status}`);
        }
    }
} catch (erro) {
    console.error('🚫 Erro ao tentar buscar o produto:', erro.message);
}}
