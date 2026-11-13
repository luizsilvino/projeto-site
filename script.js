
const MUSICAS = [
   {
    titulo: "Superpowers",
    artista: "Ed Sheeran",
    arquivo: "music/perfect.mp3"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const titleEl = document.getElementById("track-title");
const artistEl = document.getElementById("track-artist");
const hint = document.getElementById("player-hint");
const playlist = document.getElementById("playlist");

let current = 0;

function tempo(segundos) {
  if (!Number.isFinite(segundos)) return "0:00";

  const min = Math.floor(segundos / 60);
  const sec = Math.floor(segundos % 60)
    .toString().padStart(2, "0");

  return `${min}:${sec}`;
}

function carregar(index, tocar = false) {
  if (!MUSICAS.length) return;

  current = (index + MUSICAS.length) % MUSICAS.length;

  const musica = MUSICAS[current];

  audio.src = musica.arquivo;
  titleEl.textContent = musica.titulo;
  artistEl.textContent = musica.artista || " ";

  progress.value = 0;

  document.getElementById("current-time").textContent = "0:00";
  document.getElementById("duration").textContent = "0:00";

  [...playlist.children].forEach((el, i) => {
    el.classList.toggle("active", i === current);
  });

  if (tocar) reproduzir();
}

function reproduzir() {
  if (!MUSICAS.length) return;

  audio.play().then(() => {
    playBtn.textContent = "Ⅱ";
  }).catch(() => {
    hint.textContent = "Confira se o arquivo MP3 existe na pasta music.";
  });
}

function pausar() {
  audio.pause();
  playBtn.textContent = "▶";
}

function montarPlaylist() {
  if (!MUSICAS.length) {
    hint.textContent = "Adicione músicas na lista MUSICAS do script.js.";
    return;
  }

  hint.textContent = "Escolha uma faixa ou use os controles.";

  MUSICAS.forEach((musica, i) => {
    const item = document.createElement("div");

    item.className = "song";

    item.innerHTML = `
      <span>${String(i + 1).padStart(2, "0")}　${musica.titulo}</span>
      <small>${musica.artista || "Reproduzir"}　▶</small>
    `;

    item.addEventListener("click", () => carregar(i, true));

    playlist.appendChild(item);
  });

  carregar(0);
}

playBtn.addEventListener("click", () => {
  audio.paused ? reproduzir() : pausar();
});

document.getElementById("prev").addEventListener("click", () => {
  carregar(current - 1, true);
});

document.getElementById("next").addEventListener("click", () => {
  carregar(current + 1, true);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }

  document.getElementById("current-time").textContent =
    tempo(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  document.getElementById("duration").textContent =
    tempo(audio.duration);
});

audio.addEventListener("ended", () => {
  carregar(current + 1, true);
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

document.getElementById("reveal").addEventListener("click", () => {
  const msg = document.getElementById("mensagem-final");

  msg.hidden = false;

  document.getElementById("reveal").textContent =
    "surpresa aberta ✧";

  document.getElementById("reveal").disabled = true;

  msg.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// ESTRELAS ANIMADAS

const stars = document.getElementById("stars");

for (let i = 0; i < 105; i++) {
  const star = document.createElement("i");

  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 4}s`;

  stars.appendChild(star);
}

montarPlaylist();