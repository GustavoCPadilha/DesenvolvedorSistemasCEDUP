async function traduzir(q, from = 'auto', to = 'pt') {
  const langpair = `${from === 'auto' ? 'en' : from}|${to}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${encodeURIComponent(langpair)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.responseData.translatedText;
  } catch (err) {
    console.error("Erro na tradução:", err);
    return null;
  }
}

const idiomas = {
  'ing': 'en',
  'por': 'pt',
  'esp': 'es',
  'fra': 'fr',
  'chi': 'zh',
  'jap': 'ja'
};

const inputElement = document.getElementById('input');
const resultado = document.getElementById('texto');

Object.keys(idiomas).forEach(id => {
  const botao = document.getElementById(id);
  if (botao) {
    botao.addEventListener('click', async () => {
      const textoParaTraduzir = inputElement.value.trim();
      if (!textoParaTraduzir) {
        alert('Digite algo para traduzir!');
        inputElement.focus();
        return;
      }
      const idiomaDestino = idiomas[id];
      resultado.innerText = 'Traduzindo...';
      const traducao = await traduzir(textoParaTraduzir, 'auto', idiomaDestino);
      if (traducao) {
        resultado.innerText = traducao;
      } else {
        resultado.innerText = 'Erro ao traduzir.';
      }
    });
  }
});

document.getElementById('enviar').addEventListener('click', async () => {
  const textoParaTraduzir = inputElement.value.trim();
  if (!textoParaTraduzir) {
    alert('Digite algo para traduzir!');
    inputElement.focus();
    return;
  }
  resultado.innerText = 'Traduzindo...';
  const traducao = await traduzir(textoParaTraduzir, 'auto', 'pt');
  if (traducao) {
    resultado.innerText = traducao;
  } else {
    resultado.innerText = 'Erro ao traduzir.';
  }
});
