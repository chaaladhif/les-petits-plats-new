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
  }
async function loadAllRecipe(){
  recipes = await fetchData();
}
loadAllRecipe();
function inputsListener(){
  const deleteSearch = document.getElementById('deleteSearch');
  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function (e) {
      e.preventDefault();
      let inputValue = searchInput.value;
      if (inputValue.length >= 3) {
          sampleSearch(inputValue);
          deleteSearch.style.display = 'block';
      } else {
          // Si la longueur de la chaîne est inférieure à 3
          deleteSearch.addEventListener('click', function () {
            //vider le recherche
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
console.log(filteredRecipes);
  // Effacer la sectionContainer avant d'ajouter les nouvelles cartes
  const sectionContainer = document.getElementById('sectionContainer');
  sectionContainer.innerHTML = '';
  if (filteredRecipes.length === 0) {
    // Aucune recette trouvée, afficher le message
    const noResultsMessage = document.createElement('div');
    noResultsMessage.classList.add('font-bold', 'text-xl');
    noResultsMessage.innerHTML = `Aucune recette ne contient '${searchString}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    sectionContainer.appendChild(noResultsMessage);
} else {
    // Afficher les nouvelles cartes filtrées
    filteredRecipes.forEach(mediaItem => {
        const cardModel = CardTemplate(mediaItem);
        const cardDom = cardModel.getCard();
        sectionContainer.appendChild(cardDom);
    });
}
}
function updateTags(){
    // selon les nouveau recipe il faut qu'elle actualise lesvaleurs dans les tag ingredient /: ustensil et appareil.;
}
