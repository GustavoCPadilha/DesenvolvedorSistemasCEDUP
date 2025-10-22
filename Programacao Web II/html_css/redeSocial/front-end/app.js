window.onload = carregarPosts;

// Captura do formulário e envio de post
const form = document.getElementById('form-post');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // evita reload da página
  const formData = new FormData(form); // pega dados do formulário, incluindo arquivo
  const res = await fetch('http://localhost:3000/post', { method: 'POST', body: formData });
  const data = await res.json();

  if (data.sucesso) {
    carregarPosts(); // atualiza feed
    form.reset(); // limpa formulário
  } else {
    alert('Erro ao enviar post.');
  }
});

// Função principal para carregar posts e seus comentários
// Usa async/await para requisições assíncronas ao servidor
async function carregarPosts() {
    // Busca todos os posts do servidor
    const res = await fetch('http://localhost:3000/posts');
    const posts = await res.json();

    // Limpa o container para evitar duplicação de posts
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    // Usa for..of em vez de forEach para poder usar await dentro do loop
    // reverse() mostra posts mais recentes primeiro
    for (const post of posts.reverse()) {
        const postEl = document.createElement('section');
        postEl.classList.add('post');
        postEl.dataset.id = post.id;
        postEl.innerHTML = `
            <div class="post-header">
            <img class="avatar" src="imgs/gustavo.jpg" alt="Avatar do Usuário">
            <span class="username">gu._.padilha</span>

            <div class="options-wrapper">
              <button class="options-button" aria-label="Opções">⋯</button>
              <div class="post-menu" aria-hidden="true">
                <button class="delete-post-button">Excluir</button>
              </div>
            </div>

            </div>
            <img class="post-image" src="http://localhost:3000${post.imagem_url}" alt="Imagem da Postagem">
            <div class="post-actions">
                <abbr title="Curtir"><button class="like-button">
                    <img src="icones/coracao.jpg">
                </button></abbr>
                <abbr title="Comentar"><button class="comment-button">
                    <img src="icones/comentario.jpg">
                </button></abbr>
                <abbr title="Compartilhar"><button class="share-button">
                    <img src="icones/compartilhar.ico">
                </button></abbr>
                <abbr style="margin-left: auto;" title="Salvar">
                <button class="save-button">
                    <img src="icones/salvar.jpg">
                </button></abbr>
            </div>
            <div class="post-likes">0 curtidas</div>
            <div style="text-align:left; margin-top:5px;"><small>${new Date(post.created_at).toLocaleString()}</small></div>
            <div class="post-caption"><strong>gu._.padilha</strong> ${post.texto}</div>
            <div class="post-comments"></div>
            <input type="text" class="comment-input" placeholder="Adicionar comentário...">
        `;
        container.appendChild(postEl);

        // carregar comentários desse post
        try {
            const comRes = await fetch(`http://localhost:3000/post/${post.id}/comments`);
            if (comRes.ok) {
                const comments = await comRes.json();
                const commentsDiv = postEl.querySelector('.post-comments');
                comments.forEach(c => {
                    const div = document.createElement('div');
                    div.classList.add('single-comment');
                    // pequeno escape para evitar XSS
                    const autor = escapeHtml(c.autor || 'Anônimo');
                    const texto = escapeHtml(c.texto || '');
                    div.innerHTML = `<strong>${autor}</strong> ${texto}`;
                    commentsDiv.appendChild(div);
                });
            }
        } catch (err) {
            console.error('Erro ao carregar comentários:', err);
        }
    }
}

// Indicativo que escolheu uma imagem para postar
const inputImagem = document.getElementById('imagem');
const labelTexto = document.querySelector('.file-label-text');

inputImagem.addEventListener('change', () => {
    if (inputImagem.files.length > 0) {
        const nomeArquivo = inputImagem.files[0].name;
        labelTexto.textContent = `Imagem selecionada: ${nomeArquivo}`;
        inputImagem.closest('label').style.backgroundColor = '#4CAF50'; // verde para indicar sucesso
    } else {
        labelTexto.textContent = 'Escolher imagem';
        inputImagem.closest('label').style.backgroundColor = '#bc1888'; // cor original
    }
});

// Função que vai curtindo conforme o tempo passa
setInterval(() => {
    document.querySelectorAll('.post-likes').forEach(likeDiv => {
    let numero = parseInt(likeDiv.textContent);
    numero++;
    likeDiv.textContent = `${numero} curtidas`;
  });
}, 2000);

// Gerenciador central de interações com os posts
// Usa delegação de eventos para lidar com todos os cliques no container
const container = document.getElementById('posts-container');

