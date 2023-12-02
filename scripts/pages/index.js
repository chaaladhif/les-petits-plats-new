//recuperer les données
let  recipes = [];

function loadAallRrecipe(){
    //recipes=;
}
loadAallRrecipe();
searchPage();
async function searchPage(){
    try {
      const recipesData = await fetchData();
      console.log(recipesData);
    
    //append la factory function pour afficher les cards
    const sectionContainer = document.getElementById('sectionContainer');
    recipesData.forEach(mediItem => {
      const cardModel = CardTemplate(mediItem); // Passez les données à la fonction CardTemplate
      const cardDom = cardModel.getCard();
      sectionContainer.appendChild(cardDom);
    });
  }
  catch (error) {
    console.error(error);
  }
}
//onchange event , onclick event sur la loop on lance une recherche de la chaine de caractere 
//dans la liste de recette 

function inputsListener(){
   /* let input = document.getElementById('input').addEventListener('change', function(e){{
        e.preventDdefault();
        sampleSearch(input.value);
    }})*/
}

function sampleSearch(searchString){
   /* //: doit actualiser le contenu de recipe par les recipe contenant la chaine recherch dans le titre, description et liste des ingredient 
    recipes = recipes.filter();
    // je vais applique le miniscule sur l'elt*/
}



function updateTags(){
    // selon les nouveau recipe il faut qu'elle actualise lesvaleurs dans les tag ingredient /: ustintil et appareil.;
}
//supprimer branche native
//afficher tout les cards