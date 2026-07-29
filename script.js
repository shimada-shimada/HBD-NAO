const modal = document.getElementById("giftModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeButton = document.getElementById("closeButton");
const confetti = document.getElementById("confetti");

const giftData = {
  1: {
    title: "ざんねん！",
    html: '<p class="result-text">はずれ！<br>もう一つ選んでみてね。</p>'
  },
  2: {
    title: "お誕生日おめでとう！",
    html: '<p class="result-text">今年も良い1年になりますように！</p>'
  },
  3: {
    title: "イラストのプレゼント",
    html: '<img class="illustration" src="assets/illustration.png" alt="誕生日のお祝いイラスト">'
  },
  4: {
    title: "ざんねん！",
    html: '<p class="result-text">はずれ！<br>まだ当たりがあるかも？</p>'
  },
  5: {
    title: "大当たり！",
    html: '<p class="result-text">あたり！<br>特別なプレゼントをどうぞ！</p>',
    confetti: true
  }
};

document.querySelectorAll(".gift-button").forEach((button) => {
  button.addEventListener("click", () => {
    const giftNumber = button.dataset.gift;
    openGift(giftNumber);
  });
});

function openGift(giftNumber) {
  const gift = giftData[giftNumber];
  modalTitle.textContent = gift.title;
  modalContent.innerHTML = gift.html;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();

  if (gift.confetti) {
    launchConfetti();
  }
}

function closeGift() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  confetti.innerHTML = "";
}

closeButton.addEventListener("click", closeGift);

modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeGift();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeGift();
  }
});

function launchConfetti() {
  confetti.innerHTML = "";
  const symbols = ["●", "◆", "★", "♥", "✦"];

  for (let i = 0; i < 36; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.animationDuration = `${1.6 + Math.random() * 1.2}s`;
    piece.style.color = `hsl(${Math.random() * 360}, 75%, 62%)`;
    confetti.appendChild(piece);
  }

  window.setTimeout(() => {
    confetti.innerHTML = "";
  }, 3200);
}
