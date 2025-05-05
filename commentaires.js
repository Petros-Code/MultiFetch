function setupCommentaires() {
  let pageNumber = 0;
  let chunkIndex = 0;
  const showAmount = 20;
  const chunkSize = 50;
  let data = [];

  // Create and insert elements
  const body = document.body;
  const commentaires = document.createElement("div");
  commentaires.id = "commentaires";
  body.appendChild(commentaires);

  const title = document.createElement("h3");
  title.id = "titreCommentaire";
  title.textContent = "Commentaires";
  commentaires.appendChild(title);

  const zoneButtons = document.createElement("div");
  zoneButtons.id = "zoneBtnCommentaires";
  commentaires.appendChild(zoneButtons);

  const goBackBtn = document.createElement("button");
  goBackBtn.textContent = "Précèdant";
  goBackBtn.classList.add("buttonsCommentaires");

  const showTons = document.createElement("button");
  showTons.textContent = "Afficher un morceau";
  showTons.classList.add("buttonsCommentaires");

  const goNextBtn = document.createElement("button");
  goNextBtn.textContent = "Suivant";
  goNextBtn.classList.add("buttonsCommentaires");

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.classList.add("buttonsCommentaires");

  const pageDisplay = document.createElement("span");
  pageDisplay.id = "pageDisplay";
  pageDisplay.textContent = `Page: ${pageNumber + 1}`;

  zoneButtons.appendChild(goBackBtn);
  zoneButtons.appendChild(showTons);
  zoneButtons.appendChild(goNextBtn);
  zoneButtons.appendChild(resetBtn);
  zoneButtons.appendChild(pageDisplay);

  const zoneAffichage = document.createElement("div");
  zoneAffichage.id = "zoneAffichageCommentaires";
  commentaires.appendChild(zoneAffichage);

  function displayPage(page) {
    zoneAffichage.innerHTML = "";
    const start = page * showAmount;
    const end = start + showAmount;
    for (let i = start; i < end && i < data.length; i++) {
      const p = document.createElement("p");
      p.textContent = data[i].body;
      zoneAffichage.appendChild(p);
    }
    updatePageDisplay();
  }

  function displayChunk(chunk) {
    const start = chunk * chunkSize;
    const end = start + chunkSize;

    if (start >= data.length) return;

    for (let i = start; i < end && i < data.length; i++) {
      const p = document.createElement("p");
      p.textContent = data[i].body;
      zoneAffichage.appendChild(p);
    }
    pageDisplay.textContent = `Nombre de Morceau (x50): ${chunk + 1}`;
  }

  function updatePageDisplay() {
    pageDisplay.textContent = `Page: ${pageNumber + 1}`;
  }

  goNextBtn.addEventListener("click", () => {
    if ((pageNumber + 1) * showAmount < data.length) {
      pageNumber++;
      displayPage(pageNumber);
    }
  });

  goBackBtn.addEventListener("click", () => {
    if (pageNumber > 0) {
      pageNumber--;
      displayPage(pageNumber);
    }
  });

  showTons.addEventListener("click", () => {
    if (chunkIndex * chunkSize < data.length) {
      displayChunk(chunkIndex);
      chunkIndex++;
    }
  });

  resetBtn.addEventListener("click", () => {
    zoneAffichage.innerHTML = "";
    pageNumber = 0;
    chunkIndex = 0;
    displayPage(pageNumber);
  });

  async function fetchCommentaires(callback) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      if (response.ok) {
        console.log("Status:", response.status);
        data = await response.json();
        callback();
      } else if (response.status === 404) {
        console.error(
          `Erreur ${response.status}: URL donnée n'est pas trouvé, soit une faute de frappe.`
        );
      } else {
        console.error(
          `Une érreur est arrivé, mais qui n'as pas était Catché: Erreur ${response.status}`
        );
      }
    } catch (error) {
      console.log("Une érreur inattendu est arrivé:", error);
    }
  }

  fetchCommentaires(() => displayPage(pageNumber));
}

setupCommentaires();
