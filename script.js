const input = document.getElementById("search-input");
const btn = document.getElementById("search-button");
const pokemonListAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const typesSpan = document.getElementById("types")
const hpSpan = document.getElementById("hp");
const attackSpan = document.getElementById("attack");
const defenseSpan = document.getElementById("defense");
const specialAttackSpan = document.getElementById("special-attack");
const specialDefenseSpan = document.getElementById("special-defense");
const speedSpan = document.getElementById("speed");
const sprite = document.getElementById("sprite");



// fetch data from pokemonListAPI
const fetchData = async () => {
  try {
    const res = await fetch(pokemonListAPI);
    const data = await res.json();
    // send all data to showPokemon function
    showPokemon(data);
  }
  catch (err) {
    console.log(err);
  }
};

// fetch data of specific pokemon
const fetchSpecifics = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showSpecifics(data);
  } catch (err) {
    console.log(err)
  }
}

// destruct data and display on webpage along with sprite and formatted pokemon type(s)
const showSpecifics = data => {
  const {
    height,
    weight,
    stats,
    types,
    sprites,
  } = data;

  displayStats(stats, weight, height);
  formatTypes(types);
  sprite.src = sprites.front_default;
  document.querySelector(".flex-fill").hidden = false;
 
}


const showPokemon = (data) => {
  // does pokemon or pokemon id exist check
  if (!isPokemon(data)) {
    return alert("Pokémon not found");
  } else {
    // find pokemon and display name and id, send other info to fetchSpecifics with url
    data.results.forEach((object) => {
      if (object.name === input.value.toLowerCase() || object.id === Number(input.value.toLowerCase())) {
        pokemonName.innerText = object.name.toUpperCase();
        pokemonId.innerText = "#" + object.id;
        fetchSpecifics(object.url);
      }
    })
  }
}

// formatting types, inserting types into the document
const formatTypes = (types) => {
  for (let type in types) {
    typesSpan.innerHTML +=
      `<span class="type ${types[type].type.name}">${types[type].type.name.toUpperCase()}</span>`
  }
}

// display stats in the correct places inside the document
const displayStats = (stats, weight, height) => {
  weightSpan.innerText = weight;
  heightSpan.innerText = height;
  for (let i = 0; i < stats.length; i++) {
    if (stats[i].stat.name === "hp") {
      hpSpan.innerText = stats[i].base_stat
    } else if (stats[i].stat.name === "attack") {
      attackSpan.innerText = stats[i].base_stat
    } else if (stats[i].stat.name === "defense") {
      defenseSpan.innerText = stats[i].base_stat
    } else if (stats[i].stat.name === "special-attack") {
      specialAttackSpan.innerText = stats[i].base_stat
    } else if (stats[i].stat.name === "special-defense") {
      specialDefenseSpan.innerText = stats[i].base_stat
    } else if (stats[i].stat.name === "speed") {
      speedSpan.innerText = stats[i].base_stat
    }
  }
}

// check if the entered value is indeed a pokemon
const isPokemon = (data) => {
  return data.results.some((obj) => obj.name === input.value.toLowerCase() || obj.id === Number(input.value.toLowerCase()));
};

btn.addEventListener('click', () => {
  typesSpan.innerHTML = "";
  fetchData();
});

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
     btn.click();
  }
});
