const buttons = document.querySelectorAll(".sound-button");
const status = document.querySelector(".status");

const players = new Map();

function getPlayer(button) {
  if (!players.has(button)) {
    const audio = new Audio(button.dataset.sound);
    audio.preload = "auto";
    players.set(button, audio);
  }

  return players.get(button);
}

function setStatus(message) {
  status.textContent = message;
}

buttons.forEach((button) => {
  const audio = getPlayer(button);

  audio.addEventListener("ended", () => {
    button.classList.remove("is-playing");
    setStatus("Ready.");
  });

  button.addEventListener("click", async () => {
    const label = button.dataset.label;

    buttons.forEach((otherButton) => {
      otherButton.classList.remove("is-playing");
    });

    players.forEach((player) => {
      player.pause();
      player.currentTime = 0;
    });

    button.classList.add("is-playing");
    setStatus(`Playing ${label}.`);

    try {
      await audio.play();
    } catch {
      button.classList.remove("is-playing");
      setStatus("Sound could not be played.");
    }
  });
});
