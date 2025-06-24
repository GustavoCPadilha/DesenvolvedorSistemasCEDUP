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

async function getData() {
    let dia_nasc = prompt("Digite o dia em que você nasceu: ");
    let mes_nasc = prompt("Digite o mês em que você nasceu: ");
    let ano_nasc = prompt("Digite o ano em que você nasceu: ");
    let data_nascimento = ano_nasc + "-" + mes_nasc + "-" + dia_nasc; 
    return data_nascimento;
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
      console.log('✅ Usuário registrado com sucesso!');
      console.log('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          console.warn('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          console.warn('❗ Esse nome de usuário já está em uso. Tente outro.');
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
    console.error('🚫 Erro ao tentar registrar usuário:', erro.message);
  }
}

async function registrarUsuario() {
    let nome_usuario = prompt("Digite seu nome completo: ");
    let email = prompt("Digite seu email: ");
    let ok = false;
    while (!ok)
    {
      var senha = prompt("Digite sua senha: ");
      let confirma_senha = prompt("Digite a senha novamente, para confirmação da senha: ");
      if (senha == confirma_senha)
      {
        ok = true;
        break;
      }
      alert("As senhas não batem... digite novamente!");
    }
    let data_nascimento = getData();
    let sexo = prompt("Selecione seu sexo [M/F]: ").toUpperCase;
    let altura = prompt("Digite sua altura: ");
    let peso_usuario = prompt("Digite seu peso atual: ");
    await registrarUsuario(nome_usuario, email, senha, data_nascimento, sexo, altura, peso_usuario);
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
      console.log('✅ Alimento registrado com sucesso!');
      console.log('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          console.warn('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          console.warn('❗ Esse alimento já foi cadastrado. Tente outro.');
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
    console.error('🚫 Erro ao tentar registrar alimento:', erro.message);
  }
}

async function registrarAlimento() {
    let nome_comida = prompt("Digite o nome do alimento que você deseja registrar: ");
    let calorias = parseFloat(prompt("Digite a quantidade de calorias que esse alimento tem a cada 100g: "));
    let proteinas = parseFloat(prompt("Digite a quantidade de proteinas que esse alimento tem a cada 100g: "));
    let carboidratos = parseFloat(prompt("Digite a quantidade de carboidratos que esse alimento tem a cada 100g: "));
    let gorduras = parseFloat(prompt("Digite a quantidade de gorduras que esse alimento tem a cada 100g: "));
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
      console.log('✅ Exercício registrado com sucesso!');
      console.log('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          console.warn('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          console.warn('❗ Esse exercício já foi cadastrado. Tente outro.');
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
    console.error('🚫 Erro ao tentar registrar exercício:', erro.message);
  }
}

async function registrarExercicio() {
  let nome_exercicio = prompt("Digite o nome do exercício que você deseja cadastrar: ");
  let opcao_musculo = prompt("1 - Abdômen\n2 - Bíceps\n3 - Ombros\n4 - Costas\n5 - Panturilha\n6 - Peitoral\n7 - Posterior\n8 - Quadríceps\n9 - Tríceps\n10 - Cardio\nDigite qual o músculo foco deste exercício: ");
  switch (opcao_musculo)
  {
    case "1":
      var musculo = "Abdômen";
      break;
    case "2":
      var musculo = "Bíceps";
      break;
    case "3":
      var musculo = "Ombros";
      break;
    case "4":
      var musculo = "Costas";
      break;
    case "5":
      var musculo = "Panturilha";
      break;
    case "6":
      var musculo = "Peitoral";
      break;
    case "7":
      var musculo = "Posterior";
      break;
    case "8":
      var musculo = "Quadríceps";
      break;
    case "9":
      var musculo = "Tríceps";
      break;
    case "10":
      var musculo = "Cardio";
      break;
    default:
      console.log("Agrupamento muscular inválido, digite um agrupamento válido: ");
      break;
  }
  let descricao = prompt("Digite a descrição do exercício, se houver: ");
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
      console.log('✅ Alimento registrado com sucesso!');
      console.log('Detalhes:', dados);
    } else {
      switch (resposta.status) {
        case 400:
          console.warn('⚠️ Dados inválidos. Verifique se todos os campos foram preenchidos corretamente.');
          break;
        case 409:
          console.warn('❗ Esse alimento já foi cadastrado. Tente outro.');
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
    console.error('🚫 Erro ao tentar registrar alimento:', erro.message);
  }
}

async function registrarPlanilhaTreino() {
  let nome_planilhaTreino = prompt("Digite o nome da sua nova planilha de treino: ");
  let data_inicio = getData();
  let ativa = prompt("Deseja tornar esta planilha como ativa? [S/N] ").toUpperCase();
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
    const resposta = await fetch('http://localhost:3000/buscaUsuario', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_usuario: user,
        senha: password
      })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      console.log('✅ Login realizado com sucesso!');
      console.log('Bem-vindo,', dados.nome || user); // se o backend retornar o nome
    } else {
      switch (resposta.status) {
        case 400:
          console.warn('⚠️ Requisição inválida. Verifique os dados enviados.');
          break;
        case 401:
          console.warn('🔒 Usuário ou senha incorretos.');
          break;
        case 404:
          console.warn('❌ Usuário não encontrado.');
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
    console.error('🚫 Erro de conexão com o servidor:', erro.message);
  }
}

async function menu() {
  let exit = false;

  while (!exit) {
    const option = prompt("1 - Fazer login\n2 - Cadastrar novo usuário\n3 - Sair\nEscolha uma opção: ");

    switch (option) {
      case "1":
        const user1 = prompt("Digite o login");
        const pass1 = prompt("Digite a senha");
        let continua = true;
        await fazerLogin(user1, pass1);
        while (continua)
        {
          const opcao = prompt("1 - Registrar alimento\n2 - Registrar exercício\n3 - Registrar nova planilha de treino\n4 - Voltar\nEscolha uma opção: ");
          switch (opcao)
          {
            case "1":
              registrarAlimento();
              break;
            case "2":
              registrarExercicio();
              break;
            case "3":
              registrarPlanilhaTreino();
              break;
            case "4":
              console.log("Voltando...");
              continua = false;
              break;
            default:
              console.log("Opção inválida. Tente novamente!");
              break;
          }
        }
        break;
      case "2":
        registrarUsuario();
        break;
      case "3":
        console.log("Saindo...");
        exit = true;
        break;
      default:
        console.log("Opção inválida. Tente novamente!");
        break;
    }
  }
}

menu();
