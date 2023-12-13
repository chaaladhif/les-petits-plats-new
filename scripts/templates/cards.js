function CardTemplate(data){
    function getCard(){
        const {
            image,
            name,
            ingredients,
            time,
            description,
            appliance,
            ustensils
          } = data;
          const picture = `/assets/images/${image}`;
      // Création de l'élément principal
      const containerCard=document.createElement('div');
      containerCard.setAttribute('id','recipeContainer');
      containerCard.classList.add('relative', 'w-96','rounded-xl', 'overflow-hidden', 'mb-6');
    // Création de l'image
    const img = document.createElement("img");
    img.classList.add("w-full", "object-cover", "h-52");
    img.src = picture;
    img.alt = `recette de ${name}`;
    containerCard.appendChild(img);

    // Création de la balise span
    const timeTag = document.createElement("span");
    timeTag.classList.add("absolute", "top-4", "right-4", "z-10", "bg-yellow", "text-black", "rounded-lg", "py-0.5", "px-2");
    timeTag.textContent = time+'min';
    containerCard.appendChild(timeTag);

    // Création de la div principale
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("bg-white", "py-4", "px-8", "text-black");
    containerCard.appendChild(contentDiv);

    // Création des éléments de texte
    const title = document.createElement("h3");
    title.classList.add("font-sans", "text-{1.1em}");
    title.textContent = name;
    contentDiv.appendChild(title);

    const recipeType = document.createElement("h5");
    recipeType.classList.add("text-BlackLight", "text-sm", "leading-10");
    recipeType.textContent = "RECETTE";
    contentDiv.appendChild(recipeType);

    const recipe = document.createElement("p");
    recipe.classList.add("text-sm", "text-ellipsis", "overflow-hidden", "h-24");
    recipe.textContent = description;
    contentDiv.appendChild(recipe);

    const ingredientsType = document.createElement("h5");
    ingredientsType.classList.add("text-BlackLight", "text-s", "leading-10");
    ingredientsType.textContent = "INGREDIENTS";
    contentDiv.appendChild(ingredientsType);

    // Création du conteneur flex
    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("flex", "flex-wrap", "h-36", "my-4", "-mr-8");
    contentDiv.appendChild(ingredientsContainer);

    // Création des éléments flex
    // Itération sur la liste des ingrédients
    ingredients.forEach(ingredient => {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("flex-col", "w-1/2");
    ingredientsContainer.appendChild(ingredientDiv);
  
    const ingredientName = document.createElement("p");
    ingredientName.classList.add("font-light");
    ingredientName.textContent = `${ingredient.ingredient}`;
    ingredientDiv.appendChild(ingredientName);
    
    const ingredientQuantity = document.createElement("p");
    ingredientQuantity.classList.add("text-BlackLight", "font-light", "text-sm", "leading-snug");
    ingredientQuantity.textContent = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : '';
    ingredientDiv.appendChild(ingredientQuantity);
    });

    return containerCard;
    }
    
    return {getCard};
}
