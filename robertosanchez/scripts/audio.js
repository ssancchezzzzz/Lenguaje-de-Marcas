const audio = document.getElementById("audio");

document.addEventListener("mousemove", e => {
  audio.volume = e.clientX / window.innerWidth;

  if (audio.paused) {
    audio.play().catch(() => {});
  }
});