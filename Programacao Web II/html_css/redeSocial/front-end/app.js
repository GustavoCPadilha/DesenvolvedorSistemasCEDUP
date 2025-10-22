const form = document.getElementById('form-post');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = await fetch('http://localhost:3000/post', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();

  if (data.sucesso) {
    carregarPosts();
    form.reset();
  } else {
    alert('Erro ao enviar post.');
  }
});

async function carregarPosts() {
    const res = await fetch('http://localhost:3000/posts');
    const posts = await res.json();

    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    // usar for..of para poder aguardar fetch de comentários por post
    for (const post of posts.reverse()) {
        const postEl = document.createElement('section');
        postEl.classList.add('post');
        postEl.dataset.id = post.id;
        postEl.innerHTML = `
            <div class="post-header">
            <img class="avatar" src="imgs/Gustavo.jpeg" alt="Avatar do Usuário">
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

        // carregar comentários desse post e inserir no DOM
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

window.onload = carregarPosts;

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

// Funções relacionadas ao post
const container = document.getElementById('posts-container');

container.addEventListener('click', (e) => {

  // abrir/fechar o menu de opções
  const optionsBtn = e.target.closest('.options-button');
  if (optionsBtn) {
    const postEl = optionsBtn.closest('.post');
    if (!postEl) return;
    const menu = postEl.querySelector('.post-menu');

    // fechar outros menus abertos
    document.querySelectorAll('.post-menu.visible').forEach(m => {
      if (m !== menu) {
        m.classList.remove('visible');
        m.setAttribute('aria-hidden', 'true');
      }
    });

    const show = menu.classList.toggle('visible');
    menu.setAttribute('aria-hidden', !show);
    return;
  }

  // clicar no botão "Excluir" dentro do menu (sem pop-up)
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

  // se clicar fora do wrapper de opções, fecha menus abertos
  if (!e.target.closest('.options-wrapper')) {
    document.querySelectorAll('.post-menu.visible').forEach(m => {
      m.classList.remove('visible');
      m.setAttribute('aria-hidden', 'true');
    });
  }

  // Função Curtir
  const likeBtn = e.target.closest('.like-button');

  if (likeBtn) {
    const img = likeBtn.querySelector('img');
    if (!img) return;

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

// helper para escapar texto
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// evento delegad0 para enviar comentário ao pressionar Enter
container.addEventListener('keydown', async (e) => {
  if (!e.target.classList.contains('comment-input')) return;
  if (e.key !== 'Enter') return;
  e.preventDefault();

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
      body: JSON.stringify({ texto, autor: 'gu._.padilha' }) // ajustar autor conforme necessário
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

// Inicializa stories (comportamento estilo Instagram)
function initStories() {
  const storyItems = Array.from(document.querySelectorAll('.story-item'));
  if (!storyItems.length) return;

  // monta array com dados de cada story
  const stories = storyItems.map((el, idx) => {
    el.dataset.storyIndex = idx;
    const img = el.querySelector('.story-avatar');
    const username = el.querySelector('.story-username')?.textContent || '';
    return { el, imgSrc: img ? img.src : '', username };
  });

  // cria overlay apenas uma vez
  let overlay = null;
  let current = 0;
  let timer = null;
  const DURATION = 3000; // tempo de exibição (ms)
  let progressInterval = null;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'story-viewer-overlay';
    overlay.innerHTML = `
      <div class="story-viewer-box" role="dialog" aria-modal="true">
        <button class="story-close" aria-label="Fechar">✕</button>
        <div class="story-header">
          <img class="story-header-avatar" src="" alt="">
          <div class="story-header-info">
            <div class="story-header-username"></div>
          </div>
        </div>
        <div class="story-media-wrap">
          <img class="story-viewer-img" src="" alt="">
        </div>
        <div class="story-controls">
          <button class="story-prev" aria-label="Anterior">◀</button>
          <div class="story-progress"><div class="story-progress-bar"></div></div>
          <button class="story-next" aria-label="Próximo">▶</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // eventos
    overlay.querySelector('.story-close').addEventListener('click', closeViewer);
    overlay.querySelector('.story-next').addEventListener('click', () => { nextStory(); resetTimer(); });
    overlay.querySelector('.story-prev').addEventListener('click', () => { prevStory(); resetTimer(); });

    // fechar ao clicar fora do box
    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay) closeViewer();
    });

    // pausa autoplay ao passar o mouse
    const box = overlay.querySelector('.story-viewer-box');
    box.addEventListener('mouseenter', pauseTimer);
    box.addEventListener('mouseleave', resumeTimer);

    // teclado
    document.addEventListener('keydown', onKeyDown);
  }

  function onKeyDown(e) {
    if (!overlay || overlay.style.display !== 'flex') return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') { nextStory(); resetTimer(); }
    if (e.key === 'ArrowLeft') { prevStory(); resetTimer(); }
  }

  function openViewer(index) {
    current = index;
    if (!overlay) createOverlay();
    overlay.style.display = 'flex';
    showStory(current);
    startTimer();
  }

  function closeViewer() {
    if (!overlay) return;
    overlay.style.display = 'none';
    stopTimer();
  }

  function showStory(idx) {
    const s = stories[idx];
    if (!s) return;
    const avatar = overlay.querySelector('.story-header-avatar');
    const username = overlay.querySelector('.story-header-username');
    const img = overlay.querySelector('.story-viewer-img');
    avatar.src = s.imgSrc;
    avatar.alt = s.username;
    username.textContent = s.username;
    img.src = s.imgSrc;
    img.alt = `Story de ${s.username}`;

    // marca como visto (altera borda)
    const border = s.el.querySelector('.story-border');
    if (border) border.classList.add('story-visto');

    // reset progress bar
    const bar = overlay.querySelector('.story-progress-bar');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    // pequena espera para garantir que transition volte a funcionar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${DURATION}ms linear`;
        bar.style.width = '100%';
      });
    });
  }

  function nextStory() {
    current = (current + 1) % stories.length;
    showStory(current);
  }

  function prevStory() {
    current = (current - 1 + stories.length) % stories.length;
    showStory(current);
  }

  function startTimer() {
    stopTimer();
    timer = setTimeout(() => {
      nextStory();
      startTimer();
    }, DURATION);
  }

  function stopTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
    if (progressInterval) { clearInterval(progressInterval); progressInterval = null; }
    const bar = overlay?.querySelector('.story-progress-bar');
    if (bar) { bar.style.transition = ''; } // reset
  }

  function pauseTimer() {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    // pause progress animation by computing current width and freezing it
    const bar = overlay.querySelector('.story-progress-bar');
    const computed = window.getComputedStyle(bar).width;
    const parentWidth = overlay.querySelector('.story-progress').clientWidth;
    const percent = (parseFloat(computed) / parentWidth) * 100;
    bar.style.transition = 'none';
    bar.style.width = `${percent}%`;
  }

  function resumeTimer() {
    // resume remaining time by restarting full duration (simple approach)
    const bar = overlay.querySelector('.story-progress-bar');
    requestAnimationFrame(() => {
      bar.style.transition = `width ${DURATION}ms linear`;
      bar.style.width = '100%';
    });
    startTimer();
  }

  function resetTimer() {
    stopTimer();
    // restart progress bar
    const bar = overlay.querySelector('.story-progress-bar');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${DURATION}ms linear`;
        bar.style.width = '100%';
      });
    });
    startTimer();
  }

  // associa clique a cada story
  storyItems.forEach(si => {
    si.addEventListener('click', (ev) => {
      const idx = parseInt(si.dataset.storyIndex || '0', 10);
      openViewer(idx);
    });
  });
}

// inicializa após carregamento
window.addEventListener('load', () => {
  // mantém comportamento existente
  if (typeof carregarPosts === 'function') carregarPosts();
  initStories();
});