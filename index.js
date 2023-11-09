// Constantes para elementos HTML
const input = document.getElementById('input-poke');
const button = document.getElementById('button');
const cardsContainer = document.getElementById('cards');
const errorDisplay = document.getElementById('small');

// Funciones
const displayError = (message) => {
    errorDisplay.textContent = message;
};

const createPokemonCard = (pokemonData) => {
    const card = document.createElement('div');
    card.classList.add('card-container');

    const name = pokemonData.name;
    const type = pokemonData.types[0].type.name;
    const height = (pokemonData.height / 10).toFixed(1);
    const weight = (pokemonData.weight / 10).toFixed(1);
    const imageUrl = pokemonData.sprites.front_default;

    const pokeName = document.createElement('h3');
    pokeName.textContent = `Nombre: ${name}`;

    const pokeType = document.createElement('p');
    pokeType.textContent = `Tipo: ${type}`;

    const pokeHeight = document.createElement('p');
    pokeHeight.textContent = `Altura: ${height} m`;

    const pokeWeight = document.createElement('p');
    pokeWeight.textContent = `Peso: ${weight} kg`;

    const pokeImg = document.createElement('img');
    pokeImg.src = imageUrl;
    pokeImg.alt = name;

    card.appendChild(pokeName);
    card.appendChild(pokeType);
    card.appendChild(pokeHeight);
    card.appendChild(pokeWeight);
    card.appendChild(pokeImg);

    return card;
};

const renderPokemonCard = (pokemonData) => {
    cardsContainer.innerHTML = '';

    const card = createPokemonCard(pokemonData);
    cardsContainer.appendChild(card);
};

const searchPokemon = async () => {
    const inputValue = input.value;

    if (!inputValue) {
        displayError("Ingrese un número de Pokémon válido");
    } else {
        const pokemonNumber = parseInt(inputValue);

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
            if (!response.ok) {
                throw new Error("No se encontró ningún Pokémon, ingresa (1-1017)");
            }

            const data = await response.json();
            renderPokemonCard(data);
        } catch (error) {
            displayError(error.message);
        }
    }
};

const init = () => {
    button.addEventListener('click', searchPokemon);
};


init();
