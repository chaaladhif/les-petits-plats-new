let recipes = [];

// Chargement initial des recettes
async function loadAllRecipes() {
  recipes = await fetchData();
}
// Fonction de recherche principale
function sampleSearch(searchString) {
  // Convertir la chaîne de recherche en minuscules pour la comparaison insensible à la casse
  const searchLowerCase = searchString.toLowerCase();
  
  // Filtrer les recettes en fonction de la chaîne de recherche
  const filteredRecipes = recipes.filter(recipe => {
    // Vérifier si la chaîne de recherche est présente dans le titre, la description ou la liste des ingrédients
    return (
      recipe.name.toLowerCase().includes(searchLowerCase) ||
      recipe.description.toLowerCase().includes(searchLowerCase) ||
      recipe.ingredients.some(
        ingredient =>
          ingredient.ingredient.toLowerCase().includes(searchLowerCase)
      )
    );
  });

  return filteredRecipes;
}
// Affichage des recettes dans la section principale
function displayRecipes(recipesToDisplay) {
  const sectionContainer = document.getElementById('sectionContainer');
  sectionContainer.innerHTML = '';

  if (recipesToDisplay.length === 0) {
    // Aucune recette trouvée, afficher le message
    const noResultsMessage = document.createElement('div');
    noResultsMessage.classList.add('font-bold', 'text-xl');
    noResultsMessage.innerHTML = `Aucune recette ne correspond à votre recherche.`;
    sectionContainer.appendChild(noResultsMessage);
  } else {
    // Afficher les nouvelles cartes filtrées
    recipesToDisplay.forEach(mediaItem => {
      const cardModel = CardTemplate(mediaItem);
      const cardDom = cardModel.getCard();
      sectionContainer.appendChild(cardDom);
    });
  }

  updateAllTags(recipesToDisplay);
  updateRecetteSomme(recipesToDisplay.length);
}

// Mise à jour des tags (ingrédients, ustensiles, appareils)
function updateAllTags(filteredRecipes) {
  const tags1 = document.getElementById('tags1');
  const tags2 = document.getElementById('tags2');
  const tags3 = document.getElementById('tags3');

  const uniqueUstensils = new Set();
  const uniqueAppareils = new Set();
  const uniqueIngredients = new Set();

  filteredRecipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => uniqueUstensils.add(ustensil));
    uniqueAppareils.add(recipe.appliance);
    recipe.ingredients.forEach(ingredient => uniqueIngredients.add(ingredient.ingredient));
  });

  const allUstensils = Array.from(uniqueUstensils);
  const allAppareils = Array.from(uniqueAppareils);
  const allIngredients = Array.from(uniqueIngredients);

  tags1.textContent = '';
  tags2.textContent = '';
  tags3.textContent = '';

  generateAndAppendTags(allIngredients, tags1);
  generateAndAppendTags(allAppareils, tags2);
  generateAndAppendTags(allUstensils, tags3);
}

// Génération et ajout des tags
function generateAndAppendTags(listTags, container) {
  listTags.forEach(tag => {
    const tagDiv = document.createElement('div');
    tagDiv.classList.add('block', 'leading-8', 'font-light', 'hover:bg-yellow', 'pl-4', 'py-1', 'clickTag');
    tagDiv.textContent = tag;
    container.appendChild(tagDiv);
  });

  createTagEventListeners();
}

// Créez une liste pour stocker les tags déjà créés
const createdTags = [];

// Ajout des écouteurs d'événements aux tags existants
function createTagEventListeners() {
  const clickTags = document.getElementsByClassName('clickTag');

  for (const clickTag of clickTags) {
    clickTag.addEventListener('click', () => {
      const tagText = clickTag.textContent.trim();

      if (!createdTags.includes(tagText)) {
        createTagElement(tagText);
        createdTags.push(tagText);
      }
    });
  }
}

// Création d'un élément de tag
function createTagElement(tagText) {
  const tagSection = document.querySelector('.tag');
  const tagElement = document.createElement('div');
  tagElement.classList.add('text-sm', 'font-normal', 'bg-yellow', 'mb-2', 'py-4', 'px-4', 'rounded-xl', 'flex', 'items-center', 'justify-between', 'gap-4');

  const p = document.createElement('p');
  p.classList.add('pr-14');
  p.textContent = tagText;

  const button = document.createElement('button');
  button.classList.add('font-bold');
  button.innerHTML = '<i class="fa-solid fa-x" aria-hidden="true"></i>';

  tagElement.appendChild(p);
  tagElement.appendChild(button);
  tagSection.appendChild(tagElement);

  button.addEventListener('click', () => {
    tagElement.style.display = 'none';
  });
}

// Mise à jour du compteur de recettes
function updateRecetteSomme(somme) {
  const RecetteSomme = document.getElementById('RecetteCount');
  RecetteSomme.textContent = `${somme} recette${somme !== 1 ? 's' : ''}`;
}

// Fonction de recherche principale
function performSearch(inputValue) {
  if (inputValue.length >= 3) {
    const result = sampleSearch(inputValue);
    displayRecipes(result);
  } else {
    displayRecipes(recipes);
  }
}

// Initialisation de la page
function initializePage() {
  loadAllRecipes();
  inputsListener();
}

// Ajout des écouteurs d'événements sur les champs de recherche
function inputsListener() {
  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('change', function (e) {
    e.preventDefault();
    let inputValue = searchInput.value;
    if (inputValue.length > 0) {
      deleteSearch.style.display = 'block';
    }

    performSearch(inputValue);
  });

  const deleteSearch = document.getElementById('deleteSearch');
  deleteSearch.addEventListener('click', function () {
    searchInput.value = '';
    deleteSearch.style.display = 'none';
    displayRecipes(recipes);
  });
}

// Exécution de l'initialisation de la page
initializePage();