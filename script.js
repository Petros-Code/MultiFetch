//#region Feature Posts by Petros-Code --------------------------------------------------------------------
async function fetchAllPosts() {
  try {
    const responseFetchAllPosts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!responseFetchAllPosts.ok) {
      throw new Error("erreur réseau");
    }
    console.log(responseFetchAllPosts); // Pour info
    const dataAllPosts = await responseFetchAllPosts.json();
    console.log(dataAllPosts);
  } catch (error) {
    console.error("erreur serveur", error);
  }
}

fetchAllPosts();

/* const dataPosts = (await responseFetchAllPosts.json()).dataPosts;
    const first5Posts = dataPosts.slice(0, 9);
    first5Posts.map((posts) => console.log(posts.title ?)) */

//#endregion-----------------------------------------------------------------------------------------------
