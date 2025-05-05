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
  goBackBtn.textContent = "Previous";
  goBackBtn.classList.add("buttonsCommentaires");

  const showTons = document.createElement("button");
  showTons.textContent = "Show chunks";
  showTons.classList.add("buttonsCommentaires");

  const goNextBtn = document.createElement("button");
  goNextBtn.textContent = "Next";
  goNextBtn.classList.add("buttonsCommentaires");

  const pageDisplay = document.createElement("span");
  pageDisplay.id = "pageDisplay";
  pageDisplay.textContent = `Page: ${pageNumber + 1}`; // human-readable

  zoneButtons.appendChild(goBackBtn);
  zoneButtons.appendChild(showTons);
  zoneButtons.appendChild(goNextBtn);
  zoneButtons.appendChild(pageDisplay);

  const zoneAffichage = document.createElement("div");
  zoneAffichage.id = "zoneAffichageCommentaires";
  commentaires.appendChild(zoneAffichage);

  // Display 20 comments for pagination
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

  // Display 50 comments for chunk loading
  function displayChunk(chunk) {
    zoneAffichage.innerHTML = "";
    const start = chunk * chunkSize;
    const end = start + chunkSize;
    for (let i = start; i < end && i < data.length; i++) {
      const p = document.createElement("p");
      p.textContent = data[i].body;
      zoneAffichage.appendChild(p);
    }
    pageDisplay.textContent = `Showing chunk ${chunk + 1}`;
  }

  function updatePageDisplay() {
    pageDisplay.textContent = `Page: ${pageNumber + 1}`;
  }

  // Event Listeners
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
    displayChunk(chunkIndex);
    chunkIndex++;
  });

  // Fetch and init
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
