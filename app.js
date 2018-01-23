//grab data from form input
//store name and append to page HTML

//POST to server

//Render from server data (if it exists)

//Player Card details
//name
//order in queue
//remove button ... onClick, remove from page;
const getUrl = "https://missile-alert-server.herokuapp.com/players";
const postUrl = "https://missile-alert-server.herokuapp.com/players";
const removeUrl = "https://missile-alert-server.herokuapp.com/remove/";
console.log("WHAT IS HAPPENING");
getFromServer();

let playersContainer = document.querySelector(".player-list");

document.querySelector(".add").addEventListener("click", function(event) {
  console.log("IN THE EVENT");
  event.preventDefault();
  postToServer();
});

function getNameFromForm() {
  console.log("NAME FROM FORM");
  const data = new FormData(document.querySelector("form"));
  let name = data.get("player");
  console.log(name);
  return {
    player: name
  };
}

function injectable(name) {
  var player = `<div class="player-list">
    <h1 class="name">${name}</h1>
    <button type="button" class="remove btn btn-outline-danger">DELETE</button>
  </div>`;
  playersContainer.innerHTML += player;
  console.log("INJECTED?: " + name);
  // document.querySelector(".remove").addEventListener("click", () => {
  //   fetch(removeUrl, {
  //     method: "POST",
  //     headers: new Headers({
  //       "Content-Type": "application/json"
  //     }),
  //     body: JSON.stringify({ player: name })
  //   })
  //     .then(response => response.json())
  //     .then(response => response.message);
  // });
}

function postToServer() {
  console.log("POSTING");
  fetch(postUrl, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(getNameFromForm())
  })
    .then(res => res.json())
    .then(res => res.message)
    .catch(console.error);
  getFromServer();
}

function getFromServer() {
  console.log("GETTING");
  return fetch(getUrl)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      playersContainer.innerHTML = "";
      res.map(item => {
        console.log("AHHH" + item);
        injectable(item.player);
      });
    });
}
