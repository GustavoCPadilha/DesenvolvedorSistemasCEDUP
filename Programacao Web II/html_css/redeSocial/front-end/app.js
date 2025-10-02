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
            <abbr title="Curtir"><button class="like-button"></button></abbr>
            <abbr title="Comentar"><button class="comment-button"></button></abbr>
            <abbr title="Compartilhar"><button class="share-button"></button></abbr>
            <abbr style="margin-left: auto;" title="Salvar"><button class="save-button"></button></abbr>
        </div>
        <div class="post-likes">169 curtidas</div>
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
