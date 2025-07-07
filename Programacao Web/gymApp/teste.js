// ...existing code...

// Variável global para armazenar o usuário logado
let usuarioAtivo = null;

// Função de login ajustada para armazenar o usuário logado
async function fazerLogin(user, password) {
  try {
    const resposta = await fetch('http://localhost:3000/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user,
        senha: password,
      }),
    });

    const dados = await resposta.json();
    var ok = false;
    if (resposta.ok) {
      alert('✅ Login realizado com sucesso!');
      alert(`Bem-vindo ${dados.user.nome_usuario || user}`);
      usuarioAtivo = dados.user; // Salva o usuário logado
      ok = true;
      return ok;
    } else {
      usuarioAtivo = null;
      switch (resposta.status) {
        case 400:
          alert('⚠️ Requisição inválida. Verifique os dados enviados.');
          return ok;
        case 401:
          alert('🔒 Usuário ou senha incorretos.');
          return ok;
        case 404:
          alert('❌ Usuário não encontrado.');
          return ok;
        case 500:
          alert('💥 Erro interno no servidor. Tente novamente mais tarde.');
          return ok;
        default:
          alert(`❗ Erro inesperado: ${resposta.status}`);
      }
      return ok;
    }
  } catch (erro) {
    usuarioAtivo = null;
    console.error('🚫 Erro de conexão com o servidor:', erro.message);
    return false;
  }
}

// Função para iniciar treino com usuário ativo
async function iniciarTreino() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  await iniciarTreinoComUsuario(usuarioAtivo.id_usuario);
}

// Função separada para iniciar treino com id_usuario
async function iniciarTreinoComUsuario(id_usuario) {
  try {
    const resposta = await fetch(`http://localhost:3000/buscaPlanilhaTreino?id_usuario=${id_usuario}`);
    const planilhas = await resposta.json();

    if (!planilhas.length) {
      alert('Você não possui planilhas de treino cadastradas.');
      return;
    }

    let lista = 'Escolha uma planilha para iniciar:\n';
    planilhas.forEach((p, i) => {
      lista += `${i + 1} - ${p.nome_planilhaTreino} (${p.ativa_planilhaTreino ? 'Ativa' : 'Inativa'})\n`;
    });

    const opcao = prompt(lista);
    const idx = parseInt(opcao) - 1;
    if (isNaN(idx) || idx < 0 || idx >= planilhas.length) {
      mensagemErro();
      return;
    }

    const planilhaSelecionada = planilhas[idx];
    alert(`Você iniciou a planilha: ${planilhaSelecionada.nome_planilhaTreino}`);

    // Busca os treinos dessa planilha
    const respTreinos = await fetch(`http://localhost:3000/buscaTreino?id_planilhaTreino=${planilhaSelecionada.id_planilhaTreino}`);
    const treinos = await respTreinos.json();

    if (!treinos.length) {
      alert('Esta planilha não possui treinos cadastrados.');
      return;
    }

    let listaTreinos = 'Exercícios desta planilha:\n';
    treinos.forEach((t, i) => {
      listaTreinos += `${i + 1} - Exercício: ${t.nome_exercicio} | Séries: ${t.series} | Repetições: ${t.repeticoes_treino} | Carga: ${t.carga_treino}kg\n`;
    });
    alert(listaTreinos);

    // Aqui você pode implementar o registro do treino realizado, histórico, etc.

  } catch (erro) {
    alert('Erro ao iniciar treino: ' + erro.message);
  }
}

// Ajuste nas funções de cadastro para usar usuarioAtivo.id_usuario quando necessário

async function registrarPlanilhaTreino() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let nome_planilhaTreino = prompt('Digite o nome da sua nova planilha de treino: ');
  alert('Digite a data de início dessa planilha: ');
  let data_inicio = getData();
  let ativa = prompt('Deseja tornar esta planilha como ativa? [S/N] ').toUpperCase();
  ativa = (ativa === 'S');
  await postPlanilhaTreino(nome_planilhaTreino, data_inicio, ativa, usuarioAtivo.id_usuario);
}

async function postPlanilhaTreino(nome_planilha, data_init, ativa, id_usuario) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraPlanilhaTreino', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_planilhaTreino: nome_planilha,  
        data_inicio: data_init,
        ativa_planilhaTreino: ativa,
        id_usuario: id_usuario
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('✅ Planilha registrada com sucesso!');
      alert('Detalhes:', JSON.stringify(dados));
    } else {
      switch (resposta.status) {
        case 400:
          alert('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          alert('❗ Essa planilha já foi cadastrada. Tente outro nome.');
          break;
        case 500:
          alert('💥 Erro interno no servidor. Tente novamente mais tarde.');
          break;
        default:
          alert(`❗ Erro inesperado: ${resposta.status}`);
      }
    }
  } catch (erro) {
    console.error('🚫 Erro ao tentar registrar planilha:', erro.message);
  }
}

