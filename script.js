const LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=24";

const cardsGrid = document.getElementById("cardsGrid");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const errorMessage = document.getElementById("errorMessage");
const totalCount = document.getElementById("totalCount");
const typeCount = document.getElementById("typeCount");
const apiStatus = document.getElementById("apiStatus");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const typeColors = {
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  dragon: "bg-indigo-600",
  dark: "bg-slate-700",
  fairy: "bg-pink-300",
  normal: "bg-slate-400",
  fighting: "bg-red-700",
  flying: "bg-sky-400",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  rock: "bg-yellow-800",
  bug: "bg-lime-500",
  ghost: "bg-violet-700",
  steel: "bg-slate-500"
};

function showLoading(show) {
  loading.classList.toggle("hidden", !show);
}

function showError(message) {
  errorBox.classList.remove("hidden");
  errorMessage.textContent = message;
}

function hideError() {
  errorBox.classList.add("hidden");
}

function setApiStatus(status) {
  apiStatus.textContent = status;
  apiStatus.classList.remove("text-amber-500", "text-emerald-500", "text-red-500");
  if (status === "Online") apiStatus.classList.add("text-emerald-500");
  else if (status === "Offline") apiStatus.classList.add("text-red-500");
  else apiStatus.classList.add("text-amber-500");
}

function renderCards(pokemons) {
  cardsGrid.innerHTML = "";
  pokemons.forEach(pokemon => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col";

    const types = pokemon.types.map(t => t.type.name);
    const badges = types.map(type => {
      const color = typeColors[type] || "bg-slate-400";
      return `<span class="${color} text-white text-xs font-semibold px-3 py-1 rounded-full">${type}</span>`;
    }).join("");

    card.innerHTML = `
      <div class="bg-slate-100 flex items-center justify-center p-4">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="w-28 h-28">
      </div>
      <div class="p-5 flex flex-col gap-3 flex-1">
        <h2 class="text-lg font-bold text-slate-900 capitalize">#${pokemon.id} ${pokemon.name}</h2>
        <div class="flex flex-wrap gap-2">${badges}</div>
        <div class="flex justify-between text-sm text-slate-600">
          <span>Altura: ${pokemon.height / 10} m</span>
          <span>Peso: ${pokemon.weight / 10} kg</span>
        </div>
      </div>
    `;
    cardsGrid.appendChild(card);
  });
}

function updateStats(pokemons) {
  totalCount.textContent = pokemons.length;
  const types = new Set();
  pokemons.forEach(p => p.types.forEach(t => types.add(t.type.name)));
  typeCount.textContent = types.size;
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }
  return response.json();
}

async function loadPokemons() {
  showLoading(true);
  hideError();
  try {
    const listResponse = await fetch(LIST_URL);
    if (!listResponse.ok) {
      throw new Error(`Erro HTTP: ${listResponse.status}`);
    }
    const listData = await listResponse.json();
    const details = await Promise.all(
      listData.results.map(item => fetchPokemonDetails(item.url))
    );
    setApiStatus("Online");
    updateStats(details);
    renderCards(details);
  } catch (error) {
    setApiStatus("Offline");
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

async function searchPokemon() {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) return;
  showLoading(true);
  hideError();
  try {
    const pokemon = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${term}`);
    setApiStatus("Online");
    updateStats([pokemon]);
    renderCards([pokemon]);
  } catch (error) {
    setApiStatus("Offline");
    showError("Pokémon não encontrado. Verifique o nome digitado.");
  } finally {
    showLoading(false);
  }
}

searchBtn.addEventListener("click", searchPokemon);
searchInput.addEventListener("keyup", event => {
  if (event.key === "Enter") searchPokemon();
});
resetBtn.addEventListener("click", loadPokemons);

loadPokemons();
