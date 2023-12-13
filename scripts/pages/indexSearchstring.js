let  recipes = [];
HomePage();
async function HomePage(){
      const recipesData = await fetchData();
      //console.log(recipesData);
    //append la factory function pour afficher les cards: green
    const sectionContainer = document.getElementById('sectionContainer');
    recipesData.forEach(mediaItem => {
      const cardModel = CardTemplate(mediaItem); // Passez les données à la fonction CardTemplate
      const cardDom = cardModel.getCard();
      sectionContainer.appendChild(cardDom);
    });
    updateAllTags(recipesData);
    updateRecetteSomme(recipesData.length);
  }
async function loadAllRecipes(){
  recipes = await fetchData();
}
loadAllRecipes();
function inputsListener(){
  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('change', function (e) {
      e.preventDefault();
      let inputValue = searchInput.value;
      if (inputValue.length > 0) {
        deleteSearch.style.display = 'block';
    }
      
      if (inputValue.length >= 3) {
        let result = sampleSearch(inputValue);
           displayRecipes(result)
          
      } else {
          // vider la recherche
          displayRecipes(recipes)
      }
  });
  const deleteSearch = document.getElementById('deleteSearch');
  deleteSearch.addEventListener('click', function () {
    searchInput.value = '';
    deleteSearch.style.display = 'none'; 
    displayRecipes(recipes)
})
}
inputsListener();
function sampleSearch(searchString){
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

function displayRecipes(filteredRecipes){

//console.log(filteredRecipes);
  // Effacer la sectionContainer avant d'ajouter les nouvelles cartes
  const sectionContainer = document.getElementById('sectionContainer');
  sectionContainer.innerHTML = '';
  if (filteredRecipes.length === 0) {
    // Aucune recette trouvée, afficher le message
    const noResultasMessage = document.createElement('div');
    noResultasMessage.classList.add('font-bold', 'text-xl');
    noResultasMessage.innerHTML = `Aucune recette ne contient '${searchString}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    sectionContainer.appendChild(noResultasMessage);
  
} else {
    // Afficher les nouvelles cartes filtrées
    filteredRecipes.forEach(mediaItem => {
        const cardModel = CardTemplate(mediaItem);
        const cardDom = cardModel.getCard();
        sectionContainer.appendChild(cardDom);
    });
}
updateAllTags(filteredRecipes)
updateRecetteSomme(filteredRecipes.length);
}
function updateRecetteSomme(somme) {
  const RecetteSomme = document.getElementById('RecetteCount');
  RecetteSomme.textContent = `${somme} recette${somme !== 1 ? 's' : ''}`;
}
//form et button submit
  function updateAllTags(filteredRecipes) {
    // Récupérer les éléments des tags
    const tags1 = document.getElementById('tags1');
    const tags2 = document.getElementById('tags2');
    const tags3 = document.getElementById('tags3');
  
    // Créer des sets pour les ingrédients, ustensiles et appareils
    let uniqueUstensils = new Set();
    let uniqueAppareils = new Set();
    let uniqueIngredients = new Set();
  
    // Parcourir les recettes filtrées et ajouter les éléments uniques aux sets
    filteredRecipes.forEach(recipe => {
      // Ajouter les ustensiles sans doublons
      recipe.ustensils.forEach(ustensil => {
        uniqueUstensils.add(ustensil);
      });
  
      // Ajouter appliance sans doublons
      uniqueAppareils.add(recipe.appliance);
  
      // Ajouter les ingrédients sans doublons
      recipe.ingredients.forEach(ingredient => {
        const ingredientName = ingredient.ingredient;
        uniqueIngredients.add(ingredientName);
      });
    });
  
    // Convertir les sets en tableaux
    const allUstensils = Array.from(uniqueUstensils);
    const allAppareils = Array.from(uniqueAppareils);
    const allIngredients = Array.from(uniqueIngredients);
  
    // Effacer le contenu des balises <a>
    tags1.textContent = '';
    tags2.textContent = '';
    tags3.textContent = '';
  
    //  la génération des listes de tags: green code
    generateAndAppendTags(allIngredients, tags1);
    generateAndAppendTags(allAppareils, tags2);
    generateAndAppendTags(allUstensils, tags3);
  }
function generateAndAppendTags(listTags, container) {
  listTags.forEach(tag => {
    const tagDiv = document.createElement('div');
    tagDiv.classList.add('block', 'leading-8', 'font-light', 'hover:bg-yellow', 'pl-4', 'py-1', 'clickTag');
    tagDiv.textContent = tag;
    container.appendChild(tagDiv);
  });
  CreateTag();
}
// Créez une liste pour stocker les tags déjà créés
const createdTags = [];

function CreateTag() {
  const clickTags = document.getElementsByClassName('clickTag');

  for (const clickTag of clickTags) {
    clickTag.addEventListener('click', () => {
      const tagText = clickTag.textContent.trim();

      // Vérifiez si le tag n'a pas déjà été créé
      if (!createdTags.includes(tagText)) {
        console.log('Tag cliqué :', tagText);
        createTagElement(tagText);
        // Ajoutez le tag à la liste des tags créés
        createdTags.push(tagText);
      }
    });
  }
}

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
}