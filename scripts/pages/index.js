let  recipes = [];
let  filtredRecipes = [];
let listRecipes =[];
//declarer les listes des tags
let listTagIng=[];
let listTagApp=[];
let listTagUst= [];
 
HomePage();
async function HomePage(){
      recipes = await fetchData();
    //append la factory function pour afficher les cards: green code
    const sectionContainer = document.getElementById('sectionContainer');
    for (let i = 0; i < recipes.length; i++) {
      const cardModel = CardTemplate(recipes[i]);
      const cardDom = cardModel.getCard();
      sectionContainer.appendChild(cardDom);
    }
    updateAllTags(recipes);
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
  function sampleSearch(searchString) {
    const filteredRecipes = [];
    const lowersearchString = searchString.toLowerCase();
  
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const title = recipe.name.toLowerCase();
      const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
      const description = recipe.description.toLowerCase();
  
      // Vérifier si le titre contient le texte de recherche
      let titleMatch = false;
      for (let j = 0; j < title.length-1; j++) {
        if (title.substring(j, j + lowersearchString.length) === lowersearchString) {
          titleMatch = true;
          break;
        }
      }
  
      // Vérifier si les ingrédients contiennent le texte de recherche
      let ingredientsMatch = false;
      for (let j = 0; j < ingredients.length-1; j++) {
        if (ingredients.substring(j, j + lowersearchString.length) === lowersearchString) {
          ingredientsMatch = true;
          break;
        }
      }
  
      // Vérifier si la description contient le texte de recherche
      let descriptionMatch = false;
      for (let j = 0; j < description.length-1; j++) {
        if (description.substring(j, j + lowersearchString.length) === lowersearchString) {
          descriptionMatch = true;
          break;
        }
      }
  
      // Ajouter la recette aux résultats si elle correspond à la recherche
      if (titleMatch || ingredientsMatch || descriptionMatch) {
        filteredRecipes.push(recipe);
      }
    }
  
    return filteredRecipes;
  }

  function advancedSearch(listTagIng, listTagUst, listTagApp) {
    const filteredRecipes = [];
  
    for (let i = 0; i < listRecipes.length; i++) {
      const recipe = listRecipes[i];
  
      // Vérifier les ingrédients
      let ingredientsMatch = true;
      for (let k = 0; k < listTagIng.length; k++) {
        const element = listTagIng[k];
        let ingredientFound = false;
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
          let match = true;
          for (let l = 0; l < element.length; l++) {
            if (ingredient[l] !== element[l]) {
              match = false;
              break;
            }
          }
          if (match) {
            ingredientFound = true;
            break;
          }
        }
        if (!ingredientFound) {
          ingredientsMatch = false;
          break;
        }
      }
  
      // Vérifier les ustensiles
      let ustensilsMatch = true;
      for (let k = 0; k < listTagUst.length; k++) {
        const element = listTagUst[k];
        let ustensilFound = false;
        for (let j = 0; j < recipe.ustensils.length; j++) {
          const ustensil = recipe.ustensils[j].toLowerCase();
          let match = true;
          for (let l = 0; l < element.length; l++) {
            if (ustensil[l] !== element[l]) {
              match = false;
              break;
            }
          }
          if (match) {
            ustensilFound = true;
            break;
          }
        }
        if (!ustensilFound) {
          ustensilsMatch = false;
          break;
        }
      }
  
      // Vérifier l'appareil
      const appareilsMatch = recipe.appliance.toLowerCase().includes(listTagApp);
  
      // Ajouter la recette aux résultats si elle correspond à la recherche
      if (ingredientsMatch && ustensilsMatch && appareilsMatch) {
        filteredRecipes.push(recipe);
      }
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
     for (let i = 0; i < filteredRecipes.length; i++) {
      const cardModel = CardTemplate(filteredRecipes[i]);
      const cardDom = cardModel.getCard();
      sectionContainer.appendChild(cardDom);
    }
  }
  updateAllTags(filteredRecipes)
  updateRecetteSomme(filteredRecipes.length);
  return filteredRecipes; // Ajoutez cette ligne pour retourner les recettes filtrées
  }
  function updateRecetteSomme(somme) {
    const RecetteSomme = document.getElementById('RecetteCount');
    RecetteSomme.textContent = `${somme} recette${somme !== 1 ? 's' : ''}`;
  }
  function updateAllTags(filteredRecipes) {
    // Créer des sets pour les ingrédients, ustensiles et appareils
    let allUstensils = new Set();
    let allAppareils = new Set();
    let allIngredients = new Set();
  
    // Parcourir les recettes filtrées et ajouter les éléments uniques aux sets
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
  
      // Ajouter les ustensiles sans doublons
      for (let j = 0; j < recipe.ustensils.length; j++) {
        const ustensil = recipe.ustensils[j].toLowerCase();
        allUstensils.add(ustensil);
      }
  
      // Ajouter appliance sans doublons
      const appliance = recipe.appliance.toLowerCase();
      allAppareils.add(appliance);
  
      // Ajouter les ingrédients sans doublons
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientName = recipe.ingredients[j].ingredient.toLowerCase();
        allIngredients.add(ingredientName);
      }
    }
  
    // Génération et ajout des tags
    generateAndAppendTags(allIngredients, "ingredients", listTagIng);
    generateAndAppendTags(allAppareils, "appareils", listTagApp);
    generateAndAppendTags(allUstensils, "ustensils", listTagUst);
  }
  
  // Mise à jour de la fonction generateAndAppendTags pour résoudre le problème
  function generateAndAppendTags(listTags, elementDom, tagList) {
    // Récupérer les éléments des tags
    const container = document.getElementById(elementDom);
    container.innerHTML = '';
  
    for (let tag of listTags) {
      const tagDiv = document.createElement('div');
      tagDiv.setAttribute("data-tag", tag);
      tagDiv.classList.add('block', 'leading-8', 'font-light', 'hover:bg-yellow', 'pl-4', 'py-1');
      tagDiv.textContent = tag;
      tagDiv.addEventListener('click', function () {
        const tagText = tag.trim();
        createTagElement(tagText, tagList);
        listRecipes = advancedSearch(listTagIng, listTagUst, listTagApp);
        displayRecipes(listRecipes);
        document.querySelector(`[data-tag="${tagText}"]`).style.display = 'none';
      });
      container.appendChild(tagDiv);
    }
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
function DropdownSearch(event, category) {
  const inputValue = event.target.value.toLowerCase();
  const dropdownContainer = document.getElementById(category);
  const dropdownItems = Array.from(dropdownContainer.children);

  if (inputValue.length > 0) {
    delet.style.display = 'block';

    const filteredItems = [];
    for (let i = 0; i < dropdownItems.length; i++) {
      const item = dropdownItems[i];
      const itemText = item.textContent.toLowerCase();

      let match = true;
      for (let j = 0; j < inputValue.length; j++) {
        if (itemText.indexOf(inputValue[j]) === -1) {
          match = false;
          break;
        }
      }

      if (match) {
        filteredItems.push(item);
      }
    }

    for (let i = 0; i < dropdownItems.length; i++) {
      const item = dropdownItems[i];
      if (filteredItems.includes(item)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  } else {
    delet.style.display = 'none';
  }

  delet.addEventListener('click', function () {
    event.target.value = '';
    delet.style.display = 'none';

    for (let i = 0; i < dropdownItems.length; i++) {
      const item = dropdownItems[i];
      item.style.display = 'block';
    }
  });
}
//appel de fonction pour configurer les écouteurs d'événements des dropdowns
setupDropdownListeners();