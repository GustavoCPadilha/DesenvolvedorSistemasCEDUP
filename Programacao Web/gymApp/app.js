/* 
1 - Cadastrar
2 - Login
    2.1 - acessar planilhas de treino para começar um novo treino
    2.2 - gráficos
        2.2.1 - progressões de cargas
        2.2.2 - peso corporal com metas de peso
        2.2.3 - medidas corporais 
    2.3 - histórico treinos 
    2.4 - acessar contador de calorias
        2.4.1 - adicionar refeicao
        2.4.2 - historico de calorias e macronutrientes
        2.4.3 - cadastrar novo alimento
    2.5 - contador de passo
    2.6 - cadastrar novo exercício
*/

function mensagemErro() {
    alert('Opção inválida. Tente novamente!');
}

function getData() {
    let dia_nasc = prompt('Digite o dia: ');
    let mes_nasc = prompt('Digite o mês: ');
    let ano_nasc = prompt('Digite o ano: ');
    let data_nascimento = ano_nasc + '-' + mes_nasc + '-' + dia_nasc; 
    return data_nascimento;
}


// Função para iniciar treino com usuário ativo
async function iniciarTreino(id_usuario) {
  // Busca as planilhas do usuário logado
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
    // Exemplo: registrar execução no histórico de treino

  } catch (erro) {
    alert('Erro ao iniciar treino: ' + erro.message);
  }
}

// CADASTRAR NOVA REFEIÇÃO
async function postRefeicao(id_usuario, dia_refeicao, descricao_refeicao) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraRefeicao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_usuario, dia_refeicao, descricao_refeicao })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Refeição registrada!');
    } else {
      alert('Erro ao registrar refeição: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar refeição:', erro.message);
  }
}

async function registrarRefeicao(id_usuario) {
  let dia = getData();
  let descricao = prompt('Descreva a refeição:');
  await postRefeicao(id_usuario, dia, descricao);
}

// CADASTRAR ALIMENTO NA REFEIÇÃO
async function postRefeicaoAlimento(id_refeicao, id_alimento, qtde_gramas) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraRefeicaoAlimento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_refeicao, id_alimento, qtde_gramas })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Alimento adicionado à refeição!');
    } else {
      alert('Erro ao adicionar alimento: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao adicionar alimento:', erro.message);
  }
}

// CADASTRAR CALORIAS DIÁRIAS
async function postCaloriasDiarias(id_usuario, data_caloriasDiarias, calorias_totais, proteinas, carboidratos, gorduras) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraCaloriasDiarias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        data_caloriasDiarias,
        calorias_totais,
        proteinas_caloriasDiarias: proteinas,
        carboidratos_caloriasDiarias: carboidratos,
        gorduras_caloriasDiarias: gorduras
      })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Calorias diárias registradas!');
    } else {
      alert('Erro ao registrar calorias: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar calorias:', erro.message);
  }
}

// CADASTRAR TREINO
async function postTreino(id_planilhaTreino, id_exercicio, series, repeticoes_treino, carga_treino) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraTreino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_planilhaTreino, id_exercicio, series, repeticoes_treino, carga_treino })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Treino registrado!');
    } else {
      alert('Erro ao registrar treino: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar treino:', erro.message);
  }
}

// CADASTRAR PROGRESSÃO DE CARGA
async function postProgressoCarga(id_usuario, id_exercicio, dia, repeticoes, carga) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraProgressoCarga', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        id_exercicio,
        dia_progressoCarga: dia,
        repeticoes_progressoCarga: repeticoes,
        carga_progressoCarga: carga
      })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Progressão registrada!');
    } else {
      alert('Erro ao registrar progressão: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar progressão:', erro.message);
  }
}

// CADASTRAR MEDIDA CORPORAL
async function postMedidaCorporal(id_usuario, dia, regiao, medida) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraMedidaCorporal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        dia_medidaCorporal: dia,
        regiao_medidaCorporal: regiao,
        medida_cm: medida
      })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Medida corporal registrada!');
    } else {
      alert('Erro ao registrar medida: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar medida:', erro.message);
  }
}

