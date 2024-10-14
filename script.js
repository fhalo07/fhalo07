const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonInfo = document.getElementById('pokemonInfo');
const tips = document.getElementById('tips');

// Tips for beating Pokémon FireRed
const battleTips = [
    "Use type advantages against gym leaders.",
    "Catch a variety of Pokémon to cover different types.",
    "Use items like potions and revives strategically.",
    "Level up your Pokémon before challenging tough opponents.",
    "Don't forget to save your game frequently!",
];

// Fetch Pokémon data from PokeAPI
async function fetchPokemon(pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();

        // Fetch species data for generation information
        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) throw new Error("Species data not found");

        const speciesData = await speciesResponse.json();

        // Extract generation number from species data
        const generation = getGenerationNumber(speciesData.generation.name);

        displayPokemon(data, generation);
    } catch (error) {
        pokemonInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Function to convert generation name to a number
function getGenerationNumber(generationName) {
    const generationMap = {
        'generation-i': 1,
        'generation-ii': 2,
        'generation-iii': 3,
        'generation-iv': 4,
        'generation-v': 5,
        'generation-vi': 6,
        'generation-vii': 7,
        'generation-viii': 8,
        'generation-ix': 9
    };
    return generationMap[generationName] || "Unknown";
}

// Display Pokémon information
function displayPokemon(data, generation) {
    pokemonInfo.innerHTML = `
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <p><strong>Height:</strong> ${data.height / 10} m</p>
        <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
        <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Generation:</strong> ${generation}</p>
    `;
    tips.innerHTML = `<h3>Tips:</h3><p>${battleTips.join('</p><p>')}</p>`;
}

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
    const pokemonNameOrId = pokemonInput.value;
    if (pokemonNameOrId) {
        fetchPokemon(pokemonNameOrId);
    } else {
        pokemonInfo.innerHTML = '<p style="color: red;">Please enter a Pokémon name or ID.</p>';
    }
});

