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
            <abbr title="Curtir"><button id="like-button"></button></abbr>
            <abbr title="Comentar"><button id="comment-button"></button></abbr>
            <abbr title="Compartilhar"><button id="share-button"></button></abbr>
            <abbr style="margin-left: auto;" title="Salvar"><button id="save-button"></button></abbr>
        </div>
        <div id="post-likes">169 curtidas</div>
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
const labelImagem = inputImagem.closest('label');

inputImagem.addEventListener('change', () => {
    if (inputImagem.files.length > 0) {
        const nomeArquivo = inputImagem.files[0].name;
        labelImagem.textContent = `Imagem selecionada: ${nomeArquivo}`;
        labelImagem.style.backgroundColor = '#4CAF50'; // verde para indicar sucesso
    } else {
        labelImagem.textContent = 'Escolher imagem';
        labelImagem.style.backgroundColor = '#bc1888'; // cor original do botão
    }
});

const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
    saveButton.style.backgroundColor = '#e9ec38ff';
});

// Função para likes
const likeButton = document.getElementById('like-button');
const postLikes = document.getElementById('post-likes');
var likes = 0;

likeButton.addEventListener('click', () => {
    likes++;
    document.getElementById('post-likes').textContent = likes;
});

