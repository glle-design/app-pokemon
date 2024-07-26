const CARDS = 9;

// Pedir pokemon de forma aleatoria por ID

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(150);
  searchPokemonById(id);
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1;
}
// Buscar a la clase en HTML para dibujar las imágenes
let draggableElements = document.querySelector(".draggable-elements");

// Buscar a la clase en HTML para dibujar los nombres
let droppableElements = document.querySelector(".droppable-elements");

// Crear Arreglo para encontrar al pokemon
let pokemonSearched = [];

// Crear arreglo para los nombres de los pokemones
let pokemonNames = [];

// Petición de Pokemones a la API
async function searchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();
  pokemonSearched.push(data);
  pokemonNames.push(data.name);

  // Desordena el arreglo en forma aleatoria
  pokemonNames = pokemonNames.sort(() => Math.random() - 0.5);

  // Vacia los pokemones de HTML y hace un for con las imágenes para obtener los pokemones
  draggableElements.innerHTML = "";
  pokemonSearched.forEach((pokemon) => {
    console.log(pokemon);
    draggableElements.innerHTML += `
        <div class="pokemon">
          <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="pokemon">
        </div>`;
  });
  // Vacia los nombres del arreglo de los nombres, luego hace for para encontrar los nombres
  droppableElements.innerHTML = "";
  pokemonNames.forEach((name) => {
    droppableElements.innerHTML += `
        <div class="names">
          <p>${name}</p>
        </div>`;
  });

  // Vamos a escuchar a los elementos de la clase image
  let pokemons = document.querySelectorAll(".image");
  pokemons = [...pokemons];

  // Elementos (imágenes) para arrastrar
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });

  let names = document.querySelectorAll(".names");
  let wrongMsg = document.querySelector(".wrong");
  let point = 0;
  names = [...names];
  names.forEach((name) => {
    name.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    name.addEventListener("drop", (event) => {
      const draggableElementData = event.dataTransfer.getData("text");
      let pokemonElement = document.querySelector(`#${draggableElementData}`);
      if (event.target.innerText == draggableElementData) {
        point++;
        event.target.innerHTML = "";
        event.target.appendChild(pokemonElement);
        wrongMsg.innerText = "";

        if (point == CARDS) {
          draggableElements.innerHTML = `<p class="win">FELICITACIONES GANASTE!!!! </p>`;
        }
      } else {
        wrongMsg.innerText = "Ups!!!";
      }
    });
  });
}
