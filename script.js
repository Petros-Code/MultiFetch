//#region Feature Posts by Petros-Code --------------------------------------------------------------------
const loadButton = document.getElementById("load-posts");
const postsList = document.getElementById("posts-list");
const nextPage = document.getElementById("next-posts");
const previousPage = document.getElementById("previous-posts");

// Je veux stocker tous les posts ET avoir un index de départ pour l'affichage
let allPosts = [];
let currentIndex = 0;

async function fetchAllPosts() {
  try {
    const responseFetchAllPosts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!responseFetchAllPosts.ok) {
      throw new Error("erreur réseau");
    }
    console.log(responseFetchAllPosts); // Pour info
    allPosts = await responseFetchAllPosts.json();
    currentIndex = 0; // Réinitialiser l'index
    displayPosts(); // Afficher les premiers posts
  } catch (error) {
    console.error("erreur serveur", error);
  }
}

function displayPosts() {
  postsList.replaceChildren(); //(on vide)
  const postsToDisplay = allPosts.slice(currentIndex, currentIndex + 5); //on récupère les 5 posts
  postsToDisplay.forEach((post) => {
    const li = document.createElement("li");
    li.textContent = `${post.title} - ${post.body}`;
    postsList.appendChild(li);
  });
}

nextPage.addEventListener("click", () => {
  if (currentIndex + 5 < allPosts.length) {
    currentIndex += 5;
    displayPosts();
  } else {
    console.log("rien à afficher");
  }
});

previousPage.addEventListener("click", () => {
  if (currentIndex + 5 < allPosts.length) {
    currentIndex -= 5;
    displayPosts();
  } else {
    console.log("rien à afficher");
  }
});

loadButton.addEventListener("click", fetchAllPosts);

//#endregion-----------------------------------------------------------------------------------------------
