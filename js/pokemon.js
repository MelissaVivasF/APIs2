const API_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

function getPokemon(api) {
  fetch(api)
    .then((response) => response.json())
    .then((json) => {
      fillPokemonData(json.results);
      handlePagination(json.previous, json.next);
    })
    .catch((error) => {
      console.error("Error al consumir la API de Pokémon:", error);
    });
}

function fillPokemonData(results) {
  let cards = "";
  const promises = results.map((pokemon) =>
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((details) => {
        cards += `
          <div class="col">
            <div class="card h-100" style="width: 12rem;">
              <img src="${details.sprites.front_default}" class="card-img-top" alt="${details.name}">
              <div class="card-body">
                <h2 class="card-title text-center">${details.name}</h2>
                <h5 class="card-title">Status: ${
                  details.stats[0].base_stat > 50 ? "Healthy" : "Weak"
                }</h5>
                <h5 class="card-title">Species: ${details.species.name}</h5>
              </div>
            </div>
          </div>
        `;
        document.getElementById("dataPokemon").innerHTML = cards;
      })
      .catch((error) => {
        console.error("Error obteniendo detalles del Pokémon:", error);
      })
  );

  Promise.all(promises).then(() => {
    document.getElementById("dataPokemon").innerHTML = cards;
  });
}

function handlePagination(prev, next) {
  const prevDisabled = prev ? "" : "disabled";
  const nextDisabled = next ? "" : "disabled";

  const paginationHTML = `
    <li class="page-item ${prevDisabled}">
      <a class="page-link" onclick="getPokemon('${prev}')">Prev</a>
    </li>
    <li class="page-item ${nextDisabled}">
      <a class="page-link" onclick="getPokemon('${next}')">Next</a>
    </li>
  `;

  document.getElementById("pagination-top").innerHTML = paginationHTML;
  document.getElementById("pagination-bottom").innerHTML = paginationHTML;
}


getPokemon(API_POKEMON);