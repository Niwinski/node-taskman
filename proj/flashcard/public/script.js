const cardsCont = document.getElementById("cards-cont");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addCont = document.getElementById("add-cont");

let activeCard = 0;
const cardsEl = [];
const cardData = [
    { q: "what is the meaning of life?", a: "42" },
    { q: "foooort?", a: "777" },
    { q: "how many?", a: "farty pants" },
];

const refresh = () => {
    currentEl.innerText = `${activeCard + 1}/${cardData.length}`;
};

createCard = (data) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <div class="inner-card">    
        <div class="inner-card-front"><p>${data.q}</p></div>    
        <div class="inner-card-back"><p>${data.a}</p></div>
    </div>`;

    card.addEventListener("click", () => {
        console.log(`clicked on ${data.a}`);
        card.classList.toggle("show-answer");
    });
    cardsEl.push(card);
    cardsCont.appendChild(card);
};

createAllCards = () => {
    cardData.forEach((data) => createCard(data));
    activeCard = 1;
    cardsEl[activeCard].className = "card active";

    refresh();

    nextBtn.addEventListener("click", (e) => {
        cardsEl[activeCard].className = "card";
        activeCard = Math.min(activeCard + 1, cardData.length - 1);
        cardsEl[activeCard].className = "card active";
        refresh();
    });
    prevBtn.addEventListener("click", (e) => {
        cardsEl[activeCard].className = "card left ";
        activeCard = Math.max(activeCard - 1, 0);
        cardsEl[activeCard].className = "card active";
        refresh();
    });

    showBtn.addEventListener("click", (e) => {
        console.log("shows");
        addCont.classList.add("show");
    });
    hideBtn.addEventListener("click", (e) => {
        console.log("shows");
        addCont.classList.remove("show");
    });

    addCardBtn.addEventListener("click", (e) => {
        const card = { q: questionEl.value, a: answerEl.value };
        cardData.push(card);
        createCard(card);
        addCont.classList.remove("show");

        refresh();
    });
};

createAllCards();
