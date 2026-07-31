const gatePage = document.getElementById("gatePage");
const birthdayPage = document.getElementById("birthdayPage");
const passwordForm = document.getElementById("passwordForm");
const mathQuestion = document.getElementById("mathQuestion");
const answerInput = document.getElementById("answerInput");
const answerMessage = document.getElementById("answerMessage");

let correctAnswer = 0;

function makeMathQuestion() {
  const operators = ["＋", "－", "×", "÷"];
  const operator =
    operators[Math.floor(Math.random() * operators.length)];

  let firstNumber;
  let secondNumber;

  switch (operator) {
    case "＋":
      firstNumber = Math.floor(Math.random() * 9) + 1;
      secondNumber = Math.floor(Math.random() * 9) + 1;
      correctAnswer = firstNumber + secondNumber;
      break;

    case "－":
      firstNumber = Math.floor(Math.random() * 9) + 1;
      secondNumber = Math.floor(Math.random() * 9) + 1;

      // 答えがマイナスにならないようにする
      if (firstNumber < secondNumber) {
        [firstNumber, secondNumber] =
          [secondNumber, firstNumber];
      }

      correctAnswer = firstNumber - secondNumber;
      break;

    case "×":
      firstNumber = Math.floor(Math.random() * 9) + 1;
      secondNumber = Math.floor(Math.random() * 9) + 1;
      correctAnswer = firstNumber * secondNumber;
      break;

    case "÷":
      // 割り切れて、両方とも1桁になる問題を作る
      secondNumber = Math.floor(Math.random() * 9) + 1;

      const maxAnswer = Math.floor(9 / secondNumber);
      correctAnswer =
        Math.floor(Math.random() * maxAnswer) + 1;

      firstNumber = secondNumber * correctAnswer;
      break;
  }

  mathQuestion.textContent =
    `${firstNumber} ${operator} ${secondNumber} ＝ ？`;
}

function showBirthdayPage() {
  answerMessage.textContent = "正解！ページを開きます…";
  answerMessage.className = "answer-message is-correct";
  gatePage.classList.add("is-leaving");

  window.setTimeout(() => {
    gatePage.hidden = true;
    birthdayPage.hidden = false;
    birthdayPage.classList.add("is-entering");
    window.scrollTo(0, 0);
  }, 430);
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userAnswer = Number(answerInput.value);
  if (answerInput.value.trim() === "") {
    answerMessage.textContent = "答えを入力して右の虫眼鏡マークを押して！";
    answerMessage.className = "answer-message is-error";
    return;
  }

  if (userAnswer === correctAnswer) {
    showBirthdayPage();
  } else {
    answerMessage.textContent = "おしい！もう一度計算してみてね。";
    answerMessage.className = "answer-message is-error";
    answerInput.select();
  }
});

makeMathQuestion();

const modal = document.getElementById("giftModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeButton = document.getElementById("closeButton");
const confetti = document.getElementById("confetti");

const giftData = {
  1: {
    title: "はずれ！",
    html: '<p class="result-text">ざんねん！<br>ほかの箱も開けてみてね。</p>'
  },
  2: {
    title: "あたり！\nメッセージのプレゼント！",
    html: '<p class="result-text">誕生日おめでとう！<br>今年もぜひ良い一年にしてね！</p>',
    confetti: true
  },
  3: {
    title: "はずれ！",
    html: '<p class="result-text">ざんねん！<br>まだ当たりが残っているかも？</p>'
  },
  4: {
    title: "あたり！\nイラストのプレゼント！",
    html: '<img class="illustration" src="assets/illustration4.png" alt="4番のイラストのプレゼント">',
    confetti: true
  },
  5: {
    title: "ヒント！",
    html: '<p class="result-text">あたりは3つだよ！</p>'
  },
  6: {
    title: "あたり！\nさやから！イラストのプレゼント！",
    html: '<img class="illustration" src="assets/illustration6.png" alt="6番のイラストのプレゼント">',
    confetti: true
  }
};

document.querySelectorAll(".gift-button").forEach((button) => {
  button.addEventListener("click", () => {
    openGift(button.dataset.gift);
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
