let  recipes = [];
HomePage();
async function HomePage(){
      const recipesData = await fetchData();
    //append la factory function pour afficher les cards: green code
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
           displayRecipes(result,inputValue)
      } else {
          // vider la recherche
          displayRecipes(recipes)
      }
  });
  const deleteSearch = document.getElementById('deleteSearch');
  deleteSearch.addEventListener('click', function () {
    searchInput.value = '';
    deleteSearch.style.display = 'none'; 
    displayRecipes(recipes);
})

}
inputsListener();
function sampleSearch(searchString){
  // Convertir la chaîne de recherche en minuscules pour la comparaison insensible à la casse
  const searchLowerCase = searchString.toLowerCase();
  console.log('Search string:', searchString);
  // Filtrer les recettes en fonction de la chaîne de recherche
  const filteredRecipes = recipes.filter(recipe => {
    // Vérifier si la chaîne de recherche est présente dans le titre, la description ou la liste des ingrédients
    return (
      recipe.name.toLowerCase().includes(searchLowerCase) ||
      recipe.description.toLowerCase().includes(searchLowerCase) ||
      recipe.appliance.toLowerCase().includes(searchLowerCase) ||
      recipe.ingredients.some(
        ingredient =>
          ingredient.ingredient.toLowerCase().includes(searchLowerCase)
      ) ||
      recipe.ustensils.some(
        ustensil => ustensil.toLowerCase().includes(searchLowerCase)
      ))
  });
  //console.log('Filtered recipes:', filteredRecipes);
  return filteredRecipes;
}
function displayRecipes(filteredRecipes,searchString){
  // Effacer la sectionContainer avant d'ajouter les nouvelles cartes
  const sectionContainer = document.getElementById('sectionContainer');
  console.log('Search string:', searchString);
  console.log('Filtered recipes length:', filteredRecipes.length);
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
return filteredRecipes; // Ajoutez cette ligne pour retourner les recettes filtrées
}
function updateRecetteSomme(somme) {
  const RecetteSomme = document.getElementById('RecetteCount');
  RecetteSomme.textContent = `${somme} recette${somme !== 1 ? 's' : ''}`;
}
//form et button submit
function updateAllTags(filteredRecipes) {
  // Créer des sets pour les ingrédients, ustensiles et appareils
  let allUstensils = new Set();
  let allAppareils = new Set();
  let allIngredients = new Set();

  // Parcourir les recettes filtrées et ajouter les éléments uniques aux sets
  filteredRecipes.forEach(recipe => {
    // Ajouter les ustensiles sans doublons
    recipe.ustensils.forEach(ustensil => {
      allUstensils.add(ustensil.toLowerCase()); // Convertir en minuscules avant d'ajouter
    });

    // Ajouter appliance sans doublons
    allAppareils.add(recipe.appliance.toLowerCase()); // Convertir en minuscules avant d'ajouter

    // Ajouter les ingrédients sans doublons
    recipe.ingredients.forEach(ingredient => {
      const ingredientName = ingredient.ingredient.toLowerCase(); // Convertir en minuscules avant d'ajouter
      allIngredients.add(ingredientName);
    });
  });

  //  la génération des listes de tags: green code
  generateAndAppendTags(allIngredients, "ingredients");
  generateAndAppendTags(allAppareils, "appareils");
  generateAndAppendTags(allUstensils, "ustensils");
}
// Génération et ajout des tags
function generateAndAppendTags(listTags, elementDom) {
    // Récupérer les éléments des tags
    const container = document.getElementById(elementDom); 
    container.textContent = '';
    listTags.forEach(tag => {
    const tagDiv = document.createElement('div');
    tagDiv.setAttribute("data-tag", tag);
    tagDiv.classList.add('block', 'leading-8', 'font-light', 'hover:bg-yellow', 'pl-4', 'py-1');
    tagDiv.textContent = tag;
    tagDiv.addEventListener('click', () => {
      const tagText = tag.trim();

      // Ajouter le tag sous la recherche principale
      createTagElement(tagText);
       // Mettre à jour les résultats de recherche
      const result = sampleSearch(tagText);
      //**************** quand je commente dislayRecipes l'erreur disparait******************************
      displayRecipes(result);
      //document.querySelector(`[data-tag="${tagText}"]`).style.display='none';
    });
    container.appendChild(tagDiv);
  });

}
// Création d'un élément de tag
function createTagElement(tagText) {
  console.log('Creating tag for:', tagText);

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
    tagElement.remove(); // Supprime le tag
    //tagElement.style.display = 'none';
    //document.querySelector(`[data-tag="${tagText}"]`).style.display='block';
    //displayRecipes(recipes);
    const result = sampleSearch(''); // Utilisez une chaîne vide comme argument
    displayRecipes(result);

  });
   // Ajout d'un gestionnaire d'événements pour cacher le tag dans les dropdowns
   const dropdownTags = document.querySelectorAll(`[data-tag="${tagText}"]`);
   dropdownTags.forEach(dropdownTag => {
     dropdownTag.style.display = 'none';
   });

}
//les listeners pour les dropdown search
function setupDropdownListeners() {
  const ingredientsInput = document.querySelector('.myInput-ingredients');
  const appareilsInput = document.querySelector('.myInput-appareils');
  const ustensilsInput = document.querySelector('.myInput-ustensils');

  // Ajoutez des écouteurs d'événements aux champs de recherche des dropdowns
  ingredientsInput.addEventListener('change', function (e) {
    DropdownSearch(e, 'ingredients');
  });

  appareilsInput.addEventListener('change', function (e) {
    DropdownSearch(e, 'appareils');
  });

  ustensilsInput.addEventListener('change', function (e) {
    DropdownSearch(e, 'ustensils');
  });
}

// fonction pour gérer la recherche dans les dropdowns
function DropdownSearch(event, category) {
  const inputValue = event.target.value.toLowerCase();
  const dropdownContainer = document.getElementById(category);
 const delet=document.querySelector('.delete');
  if (inputValue.length > 0) {
    // Filtrez les éléments du dropdown en fonction de la recherche
    delet.style.display = 'block';
    const result = sampleSearch(inputValue);
    displayRecipes(result);
    const filteredItems = Array.from(dropdownContainer.children).filter(item =>
      item.textContent.toLowerCase().includes(inputValue)
    );
    console.log(filteredItems);
    // Affichez les éléments filtrés et masquez les autres
    dropdownContainer.innerHTML = '';
    filteredItems.forEach(item => dropdownContainer.appendChild(item));
  } else {
    // Si la longueur de la recherche est inférieure à 0, réinitialiser le dropdown
    //updateAllTags(filteredRecipes);
    delet.style.display = 'none';
  }
  delet.addEventListener('click', function () {
    event.target.value = '';
    delet.style.display = 'none';

})
}
//appel de fonction pour configurer les écouteurs d'événements des dropdowns
setupDropdownListeners();

