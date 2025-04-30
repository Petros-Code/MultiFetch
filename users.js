let containerUsers = document.createElement("div");

imageUsers.style.display = "block";
async function fetchDataUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Erreur réseau");
    }
    const dataUsers = await response.json();
    console.log(dataUsers);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
fetchDataUsers();