// CADASTRAR PESO CORPORAL
async function postPesoCorporal(id_usuario, dia, peso, meta) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraPesoCorporal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        dia_pesoCorporal: dia,
        peso_pesoCorporal: peso,
        meta_peso: meta
      })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Peso corporal registrado!');
    } else {
      alert('Erro ao registrar peso: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar peso:', erro.message);
  }
}

// CADASTRAR PASSOS
async function postPassos(id_usuario, dia, metros) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraPassos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        dia_passos: dia,
        qtde_metros: metros
      })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Passos registrados!');
    } else {
      alert('Erro ao registrar passos: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar passos:', erro.message);
  }
}

// CADASTRAR HISTÓRICO DE TREINO
async function postHistoricoTreino(id_usuario, id_exercicio, dia, series, repeticoes, carga) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraHistoricoTreino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        id_exercicio,
        dia_historicoTreino: dia,
        series_feitas: series,
        repeticoes_feitas: repeticoes,
        carga_utilizada: carga
      })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      alert('✅ Histórico de treino registrado!');
    } else {
      alert('Erro ao registrar histórico: ' + (dados.error || resposta.status));
    }
  } catch (erro) {
    console.error('Erro ao registrar histórico:', erro.message);
  }
}

async function buscaAlimento() {
  try 
  {
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
  catch (erro)
  {
    console.error('Erro ao carregar os alimentos:', erro)
  }
}

async function buscaExercicio() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaExercicio');
    const exercicios = await resposta.json();

    exercicios.forEach(exercicio => {
      console.log(`${exercicio.nome_exercicio}:
          - Grupo Muscular: ${exercicio.grupo_muscular};
          - Descrição: ${exercicio.descricao_exercicio};`);
    });
  }
  catch (erro)
  {
    console.error('Erro ao carregar os Exercícios:', erro)
  }
}

async function buscaPlanilhaTreino() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaPlanilhaTreino');
    const planilhas = await resposta.json();
    var ativa = '';

    planilhas.forEach(planilha => {
      if (planilha.ativa_planilhaTreino == 1)
      {
        ativa = 'Ativa';
      }
      else if (planilha.ativa_planilhaTreino == 0)
      {
        ativa = 'Inativa';
      }
      console.log(`${planilha.nome_planilhaTreino}:
          - Data de início: ${planilha.data_inicio};
          - Ativa/Inativa: ${ativa};`);
    });
  }
  catch (erro)
  {
    console.error('Erro ao carregar a Planilha de treino:', erro)
  }
}

async function buscaCaloriasDiarias() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaCaloriasDiarias');
    const calorias = await resposta.json();

    calorias.forEach(caloria => {
      console.log(`- Data ${caloria.data_caloriasDiarias}:
          - Calorias totais: ${caloria.calorias_totais}kcal;
          - Proteínas: ${caloria.proteinas_caloriasDiarias}g;
          - Carboidratos: ${caloria.carboidratos_caloriasDiarias}g;
          - Gorduras: ${caloria.gorduras_caloriasDiarias}g;`);
    });
  }
  catch (erro)
  {
    console.error('Erro ao carregar as Calorias diárias:', erro)
  }
}

async function buscaHistoricoTreino() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaHistoricoTreino');
    const historicos = await resposta.json();

    historicos.forEach(historico => {
      console.log(`- Data ${historico.dia_historicoTreino}:
          - Séries feitas: ${historico.series_feitas};
          - Repetições feitas: ${historico.repeticoes_feitas};
          - Carga utilizada: ${historico.carga_utilizada}kg;`);
    });
  }
  catch (erro)
  {
    console.error('Erro ao carregar o Histórico de treino:', erro)
  }
}

async function buscaMedidaCorporal() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaMedidaCorporal');
    const medidas = await resposta.json();

    medidas.forEach(medida => {
      console.log(`- Data: ${medida.dia_medidaCorporal}:
          - Região: ${medida.regiao_medidaCorporal};
          - Medidas: ${medida.medida_cm};`);
    });
  }
  catch (erro)
  {
    console.error('Erro ao carregar as Medidas Corporais:', erro)
  }
}

