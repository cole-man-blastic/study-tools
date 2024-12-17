onload = () => {
  let studyJson;

  const jsonInput = document.getElementById("json-input");
  const jsonSubmit = document.getElementById("json-submit");

  jsonSubmit.onclick = readInput;

  jsonInput.onkeydown = ({key}) => {
    if (key === "Enter") {
      readInput();
    }
  }

  function readInput() {
    try {
      studyJson = JSON.parse(jsonInput.value);
      clear();
      start(studyJson);
    } catch {}
  }

  const apStats = document.getElementById("ap-stats");

  apStats.onclick = async () => {
    clear();
    studyJson = await (await fetch("http://127.0.0.1:8887/ap-stats.json")).json();
    start(studyJson);
  };

  function clear() {
    const main = document.body.querySelector("main");
    while (main.firstChild) {
      main.removeChild(main.lastChild);
    }
  }
}

function start(studySet) {
  const main = document.body.querySelector("main");

  const title = document.createElement("h1");
  title.innerText = studySet.title;
  main.appendChild(title);

  const card = document.createElement("div");
  card.id = "card";
  main.appendChild(card);

  cardNum = 0;
  showQ = true;
  card.innerText = studySet.cards[0].question;

  card.onclick = () => {
    showQ = !showQ;
    card.innerText = showQ ? studySet.cards[cardNum].question : studySet.cards[cardNum].answer;
  }

  onkeyup = ({key}) => {
    if (key === "ArrowLeft") {
      cardNum--;
    }
    if (key === "ArrowRight") {
      cardNum++;
    }
    cardNum = (cardNum + studySet.cards.length) % studySet.cards.length;
    showQ = true;
    card.innerText = studySet.cards[cardNum].question;
  }
}