async function registrarRefeicao() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let dia = getData();
  let descricao = prompt('Descreva a refeição:');
  await postRefeicao(usuarioAtivo.id_usuario, dia, descricao);
}

async function registrarAlimento() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let nome_comida = prompt('Digite o nome do alimento que você deseja registrar: ');
  let calorias = parseFloat(prompt('Digite a quantidade de calorias que esse alimento tem a cada 100g: '));
  let proteinas = parseFloat(prompt('Digite a quantidade de proteinas que esse alimento tem a cada 100g: '));
  let carboidratos = parseFloat(prompt('Digite a quantidade de carboidratos que esse alimento tem a cada 100g: '));
  let gorduras = parseFloat(prompt('Digite a quantidade de gorduras que esse alimento tem a cada 100g: '));
  await postAlimento(nome_comida, calorias, proteinas, carboidratos, gorduras);
}

async function registrarExercicio() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let nome_exercicio = prompt('Digite o nome do exercício que você deseja cadastrar: ');
  let opcao_musculo = prompt('1 - Abdômen\n2 - Bíceps\n3 - Ombros\n4 - Costas\n5 - Panturilha\n6 - Peitoral\n7 - Posterior\n8 - Quadríceps\n9 - Tríceps\n10 - Cardio\nDigite qual o músculo foco deste exercício: ');
  let musculo = '';
  switch (opcao_musculo)
  {
    case '1': musculo = 'Abdômen'; break;
    case '2': musculo = 'Bíceps'; break;
    case '3': musculo = 'Ombros'; break;
    case '4': musculo = 'Costas'; break;
    case '5': musculo = 'Panturilha'; break;
    case '6': musculo = 'Peitoral'; break;
    case '7': musculo = 'Posterior'; break;
    case '8': musculo = 'Quadríceps'; break;
    case '9': musculo = 'Tríceps'; break;
    case '10': musculo = 'Cardio'; break;
    default: alert('Agrupamento muscular inválido, digite um agrupamento válido: '); return;
  }
  let descricao = prompt('Digite a descrição do exercício, se houver: ');
  await postExercicio(nome_exercicio, musculo, descricao);  
}

