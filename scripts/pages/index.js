let  recipes = [];
HomePage();
async function HomePage(){
      const recipesData = await fetchData();
      //console.log(recipesData);
    //append la factory function pour afficher les cards
    const sectionContainer = document.getElementById('sectionContainer');
    recipesData.forEach(mediaItem => {
      const cardModel = CardTemplate(mediaItem); // Passez les données à la fonction CardTemplate
      const cardDom = cardModel.getCard();
      sectionContainer.appendChild(cardDom);
    });
    updateAllTags(recipesData)
  }
async function loadAllRecipes(){
  recipes = await fetchData();
}
loadAllRecipes();
function inputsListener(){
  let searchInput = document.getElementById('searchInput');
  const deleteSearch = document.getElementById('deleteSearch');
  searchInput.addEventListener('input', function (e) {
      e.preventDefault();
      let inputValue = searchInput.value;
      if (inputValue.length >= 3) {
          sampleSearch(inputValue);
          deleteSearch.style.display = 'block';
      } else {
          // vider la recherche
          deleteSearch.addEventListener('click', function () {
            searchInput.value = '';
            deleteSearch.style.display = 'none';
          sampleSearch('')})
          
      }
  });
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
    updateAllTags(filteredRecipes)
}
return filteredRecipes;

}
function updateAllTags(filteredRecipes) {
  // Créer des tableaux pour les ingrédients, ustensiles et appareils uniques
  let allUstensils = [];
  let allAppareils = [];
  let allIngredients = [];

  // Parcourir les recettes filtrées et ajouter les éléments uniques aux tableaux
  filteredRecipes.forEach(recipe => {
    // Ajouter les ustensiles sans doublons
    recipe.ustensils.forEach(ustensil => {
      if (!allUstensils.includes(ustensil)) {
        allUstensils.push(ustensil);
      }
    });

    // Ajouter sans doublons
    if (!allAppareils.includes(recipe.appliance)) {
      allAppareils.push(recipe.appliance);
    }

    // Ajouter les ingrédients sans doublons
    recipe.ingredients.forEach(ingredient => {
      const ingredientName = ingredient.ingredient;
      if (!allIngredients.includes(ingredientName)) {
        allIngredients.push(ingredientName);
      }
    });
  });
 //console.log(allAppareils);
 // console.log(allUstensils);
 // console.log(allIngredients);

const tags1=document.getElementById('tags1');
const tags2=document.getElementById('tags2');
const tags3=document.getElementById('tags3');
  // Effacer le contenu des balises <a>
  tags1.textContent = '';
  tags2.textContent = '';
  tags3.textContent = '';
// Ajouter les liens pour chaque ustensile
allIngredients.forEach(ingredient => {
  let tagLink1=document.createElement('a')
  tagLink1.classList.add('block', 'leading-8', 'font-light', 'hover:bg-yellow', 'pl-4', 'py-0.5');
  tagLink1.href = '#'; 
  tagLink1.textContent = ingredient;
  tags1.appendChild(tagLink1);
});


// Ajouter les liens pour chaque appliance
allAppareils.forEach(appliance => {
  let tagLink2 = document.createElement('a')
  tagLink2.classList.add('block', 'leading-8', 'font-light', 'hover:bg-yellow', 'pl-4', 'py-0.5');
  tagLink2.href = '#'; 
  tagLink2.textContent = appliance;
  tags2.appendChild(tagLink2); 
});

// Ajouter les liens pour chaque ustensile
allUstensils.forEach(ustensil => {
  let tagLink3=document.createElement('a')
  tagLink3.classList.add('block', 'leading-8', 'font-light', 'hover:bg-yellow', 'pl-4', 'py-0.5');
  tagLink3.href = '#'; 
  tagLink3.textContent = ustensil;
  tags3.appendChild(tagLink3);
});
}