container.addEventListener('click', (e) => {

  // Manipulação do menu de opções (três pontinhos)
  // closest() encontra o elemento mais próximo que corresponde ao seletor
  const optionsBtn = e.target.closest('.options-button');
  if (optionsBtn) {
    const postEl = optionsBtn.closest('.post');
    if (!postEl) return;
    const menu = postEl.querySelector('.post-menu');
    const show = menu.classList.toggle('visible');
    menu.setAttribute('aria-hidden', !show);
    return;
  }

  // clicar no botão "Excluir" dentro do menu
  const deleteBtn = e.target.closest('.delete-post-button');
  if (deleteBtn) {
    const postEl = deleteBtn.closest('.post');
    const postId = postEl ? postEl.dataset.id : null;
    if (!postId) return;

    fetch(`http://localhost:3000/post/${postId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.sucesso) {
          postEl.remove();
        } else {
          alert('Erro ao deletar post.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao conectar com o servidor.');
      });

    return;
  }

  // Sistema de curtidas
  // Encontra o botão de curtir mais próximo do elemento clicado
  const likeBtn = e.target.closest('.like-button');

  if (likeBtn) {
    const img = likeBtn.querySelector('img');
    if (!img) return;

    // Encontra o contador de curtidas do post atual
    // e converte o texto para número
    const postLikes = likeBtn.closest('.post').querySelector('.post-likes');
    let curtidasAtual = parseInt(postLikes.textContent);

    if (img.src.endsWith('coracao.jpg')) {
      img.src = 'icones/coracao_vermelho.jpg';
      curtidasAtual++;
    } else {
      img.src = 'icones/coracao.jpg';
      curtidasAtual--;
    }
    postLikes.textContent = `${curtidasAtual} curtidas`;

    return;
  }

  // Função Comentar (mostrar/esconder input)
  const commentBtn = e.target.closest('.comment-button');
  if (commentBtn) {
    const img = commentBtn.querySelector('img');
    if (!img) return;

    if (img.src.endsWith('comentario.jpg')) {
      img.src = 'icones/comentario_azul.jpg';
    } else {
      img.src = 'icones/comentario.jpg';
    }

    const post = commentBtn.closest('.post');
    const input = post ? post.querySelector('.comment-input') : null;
    if (input) {
      const isVisible = input.classList.toggle('visible'); // alterna visibilidade
      if (isVisible) {
        input.focus();
        input.classList.add('active-comment');
        setTimeout(() => input.classList.remove('active-comment'), 2000);
      }
    }

    return;
  }

  // Função Salvar
  const saveBtn = e.target.closest('.save-button');
  if (saveBtn) {
    const img = saveBtn.querySelector('img');
    if (!img) return;

    if (img.src.endsWith('salvar.jpg')) {
      img.src = 'icones/salvar_amarelo.jpg';
    } else {
      img.src = 'icones/salvar.jpg';
    }
    return;
  }
});

// Sistema de comentários - Detecta Enter no campo de comentário
// Usa evento keydown para capturar a tecla Enter
container.addEventListener('keydown', async (e) => {
  // Verifica se o elemento que recebeu o evento é um campo de comentário
  if (!e.target.classList.contains('comment-input')) return;
  // Só processa se a tecla pressionada for Enter
  if (e.key !== 'Enter') return;
  e.preventDefault(); // Previne quebra de linha no input

  const input = e.target;
  const texto = input.value.trim();
  if (!texto) return;

  const postEl = input.closest('.post');
  const postId = postEl ? postEl.dataset.id : null;
  if (!postId) return;

  try {
    const res = await fetch(`http://localhost:3000/post/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto, autor: 'gu._.padilha' })
    });
    const data = await res.json();
    if (data.sucesso && data.comentario) {
      const commentsDiv = postEl.querySelector('.post-comments');
      const div = document.createElement('div');
      div.classList.add('single-comment');
      const autor = escapeHtml(data.comentario.autor || 'Anônimo');
      const textoEsc = escapeHtml(data.comentario.texto || '');
      div.innerHTML = `<strong>${autor}</strong> ${textoEsc}`;
      commentsDiv.appendChild(div);
      input.value = '';
    } else {
      alert('Erro ao enviar comentário.');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor.');
  }
});

// Sistema de Stories - Inicialização e configuração do visualizador
function initStories() {
  // Busca todos os stories disponíveis
  const storyItems = document.querySelectorAll('.story-item');
  if (!storyItems.length) return; // Se não houver stories, não faz nada

  // Cria o overlay do visualizador de stories
  // Este elemento será usado para mostrar os stories em tela cheia
  const viewer = document.createElement('div');
  viewer.className = 'story-viewer-overlay';
  viewer.style.display = 'none';
  viewer.style.position = 'fixed';
  viewer.style.top = '0';
  viewer.style.left = '0';
  viewer.style.width = '100%';
  viewer.style.height = '100%';
  viewer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  viewer.style.display = 'none';
  viewer.style.justifyContent = 'center';
  viewer.style.alignItems = 'center';
  viewer.style.zIndex = '1000';

  viewer.innerHTML = `
    <div class="story-viewer-box" style="position: relative; width: 100%; height: 100%;">
      <button class="story-close" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: white; font-size: 24px; cursor: pointer; z-index: 1001;">✕</button>
      <img class="story-img" src="" alt="" style="width: 100%; height: 100%; object-fit: contain;">
    </div>
  `;
  document.body.appendChild(viewer);

  // Função para mostrar story
  function showStory(storyItem) {
    const img = storyItem.querySelector('.story-avatar');
    if (!img) return;

    viewer.querySelector('.story-img').src = img.src;
    viewer.style.display = 'flex';
    
    // Marca como visto
    storyItem.querySelector('.story-border')?.classList.add('story-visto');
  }

  // Fecha o viewer
  function closeViewer() {
    viewer.style.display = 'none';
  }

  // Event listener apenas para o botão de fechar
  viewer.querySelector('.story-close').onclick = closeViewer;

  // Abre story ao clicar
  storyItems.forEach(story => {
    story.onclick = () => showStory(story);
  });
}

// inicializa após carregamento
window.addEventListener('load', () => {
  // mantém comportamento existente
  if (typeof carregarPosts === 'function') carregarPosts();
  initStories();
});