const cardsContainer = document.getElementsByClassName("cards-container")[0];

const renderCards = (name) => {
  // Fuzzy search
  return fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${name}`)
    .then((res) => res.json())
    .then((AllCards) => {
      AllCards.data.forEach((singleCardData) => {
        renderSingleCard(singleCardData);
        console.log(singleCardData);
      });
    });
};

const renderSingleCard = (singleCardData) => {
  const card = document.createElement("div");
  const cardInformation = document.createElement("div");
  const cardName = document.createElement("h1");
  const cardImage = document.createElement("img");
  const cardDescription = document.createElement("p");

  card.classList.add("card");
  cardImage.classList.add("card-image");
  cardInformation.classList.add("card-information");
  cardName.classList.add("card-name");
  cardDescription.classList.add("card-description");

  cardName.innerText = singleCardData.name;
  cardImage.src = singleCardData.card_images[0].image_url;
  cardDescription.innerText = singleCardData.desc;

  card.appendChild(cardImage);
  card.appendChild(cardInformation);
  cardInformation.appendChild(cardName);
  cardInformation.appendChild(cardDescription);

  cardsContainer.appendChild(card);
};

// SEARCH BAR FUNCTIONALITY
document.querySelector(".search-bar").addEventListener("submit", (e) => {
  e.preventDefault();
  clearList(cardsContainer);
  let searchEntry = e.target.querySelector(".search-input").value;
  console.log(searchEntry);
  if (searchEntry.length > 0) {
    renderCards(searchEntry);
  }
  document.querySelector(".search-bar").reset();
});

// CLEAR SEARCH RESULTS
const clearList = (parent) => {
  let first = parent.firstElementChild;
  while (first) {
    first.remove();
    first = parent.firstElementChild;
  }
};

renderCards('dark magician');

// const card = document.createElement("div");
// const cardName = document.createElement("h1");
// const cardImage = document.createElement("img");

// console.log(cardName);
