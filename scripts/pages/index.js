 let  recipes = [];
let  filtredRecipes = [];
let listRecipes =[];
//let listRecipes=[];
//declarer les listes des tags
let listTagIng=[];
let listTagApp=[];
let listTagUst= [];
 
HomePage();
async function HomePage(){
      recipes = await fetchData();
    //append la factory function pour afficher les cards: green code
    const sectionContainer = document.getElementById('sectionContainer');
    recipes.forEach(recipeItem => {
      const cardModel = CardTemplate(recipeItem); // Passez les données à la fonction CardTemplate
      const cardDom = cardModel.getCard();
      sectionContainer.appendChild(cardDom);
    });
    updateAllTags(recipes);
    updateRecetteSomme(recipes.length);
    listRecipes = [...recipes]; // Initialize listrecipes with all recipes

  }
 /*function input(){
  let inputValue = searchInput.value;
      if (inputValue.length > 0) {
        deleteSearch.style.display = 'block';
    } 
      if (inputValue.length >= 3) {
        listRecipes = sampleSearch(inputValue);
           displayRecipes(listRecipes,inputValue)
      } else {
          // vider la recherche
          displayRecipes(recipes)
      }
 }*/
function inputsListener(){
  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function (e) {
      e.preventDefault();
      let inputValue = searchInput.value;
      if (inputValue.length > 0) {
        deleteSearch.style.display = 'block';
    } 
      if (inputValue.length >= 3) {
        listRecipes = sampleSearch(inputValue);
           displayRecipes(listRecipes,inputValue)
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
  //console.log('Search string:', searchString);
  // Filtrer les recettes en fonction de la chaîne de recherche
  const filteredRecipes = listRecipes.filter(recipe => {
    // Vérifier si la c haîne de recherche est présente dans le titre, la description ou la liste des ingrédients
    return (
      recipe.name.toLowerCase().includes(searchLowerCase) ||
      recipe.description.toLowerCase().includes(searchLowerCase) ||
      recipe.ingredients.some(
        ingredient =>
          ingredient.ingredient.toLowerCase().includes(searchLowerCase)
      ) )
  });
  return filteredRecipes;
}
function advancedSearch(listTagIng, listTagUst, listTagApp){
 
  const filtredRecipes = listRecipes.filter(recipe => {
    //indique si tous les ingrédients spécifiés dans listTagIng sont présents dans la recette.
    //La fonction every retourne true si tous les éléments de l'array vérifient la condition spécifiée.
    const ingredientsMatch = listTagIng.every(element =>
      recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(element.toLowerCase())
      )
  );
  const ustensilsMatch = listTagUst.every(element =>
      recipe.ustensils.some(ustensil =>
          ustensil.toLowerCase().includes(element.toLowerCase())
      )
  );
  const appareilsMatch = recipe.appliance.toLowerCase().includes(listTagApp);

  return ingredientsMatch && ustensilsMatch && appareilsMatch;
});

  return filtredRecipes;
}

function displayRecipes(filteredRecipes,searchString){
  // Effacer la sectionContainer avant d'ajouter les nouvelles cartes
  const sectionContainer = document.getElementById('sectionContainer');
 // console.log('Search string:', searchString);
 // console.log('Filtered recipes length:', filteredRecipes.length);
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
  generateAndAppendTags(allIngredients, "ingredients", listTagIng);
  generateAndAppendTags(allAppareils, "appareils", listTagApp);
  generateAndAppendTags(allUstensils, "ustensils", listTagUst);
}
// Génération et ajout des tags
function generateAndAppendTags(listTags, elementDom, tagList) {
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
      createTagElement(tagText, tagList); // Supprimez le troisième argument ici
      console.log(listTagIng)
      console.log(listTagUst)
      console.log( listTagApp);
      // Mettre à jour les résultats de recherche
      listRecipes = advancedSearch(listTagIng, listTagUst, listTagApp);
      console.log(listRecipes);
      displayRecipes(listRecipes);
      document.querySelector(`[data-tag="${tagText}"]`).style.display = 'none';
    
    });
    container.appendChild(tagDiv);
  });
}

// Création d'un élément de tag
function createTagElement(tagText, tagList) {
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
    document.querySelector(`[data-tag="${tagText}"]`).style.display = 'block';

    // Suppression du tag de la liste
    const index = tagList.indexOf(tagText);
    if (index !== -1) {
      tagList.splice(index, 1);
    }
console.log(listTagIng);
console.log(listTagApp);
console.log(listTagUst);
listRecipes = recipes;
    // Lancer la recherche simple et avancée
    //lancer une recherche simple 
  // Si la liste des tags est vide, lancer la recherche simple
  if (listTagIng.length === 0 && listTagUst.length === 0 && listTagApp.length === 0) {
    listRecipes = sampleSearch(searchInput.value);
    } else {
    // Sinon, lancer la recherche avancée
    listRecipes = advancedSearch(listTagIng, listTagUst, listTagApp);
  }
    displayRecipes(listRecipes);
    console.log(listRecipes);

  });
  // Ajout du tag à la liste appropriée en fonction du type
  tagList.push(tagText);
  resetInput();
}
//les listeners pour les dropdown search
function setupDropdownListeners() {
  const ingredientsInput = document.querySelector('.myInput-ingredients');
  const appareilsInput = document.querySelector('.myInput-appareils');
  const ustensilsInput = document.querySelector('.myInput-ustensils');

  // Ajoutez des écouteurs d'événements aux champs de recherche des dropdowns
  ingredientsInput.addEventListener('input', function (e) {
    DropdownSearch(e, 'ingredients', listTagIng);
  });

  appareilsInput.addEventListener('input', function (e) {
    DropdownSearch(e, 'appareils', listTagApp);
  });

  ustensilsInput.addEventListener('input', function (e) {
    DropdownSearch(e, 'ustensils', listTagUst);
  });
}
  const delet = document.querySelector('.delete');

//effacer pour les dropdown search
function resetInput() {
  const ingredientsInput = document.querySelector('.myInput-ingredients');
  const appareilsInput = document.querySelector('.myInput-appareils');
  const ustensilsInput = document.querySelector('.myInput-ustensils');
  ingredientsInput.value ="";
  appareilsInput.value ="";
  ustensilsInput.value ="";
  delet.style.display = 'none';
}
// fonction pour gérer la recherche dans les dropdowns
function DropdownSearch(event, category) {
  const inputValue = event.target.value.toLowerCase();
  const dropdownContainer = document.getElementById(category);

  if (inputValue.length > 0) {
    delet.style.display = 'block';
    const filteredItems = Array.from(dropdownContainer.children).filter(item =>
      item.textContent.toLowerCase().includes(inputValue)
    );

    Array.from(dropdownContainer.children).forEach(item =>{
      if(filteredItems.includes(item)) {
        item.style.display = 'block';
       }
      else{
        item.style.display = 'none';
       }   }
    );
  } else {
    delet.style.display = 'none';
  }

  delet.addEventListener('click', function () {
    event.target.value = '';
    delet.style.display = 'none';
    Array.from(dropdownContainer.children).forEach(item =>{
        item.style.display = 'block';
      }
    );
  });
}
//appel de fonction pour configurer les écouteurs d'événements des dropdowns
setupDropdownListeners();