async function buscaPesoCorporal() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaPesoCorporal');
    const pesos = await resposta.json();

    pesos.forEach(peso => {
      console.log(`- Data ${peso.dia_pesoCorporal}:
          - Peso: ${peso.peso_pesoCorporal }kg;
          - Sua meta: ${peso.meta_peso}kg;`);
    });
    }
  catch (erro)
  {
    console.error('Erro ao carregar o peso corporal:', erro)
  }
}

async function buscaPassos() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaPassos');
    const passos = await resposta.json();

    passos.forEach(passos => {
      console.log(`- Data: ${passos.dia_passos}:
          - Distância em metros: ${passos.qtde_metros};`);
    });
  }
  catch (erro)
  {
    console.error('Erro ao carregar os passos:', erro)
  }
}

async function buscaTreino() {
  try 
  {
    const resposta = await fetch('http://localhost:3000/buscaTreino');
    const treinos = await resposta.json();

    treinos.forEach(treino => {
      console.log(`- Séries: ${treino.series}:
          - Repetições: ${treino.repeticoes_treino};
          - Carga:  ${treino.carga_treino};`);
    });
  }
  catch (erro)
  {
    console.error('Erro ao carregar o Treino:', erro)
  }
}

async function postUsuario(user, mail, password, datebirth, sex, height, weight_user) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraUsuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_usuario: user,
        email: mail,
        senha: password,
        data_nascimento: datebirth,
        sexo: sex,
        altura: height,
        peso_usuario: weight_user
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('✅ Usuário registrado com sucesso!');
      alert('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          alert('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          alert('❗ Esse nome de usuário já está em uso. Tente outro.');
          break;
        case 500:
          alert('💥 Erro interno no servidor. Tente novamente mais tarde.');
          break;
        default:
          alert(`❗ Erro inesperado: ${resposta.status}`);
      }

      console.debug('Detalhes do erro:', dados.mensagem || dados);
    }
  } catch (erro) {
    console.error('🚫 Erro ao tentar registrar usuário:', erro.message);
  }
}

async function registrarUsuario() {
    let nome_usuario = prompt('Digite seu nome completo: ');
    let email = prompt('Digite seu email: ');
    let ok = false;
    while (!ok)
    {
      var senha = prompt('Digite sua senha: ');
      let confirma_senha = prompt('Digite a senha novamente, para confirmação da senha: ');
      if (senha == confirma_senha)
      {
        ok = true;
        break;
      }
      alert('As senhas não batem... digite novamente!');
    }
    alert('Agora insira sua data de nascimento: ');
    let data_nascimento = getData();
    let sexo = prompt('Selecione seu sexo [M/F]: ').toUpperCase();
    let altura = prompt('Digite sua altura: ');
    let peso_usuario = prompt('Digite seu peso atual: ');
    await postUsuario(nome_usuario, email, senha, data_nascimento, sexo, altura, peso_usuario);
}

async function postAlimento(foodname, calories, proteins, carbohydrates, fats) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraAlimento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_alimento: foodname,  
        calorias_alimento: calories,
        proteinas_alimento: proteins,
        carboidratos_alimento: carbohydrates,
        gorduras_alimento: fats
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('✅ Alimento registrado com sucesso!');
      alert('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          alert('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          alert('❗ Esse alimento já foi cadastrado. Tente outro.');
          break;
        case 500:
          alert('💥 Erro interno no servidor. Tente novamente mais tarde.');
          break;
        default:
          alert(`❗ Erro inesperado: ${resposta.status}`);
      }

      console.debug('Detalhes do erro:', dados.mensagem || dados);
    }
  } catch (erro) {
    console.error('🚫 Erro ao tentar registrar alimento:', erro.message);
  }
}

