function maakVraag() {
  const vraag = document.getElementById("vraag").value;
  const options = document.getElementById("opties").value;
  const opties = options.split(";").map((optie) => optie.trim());
  const juisteOptie = document.getElementById("juiste").value;
  const vraagString = JSON.stringify({
    vraag: vraag,
    opties: opties,
    juiste_optie: juisteOptie,
  });

  fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: vraagString,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function laadVragen() {
  const parent = document.getElementById("vragen");
  fetch("http://localhost:3000")
    .then((res) => res.json())
    .then((data) => {
      data.map((vraag) => {
        const json = JSON.parse(vraag.opties);
        const div = document.createElement("div");

        div.className = "vraag";

        div.onclick = () => {
          window.location.replace(`vraag.html?id=${vraag.id}`);
        };

        div.innerHTML = `
        <h3>${vraag.vraag}</h3>
        <br>
        <div>Score: ${vraag.score}</div> <br>
        <div>Opties:</div>
       
        <b>${json.map((optie) => `${optie}`)}</b>
        
        
        `;
        parent.appendChild(div);
      });
    })
    .catch((err) => console.log(err));
}

function maakOpties() {
  const aantal = document.getElementById("opties").value;
  const opties = aantal.split(";").map((optie) => optie.trim());
  const parent = document.getElementById("juiste");
  parent.innerHTML = "";

  opties.map((optie) => {
    const option = document.createElement("option");
    option.innerText = optie;
    parent.appendChild(option);
  });
}

laadVragen();
