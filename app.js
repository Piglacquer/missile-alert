//grab data from form input
//store name and append to page HTML

//POST to server

//Render from server data (if it exists)

//Player Card details
//name
//order in queue
//remove button ... onClick, remove from page;
const getUrl = 'https://missile-alert-server.herokuapp.com/'
const postUrl = 'https://missile-alert-server.herokuapp.com/players'

getFromServer()

let playersContainer = document.querySelector('.player-list')

document.querySelector('.add').addEventListener('click', function(event) {
	event.preventDefault()
	postToServer()
})

function getNameFromForm() {
	const data = new FormData(document.querySelector('form'))
	let name = data.get('playerName')
	return {
		player: name
	}
}

function injectable(name) {
	var player = `<div class="">
    <h1 class="name">${name}</h1>
    <button type="button" class="remove btn btn-outline-danger">DELETE</button>
  </div>`
	playersContainer.appendChild(player)
}

function postToServer() {
	return fetch(postUrl, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(getNameFromForm())
	})
		.then(res => res.json())
		.then(res => res.message)
		.catch(console.error)
}

function getFromServer() {
	return fetch(getUrl)
		.then(res => res.json())
		.then(res => injectable(res.player))
}