async function registrarAlimento() {
    let nome_comida = prompt('Digite o nome do alimento que você deseja registrar: ');
    let calorias = parseFloat(prompt('Digite a quantidade de calorias que esse alimento tem a cada 100g: '));
    let proteinas = parseFloat(prompt('Digite a quantidade de proteinas que esse alimento tem a cada 100g: '));
    let carboidratos = parseFloat(prompt('Digite a quantidade de carboidratos que esse alimento tem a cada 100g: '));
    let gorduras = parseFloat(prompt('Digite a quantidade de gorduras que esse alimento tem a cada 100g: '));
    await postAlimento(nome_comida, calorias, proteinas, carboidratos, gorduras);
}

async function postExercicio(exercicio, musculo, descricao) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastraExercicio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_exercicio: exercicio,  
        grupo_muscular: musculo,
        descricao_exercicio: descricao,
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('✅ Exercício registrado com sucesso!');
      alert('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          alert('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          alert('❗ Esse exercício já foi cadastrado. Tente outro.');
          break;
        case 500:
          alert('💥 Erro interno no servidor. Tente novamente mais tarde.');
          break;
        default:
          alert(`❗ Erro inesperado: ${resposta.status}`);
      }

      console.debug('Detalhes do erro:', dados.mensagem || dados);
    }
  } catch (erro) {
    console.error('🚫 Erro ao tentar registrar exercício:', erro.message);
  }
}

async function registrarExercicio() {
  let nome_exercicio = prompt('Digite o nome do exercício que você deseja cadastrar: ');
  let opcao_musculo = prompt('1 - Abdômen\n2 - Bíceps\n3 - Ombros\n4 - Costas\n5 - Panturilha\n6 - Peitoral\n7 - Posterior\n8 - Quadríceps\n9 - Tríceps\n10 - Cardio\nDigite qual o músculo foco deste exercício: ');
  switch (opcao_musculo)
  {
    case '1':
      var musculo = 'Abdômen';
      break;
    case '2':
      var musculo = 'Bíceps';
      break;
    case '3':
      var musculo = 'Ombros';
      break;
    case '4':
      var musculo = 'Costas';
      break;
    case '5':
      var musculo = 'Panturilha';
      break;
    case '6':
      var musculo = 'Peitoral';
      break;
    case '7':
      var musculo = 'Posterior';
      break;
    case '8':
      var musculo = 'Quadríceps';
      break;
    case '9':
      var musculo = 'Tríceps';
      break;
    case '10':
      var musculo = 'Cardio';
      break;
    default:
      console.log('Agrupamento muscular inválido, digite um agrupamento válido: ');
      break;
  }
  let descricao = prompt('Digite a descrição do exercício, se houver: ');
  await postExercicio(nome_exercicio, musculo, descricao);  
}

async function postPlanilhaTreino(nome_planilha, data_init, ativa) {
try {
    const resposta = await fetch('http://localhost:3000/cadastraPlanilhaTreino', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_planilhaTreino: nome_planilha,  
        data_inicio: data_init,
        ativa_planilhaTreino: ativa
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('✅ Alimento registrado com sucesso!');
      alert('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          alert('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          alert('❗ Esse alimento já foi cadastrado. Tente outro.');
          break;
        case 500:
          alert('💥 Erro interno no servidor. Tente novamente mais tarde.');
          break;
        default:
          alert(`❗ Erro inesperado: ${resposta.status}`);
      }

      console.debug('Detalhes do erro:', dados.mensagem || dados);
    }
  } catch (erro) {
    console.error('🚫 Erro ao tentar registrar alimento:', erro.message);
  }
}

async function registrarPlanilhaTreino() {
  let nome_planilhaTreino = prompt('Digite o nome da sua nova planilha de treino: ');
  alert('Digite a data de início dessa planilha: ');
  let data_inicio = getData();
  let ativa = prompt('Deseja tornar esta planilha como ativa? [S/N] ').toUpperCase();
  if (ativa == 'S')
  {
    ativa = true;
  }
  else if (ativa == 'F')
  {
    ativa = false;
  }
  postPlanilhaTreino(nome_planilhaTreino, data_inicio, ativa);
}

