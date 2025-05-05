//#region Feature Users by Phil --------------------------------------------------------------------
// Création dynamique des éléments Users

let usersTitle = document.createElement("p");
usersTitle.id = "usersTitle";
usersTitle.textContent = "Liste des utilisateurs";
document.body.appendChild(usersTitle);
let usersContainer = document.createElement("div");
usersContainer.id = "usersContainer";
document.body.appendChild(usersContainer);

let paginationContainer = document.createElement("div");
paginationContainer.id = "paginationContainer";
document.body.appendChild(paginationContainer);

let previousUsersButton = document.createElement("button");
previousUsersButton.textContent = "Précédent";
previousUsersButton.id = "previousUsersButton";
paginationContainer.appendChild(previousUsersButton);
let page = document.createElement("div");
page.id = "page";
let pageNumber = 1;
page.textContent = `page: ${pageNumber}`;
paginationContainer.appendChild(page);
let nextUsersButton = document.createElement("button");
nextUsersButton.textContent = "Suivant";
nextUsersButton.id = "nextUsersButton";
paginationContainer.appendChild(nextUsersButton);

let allUsersButton = document.createElement("button");
allUsersButton.textContent = "Afficher tous les utilisateurs";
allUsersButton.id = "allUsersButton";
document.body.appendChild(allUsersButton);

let displayUsersPagination = document.createElement("button");
displayUsersPagination.textContent = "Afficher la pagination";
displayUsersPagination.id = "displayUsersPagination";
document.body.appendChild(displayUsersPagination);

// Fonction pour récupérer les utilisateurs

async function fetchDataUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    usersData = await response.json();
    console.log("Données récupérées :", usersData);
    displayUsers();
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

// Affichages des utilisateurs par 5

let a = 0;
let b = 5;
let usersData = [];

function displayUsers() {
  usersContainer.textContent = "";
  const dataSlice = usersData.slice(a, b);
  dataSlice.forEach((user) => {
    const usersElement = document.createElement("p");
    usersElement.textContent = `Nom :${user.name}, EMail: ${user.email}`;
    usersContainer.appendChild(usersElement);
  });
}

// Affichage de tous les utilisateurs et retrait de la pagination

function displayallUsers() {
  usersContainer.textContent = "";
  const allUsers = usersData;
  usersData.forEach((user) => {
    const usersElement = document.createElement("p");
    usersElement.textContent = `Nom :${user.name}, EMail: ${user.email}`;
    usersContainer.appendChild(usersElement);
  });
}

allUsersButton.addEventListener("click", function () {
  displayallUsers();
  paginationContainer.remove();
  displayUsersPagination.style.display = "block";
  allUsersButton.remove();
});

// fonctions des boutons de pagination

previousUsersButton.addEventListener("click", function () {
  if (a > 0) {
    a -= 5;
    b -= 5;
    pageNumber -= 1;
  }
  if (a < 0) {
    a = 0;
    b = 5;
    pageNumber = 1;
  }
  page.textContent = `page: ${pageNumber}`;

  previousUsersButton.classList.add("grey-button");
  nextUsersButton.classList.remove("grey-button");

  displayUsers();
});

nextUsersButton.addEventListener("click", function () {
  if (b < usersData.length) {
    a += 5;
    b += 5;
    pageNumber += 1;
  }
  if (a >= usersData.length) {
    a = usersData.length - 5;
    b = usersData.length;
    pageNumber -= 1;
  }
  page.textContent = `page: ${pageNumber}`;

  nextUsersButton.classList.add("grey-button");
  previousUsersButton.classList.remove("grey-button");

  displayUsers();
});
fetchDataUsers();

// Affichage de la pagination avec réinitialisation de la page

displayUsersPagination.addEventListener("click", function () {
  window.location.reload();
});

//#endregion-----------------------------------------------------------------------------------------------
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

//div à la volée
let postsListUl = document.createElement("div");
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
    const li = document.createElement("p");
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
