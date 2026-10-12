
const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

const enterButton = document.getElementById("enterButton");
const countNumber = document.getElementById("countNumber");
const bgMusic = document.getElementById("bgMusic");


enterButton.addEventListener("click", async () => {
  enterButton.disabled = true;

  showScreen("countdown");

  bgMusic.volume = 0.5;
  bgMusic.currentTime = 0;

  try {
    await bgMusic.play();
    console.log("Music is playing!");
  } catch (error) {
    console.error("Music playback failed:", error);
  }

  for (let number = 3; number >= 1; number--) {
    countNumber.textContent = number;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  showScreen("birthday");
  enterButton.disabled = false;
});

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);
  });
});

const wishButton = document.getElementById("wishButton");
const cakeNext = document.getElementById("cakeNext");

wishButton.addEventListener("click", () => {
  wishButton.textContent = "WISH SENT! ✨";
  wishButton.disabled = true;
  cakeNext.classList.remove("hidden");

  for (let i = 0; i < 24; i++) {
    const star = document.createElement("span");
    star.textContent = ["✦", "✧", "♡", "✨"][i % 4];
    star.style.position = "fixed";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = "-30px";
    star.style.color = "#ffb9ef";
    star.style.fontSize = "20px";
    star.style.pointerEvents = "none";
    star.style.zIndex = "10";
    star.style.animation = `fall ${4 + Math.random() * 3}s linear forwards`;

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 7500);
  }
});

const fallStyle = document.createElement("style");
fallStyle.textContent = `
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}`;
document.head.appendChild(fallStyle);

const letterButton = document.getElementById("letterButton");
const letterText = document.getElementById("letterText");

letterButton.addEventListener("click", () => {
  letterText.classList.remove("hidden");
  letterButton.classList.add("hidden");
});

document.getElementById("replayButton").addEventListener("click", () => {
  wishButton.disabled = false;
  wishButton.textContent = "I MADE A WISH ✧";
  cakeNext.classList.add("hidden");
  letterText.classList.add("hidden");
  letterButton.classList.remove("hidden");
  enterButton.disabled = false;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  showScreen("intro");
});

console.log("Birthday website is ready!");