async function buscarExercicio(exercicioId) {
  try {
    const resposta = await fetch(`http://localhost:3000/buscaExercicio/${exercicioId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      console.log('✅ Exercício encontrado com sucesso!');
      console.log('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 404:
          console.warn('⚠️ Exercício não encontrado.');
          break;
        case 500:
          console.warn('💥 Erro interno no servidor. Tente novamente mais tarde.');
          break;
        default:
          console.warn(`❗ Erro inesperado: ${resposta.status}`);
      }

      console.debug('Detalhes do erro:', dados.mensagem || dados);
    }
  } catch (erro) {
    console.error('🚫 Erro ao tentar buscar o exercício:', erro.message);
  }
}

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
    console.log(dados);

    if (resposta.ok) {
      alert('✅ Login realizado com sucesso!');
      alert(`Bem-vindo ${dados.user.nome_usuario || user}`);
      ok = true;
      return ok;
    } else {
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

      console.debug('Detalhes do erro:', dados.mensagem || dados);
      return ok;

    }
  } catch (erro) {
    console.error('🚫 Erro de conexão com o servidor:', erro.message);
    return ok;
  }
}

async function menu() {
  let exit = false;

  while (!exit) {
    const option = prompt('1 - Fazer login\n2 - Cadastrar novo usuário\n3 - Sair\nEscolha uma opção: ');

    switch (option) {
      case '1':
        const user1 = prompt('Digite o login(email)');
        const pass1 = prompt('Digite a senha');
        let exit1 = await fazerLogin(user1, pass1);
        while (exit1)
        {
          const option1 = prompt('1 - Iniciar um treino\n2 - Registrar\n3 - Buscar\n4 - Deslogar\nEscolha uma opção: ');
          switch (option1)
          {
            case '1':
              await iniciarTreino();
              break;

            case '2':
              var voltar = false;
              while (!voltar)
              {
                var option2 = prompt('1 - Registrar alimento\n2 - Registrar exercício\n3 - Registrar nova planilha de treino\n4 - Voltar\nEscolha uma opção: ');
                switch(option2)
                {   
                  case '1': 
                    await registrarAlimento(); 
                    break;
                    
                  case '2':
                    await registrarExercicio();
                    break;

                  case '3':
                    await registrarPlanilhaTreino();
                    break;

                  case '4':
                    alert('Voltando...');
                    voltar = true;
                    break;

                  default:
                    mensagemErro();
                    break;
                }
              }
              break;

            case '3':
              var voltar = false;
              while (!voltar)
              {
                var option2 = prompt('1 - Buscar treino\n2 - Buscar alimento\n3 - Buscar exercício\n4 - Buscar planilha de treino\n5 - Buscar calorias diárias\n6 - Buscar historico de treino\n7 - Buscar medida corporal\n8 - Buscar passos\n9 - Busca peso corporal\n10 - Voltar\nEscolha uma opção: ');
                switch(option2)
                {
                  case '1':
                    await buscaTreino();
                    break;

                  case '2':
                    await buscaAlimento();
                    break;
                  
                  case '3':
                    await buscaExercicio();
                    break;

                  case '4':
                    await buscaPlanilhaTreino();
                    break;

                  case '5':
                    await buscaCaloriasDiarias();
                    break;

                  case '6':
                    await buscaHistoricoTreino();
                    break;

                  case '7':
                    await buscaMedidaCorporal();
                    break;

                  case '8':
                    await buscaPassos();
                    break;

                  case '9':
                    await buscaPesoCorporal();
                    break;
                    
                  case '10':
                    alert('Voltando...');
                    voltar = true;
                    break;
                    
                  default:
                    mensagemErro();
                    break;
                }
              }
              break;

            case '4':
              alert('Deslogando...');
              exit1 = false;
              break;

            default:
              mensagemErro();
              break;
          }
        }
        break;

      case '2':
        await registrarUsuario();
        break;

      case '3':
        alert('Saindo...');
        exit = true;
        break;

      default:
        mensagemErro();
        break;

    }
  }
}

menu();
