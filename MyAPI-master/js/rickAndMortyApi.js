const API_RICK_MORTY = "https://rickandmortyapi.com/api/character";


function getRickMorty(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results);
            pagination(json.info);
        })
        .catch((error) => {
            console.error("Error al consumir la API:", error);
        });
}

function fillData(results) {
    let cards = "";
    results.forEach((character) => {
        cards += `
            <div class="col">
                <div class="card h-100" style="width: 12rem;">
                    <img src="${character.image}" class="card-img-top" alt="img-personaje">
                    <div class="card-body">
                        <h2 class="card-title">${character.name}</h2>
                        <h5 class="card-title">Status: ${character.status}</h5>
                        <h5 class="card-title">Species: ${character.species}</h5>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("dataAlbum").innerHTML = cards;
}

function pagination(info) {
    let prevDisabled = "";
    let nextDisabled = "";

    if (!info.prev) {
        prevDisabled = "disabled";
    }
    if (!info.next) {
        nextDisabled = "disabled";
    }

    const html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getRickMorty('${info.prev}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getRickMorty('${info.next}')">Next</a>
        </li>
    `;

    
    document.getElementById("pagination-top").innerHTML = html;
    document.getElementById("pagination-bottom").innerHTML = html;
}


getRickMorty(API_RICK_MORTY);
