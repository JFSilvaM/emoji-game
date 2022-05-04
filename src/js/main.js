const emojis = shuffleEmojis();
let cardsLeft = emojis.length;
let storedCards = [];
let attempts = 0;

document.addEventListener("DOMContentLoaded", () => {
  createGame();
});

function updateAttempts() {
  document.querySelector(".subtitle").innerHTML = `Intentos: ${attempts}`;
}

function handleCardClick() {
  // only select one card at a time
  if (storedCards.length > 1) return;

  storedCards.push(this);

  this.classList.add("flipped");

  this.removeEventListener("click", handleCardClick);

  this.children[1].textContent = emojis[this.children[1].dataset.emoji];

  // return if the user hasn't selected two cards
  if (storedCards.length !== 2) return;

  attempts++;
  updateAttempts();

  checkCards();
}

function checkCards() {
  const firstCard = storedCards[0];
  const secondCard = storedCards[1];

  if (
    emojis[firstCard.children[1].dataset.emoji] !==
    emojis[secondCard.children[1].dataset.emoji]
  ) {
    setTimeout(() => {
      document.querySelector("#wrong").play();

      firstCard.addEventListener("click", handleCardClick);
      secondCard.addEventListener("click", handleCardClick);

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      storedCards = [];
    }, 1000);
    return;
  }

  storedCards = [];
  cardsLeft -= 2;

  setTimeout(() => {
    document.querySelector("#correct").play();
  }, 500);

  if (!cardsLeft) {
    // create a modal window
    console.log("Juego terminado");
  }
}

function createModal() {
  const template = document.querySelector(".modal").content;
  const modal = template.cloneNode(true);

  // document.body.appendChild(modal);
}

function createGame() {
  const headingTitle = createElement("h1", "title");
  const section = createElement("section", "content");
  const articleCards = createElement("article", "cards");
  const articleAttempts = createElement("aside", "attempts");
  const headingAttempts = createElement("h2", "subtitle");

  headingTitle.textContent = "Emoji Game";
  headingAttempts.textContent = `Intentos: ${attempts}`;

  articleAttempts.appendChild(headingAttempts);

  for (let i = 0; i < emojis.length; i++) {
    const card = createElement("div", "card");
    const front = createElement("div", "front");
    const back = createElement("div", "back");

    front.textContent = "❔";
    back.dataset.emoji = i;

    card.append(front, back);
    card.addEventListener("click", handleCardClick);

    articleCards.appendChild(card);
  }
  createModal();
  section.append(headingTitle, articleCards, articleAttempts);
  document.body.appendChild(section);
}

function createElement(element, className) {
  const elm = document.createElement(element);

  elm.classList.add(className);

  return elm;
}

function shuffleEmojis() {
  const emojis = ["🫠", "😋", "😀", "💩", "🧐", "😡", "🤠", "🙄"];
  const emojiList = emojis.concat(emojis);
  const shuffledEmojis = [];

  while (emojiList.length > 0) {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    shuffledEmojis.push(emojiList[randomIndex]);
    emojiList.splice(randomIndex, 1);
  }

  return shuffledEmojis;
}
