//#region Feature Posts by Petros-Code --------------------------------------------------------------------
const loadButton = document.getElementById("load-posts");
const postsList = document.getElementById("posts-list");
const nextPage = document.getElementById("next-posts");
const previousPage = document.getElementById("previous-posts");

let paginationPostsContainer = document.createElement("div");
paginationPostsContainer.id = "paginationPostsContainer";
document.body.appendChild(paginationPostsContainer);

//load à la volée
let loadPostsButton = document.createElement("button");
loadPostsButton.textContent = "Charger les Posts";
loadPostsButton.id = "load-posts";
paginationPostsContainer.appendChild(loadPostsButton);

//previous à la volée
let previousPostsButton = document.createElement("button");
previousPostsButton.textContent = "Posts précédents";
previousPostsButton.id = "previousPostsButton";
paginationPostsContainer.appendChild(previousPostsButton);

//next à la volée
let nextPostsButton = document.createElement("button");
nextPostsButton.textContent = "Posts suivants";
nextPostsButton.id = "nextPostsButton";
paginationPostsContainer.appendChild(nextPostsButton);

//ul à la volée
let postsListUl = document.createElement("ul");
postsListUl.textContent = "Les Posts s'afficheront ici";
postsListUl.id = "posts-list";
paginationPostsContainer.appendChild(postsListUl);

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
  postsListUl.replaceChildren(); //(on vide)
  const postsToDisplay = allPosts.slice(currentIndex, currentIndex + 5); //on récupère les 5 posts
  postsToDisplay.forEach((post) => {
    const li = document.createElement("li");
    li.textContent = `${post.title} - ${post.body}`;
    postsListUl.appendChild(li);
  });
}

nextPostsButton.addEventListener("click", () => {
  if (currentIndex + 5 < allPosts.length) {
    currentIndex += 5;
    displayPosts();
  } else {
    console.log("rien à afficher");
  }
});

previousPostsButton.addEventListener("click", () => {
  if (currentIndex + 5 < allPosts.length) {
    currentIndex -= 5;
    displayPosts();
  } else {
    console.log("rien à afficher");
  }
});

loadPostsButton.addEventListener("click", fetchAllPosts);

//#endregion-----------------------------------------------------------------------------------------------
