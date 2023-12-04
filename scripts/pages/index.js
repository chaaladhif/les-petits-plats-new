//recuperer les données
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
    
    //return recipes;
  }
async function loadAllRecipe(){
  recipes = await fetchData();
  console.log(recipes);
  //HomePage();
}
loadAllRecipe();
function inputsListener(){
    let searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('change', function(e){
        e.preventDefault();
        let inputvalue=searchInput.value;
        sampleSearch(inputvalue)

    })
}
inputsListener();

function sampleSearch(searchString){
  // Convertir la chaîne de recherche en minuscules pour la comparaison insensible à la casse
  const searchLowerCase = searchString.toLowerCase();
  // Filtrer les recettes en fonction de la chaîne de recherche
  const filteredRecipes = recipes.filter(recipe => {
    // Vérifier si la chaîne de recherche est présente dans le nom, la description ou la liste des ingrédients
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

  // Ajouter les nouvelles cartes filtrées
  filteredRecipes.forEach(mediaItem => {
    const cardModel = CardTemplate(mediaItem);
    const cardDom = cardModel.getCard();
    sectionContainer.appendChild(cardDom);
  });

}



function updateTags(){
    // selon les nouveau recipe il faut qu'elle actualise lesvaleurs dans les tag ingredient /: ustensil et appareil.;
}
