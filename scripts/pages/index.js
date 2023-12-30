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
    //updateAllTags(recipes);
    updateRecetteSomme(recipes.length);
    listRecipes = [...recipes]; // Initialize listrecipes with all recipes

  }
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
    // Filtrer les recettes en fonction de la chaîne de recherche
    for(let i=0;i<listRecipes.length;i++){
    const filteredRecipes = listRecipes.filter(recipe => {
      // Vérifier si la c haîne de recherche est présente dans le titre, la description ou la liste des ingrédients
      /*return (
        recipe.name.toLowerCase().includes(searchLowerCase) ||
        recipe.description.toLowerCase().includes(searchLowerCase) ||
        recipe.ingredients.some(
          ingredient =>
            ingredient.ingredient.toLowerCase().includes(searchLowerCase)
        ) )*/
    });
  }
    return filteredRecipes;
  }
  function displayRecipes(filteredRecipes,searchString){
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
  //updateAllTags(filteredRecipes)
  updateRecetteSomme(filteredRecipes.length);
  return filteredRecipes; // Ajoutez cette ligne pour retourner les recettes filtrées
  }
  function updateRecetteSomme(somme) {
    const RecetteSomme = document.getElementById('RecetteCount');
    RecetteSomme.textContent = `${somme} recette${somme !== 1 ? 's' : ''}`;
  }