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

    posts.reverse().forEach(post => {
    const postEl = document.createElement('section');
    postEl.classList.add('post');
    postEl.innerHTML = `
        <div class="post-header">
        <img class="avatar" src="imgs/avatarGustavo.jpg" alt="Avatar do Usuário">
        <span class="username">gu._.padilha</span>
        <button class="options-button">...</button>
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
        <div id="post-likes">0 curtidas</div>
        <div style="text-align:left; margin-top:5px;"><small>${new Date(post.created_at).toLocaleString()}</small></div>
        <div class="post-caption"><strong>gu._.padilha</strong> ${post.texto}</div>
        <div class="post-comments">
        </div>
        <input type="text" class="comment-input" placeholder="Adicionar comentário...">

    `;
    container.appendChild(postEl);
    });
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

const container = document.getElementById('posts-container');

container.addEventListener('click', (e) => {
  // Função Curtir
  const likeBtn = e.target.closest('.like-button');
  if (likeBtn) {
    const img = likeBtn.querySelector('img');
    if (!img) return;

    if (img.src.endsWith('coracao.jpg')) {
      img.src = 'icones/coracao_vermelho.jpg';
    } else {
      img.src = 'icones/coracao.jpg';
    }
    return;
  }

  // Função Comentar
  const commentBtn = e.target.closest('.comment-button');
  if (commentBtn) {
    const img = commentBtn.querySelector('img');
    if (!img) return;

    if (img.src.endsWith('comentario.jpg')) {
      img.src = 'icones/comentario_azul.jpg';

    } else {
      img.src = 'icones/comentario.jpg';
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
