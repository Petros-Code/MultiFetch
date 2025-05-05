/* // Création dynamique des éléments Users

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
 */