// Todas as funções de busca agora usam o usuário ativo, se necessário
async function buscaPlanilhaTreino() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  try {
    const resposta = await fetch(`http://localhost:3000/buscaPlanilhaTreino?id_usuario=${usuarioAtivo.id_usuario}`);
    const planilhas = await resposta.json();
    var ativa = '';
    planilhas.forEach(planilha => {
      ativa = planilha.ativa_planilhaTreino == 1 ? 'Ativa' : 'Inativa';
      console.log(`${planilha.nome_planilhaTreino}:
          - Data de início: ${planilha.data_inicio};
          - Ativa/Inativa: ${ativa};`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar a Planilha de treino:', erro)
  }
}

async function buscaTreino() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  try {
    const resposta = await fetch(`http://localhost:3000/buscaTreino?id_usuario=${usuarioAtivo.id_usuario}`);
    const treinos = await resposta.json();
    treinos.forEach(treino => {
      console.log(`- Séries: ${treino.series}:
          - Repetições: ${treino.repeticoes_treino};
          - Carga:  ${treino.carga_treino};`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar o Treino:', erro)
  }
}

async function buscaAlimento() {
  try {
    const resposta = await fetch('http://localhost:3000/buscaAlimento');
    const alimentos = await resposta.json();
    alimentos.forEach(alimento => {
      console.log(`${alimento.nome_alimento}:
          - Calorias: ${alimento.calorias_alimento}kcal;
          - Proteinas: ${alimento.proteinas_alimento}g;
          - Carboidratos: ${alimento.carboidratos_alimento}g;
          - Gorduras: ${alimento.gorduras_alimento}g;`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar os alimentos:', erro)
  }
}

async function buscaExercicio() {
  try {
    const resposta = await fetch('http://localhost:3000/buscaExercicio');
    const exercicios = await resposta.json();
    exercicios.forEach(exercicio => {
      console.log(`${exercicio.nome_exercicio}:
          - Grupo Muscular: ${exercicio.grupo_muscular};
          - Descrição: ${exercicio.descricao_exercicio};`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar os Exercícios:', erro)
  }
}

async function buscaCaloriasDiarias() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  try {
    const resposta = await fetch(`http://localhost:3000/buscaCaloriasDiarias?id_usuario=${usuarioAtivo.id_usuario}`);
    const calorias = await resposta.json();
    calorias.forEach(caloria => {
      console.log(`- Data ${caloria.data_caloriasDiarias}:
          - Calorias totais: ${caloria.calorias_totais}kcal;
          - Proteínas: ${caloria.proteinas_caloriasDiarias}g;
          - Carboidratos: ${caloria.carboidratos_caloriasDiarias}g;
          - Gorduras: ${caloria.gorduras_caloriasDiarias}g;`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar as Calorias diárias:', erro)
  }
}

async function buscaHistoricoTreino() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  try {
    const resposta = await fetch(`http://localhost:3000/buscaHistoricoTreino?id_usuario=${usuarioAtivo.id_usuario}`);
    const historicos = await resposta.json();
    historicos.forEach(historico => {
      console.log(`- Data ${historico.dia_historicoTreino}:
          - Séries feitas: ${historico.series_feitas};
          - Repetições feitas: ${historico.repeticoes_feitas};
          - Carga utilizada: ${historico.carga_utilizada}kg;`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar o Histórico de treino:', erro)
  }
}

async function buscaMedidaCorporal() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  try {
    const resposta = await fetch(`http://localhost:3000/buscaMedidaCorporal?id_usuario=${usuarioAtivo.id_usuario}`);
    const medidas = await resposta.json();
    medidas.forEach(medida => {
      console.log(`- Data: ${medida.dia_medidaCorporal}:
          - Região: ${medida.regiao_medidaCorporal};
          - Medidas: ${medida.medida_cm};`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar as Medidas Corporais:', erro)
  }
}

async function buscaPesoCorporal() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  try {
    const resposta = await fetch(`http://localhost:3000/buscaPesoCorporal?id_usuario=${usuarioAtivo.id_usuario}`);
    const pesos = await resposta.json();
    pesos.forEach(peso => {
      console.log(`- Data ${peso.dia_pesoCorporal}:
          - Peso: ${peso.peso_pesoCorporal }kg;
          - Sua meta: ${peso.meta_peso}kg;`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar o peso corporal:', erro)
  }
}

async function buscaPassos() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  try {
    const resposta = await fetch(`http://localhost:3000/buscaPassos?id_usuario=${usuarioAtivo.id_usuario}`);
    const passos = await resposta.json();
    passos.forEach(passos => {
      console.log(`- Data: ${passos.dia_passos}:
          - Distância em metros: ${passos.qtde_metros};`);
    });
  }
  catch (erro) {
    console.error('Erro ao carregar os passos:', erro)
  }
}

// As funções de cadastro que precisam do usuário ativo devem ser ajustadas de forma semelhante
// Exemplo para registrar progresso de carga:
async function registrarProgressoCarga() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let id_exercicio = prompt('Digite o ID do exercício:');
  let dia = getData();
  let repeticoes = prompt('Digite o número de repetições:');
  let carga = prompt('Digite a carga utilizada (kg):');
  await postProgressoCarga(usuarioAtivo.id_usuario, id_exercicio, dia, repeticoes, carga);
}

// Repita o padrão acima para outras funções de cadastro conforme necessário

// ...existing code...

// Exemplo para registrar medida corporal
async function registrarMedidaCorporal() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let dia = getData();
  let regiao = prompt('Digite a região medida (ex: Braço, Cintura, Coxa, etc):');
  let medida = prompt('Digite a medida em cm:');
  await postMedidaCorporal(usuarioAtivo.id_usuario, dia, regiao, medida);
}

// Exemplo para registrar peso corporal
async function registrarPesoCorporal() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let dia = getData();
  let peso = prompt('Digite o peso (kg):');
  let meta = prompt('Digite a meta de peso (kg), se houver (ou deixe em branco):');
  meta = meta ? parseFloat(meta) : null;
  await postPesoCorporal(usuarioAtivo.id_usuario, dia, peso, meta);
}

// Exemplo para registrar passos
async function registrarPassos() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let dia = getData();
  let metros = prompt('Digite a quantidade de metros caminhados/corridos:');
  await postPassos(usuarioAtivo.id_usuario, dia, metros);
}

// Exemplo para registrar calorias diárias
async function registrarCaloriasDiarias() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let data = getData();
  let calorias = prompt('Digite o total de calorias consumidas:');
  let proteinas = prompt('Digite o total de proteínas consumidas (g):');
  let carboidratos = prompt('Digite o total de carboidratos consumidos (g):');
  let gorduras = prompt('Digite o total de gorduras consumidas (g):');
  await postCaloriasDiarias(usuarioAtivo.id_usuario, data, calorias, proteinas, carboidratos, gorduras);
}

// Exemplo para registrar refeição alimento
async function registrarRefeicaoAlimento() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let id_refeicao = prompt('Digite o ID da refeição:');
  let id_alimento = prompt('Digite o ID do alimento:');
  let qtde_gramas = prompt('Digite a quantidade em gramas:');
  await postRefeicaoAlimento(id_refeicao, id_alimento, qtde_gramas);
}

// Exemplo para registrar histórico de treino
async function registrarHistoricoTreino() {
  if (!usuarioAtivo) {
    alert('Usuário não está logado!');
    return;
  }
  let id_exercicio = prompt('Digite o ID do exercício:');
  let dia = getData();
  let series = prompt('Digite o número de séries feitas:');
  let repeticoes = prompt('Digite o número de repetições feitas:');
  let carga = prompt('Digite a carga utilizada (kg):');
  await postHistoricoTreino(usuarioAtivo.id_usuario, id_exercicio, dia, series, repeticoes, carga);
}

