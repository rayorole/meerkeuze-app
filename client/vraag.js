// load the question from url and display it
function loadQuestion() {
  const id = new URLSearchParams(window.location.search).get("id");
  fetch(`http://localhost:3000/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const vraag = data[0];
      const json = JSON.parse(vraag.opties);
      const div = document.getElementById("vraag");
      div.innerHTML = `
        <h3>${vraag.vraag}</h3>
        <br>
        <div>Opties:</div>
        <select style="width: 200px" id="opties">
            ${json.map((optie) => `<option value="${optie}">${optie}</option>`)}
        </select>
        `;
    });
}

function updateScore() {
  const id = new URLSearchParams(window.location.search).get("id");
  fetch(`http://localhost:3000/${id}`, {
    method: "PUT",
  }).then((res) => {
    if (res.ok) {
      alert("Score updated!");
    } else {
      alert("Something went wrong!");
    }
  });
}

function checkAnswer() {
  const id = new URLSearchParams(window.location.search).get("id");
  fetch(`http://localhost:3000/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const vraag = data[0];
      const juisteOptie = vraag.juiste_optie;
      const gekozenOptie = document.getElementById("opties").value;
      if (gekozenOptie == juisteOptie) {
        alert("Correct!");
        updateScore();
      } else {
        alert("Incorrect!");
      }
    });
}

loadQuestion();
