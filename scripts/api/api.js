const fetchData = async () => {
    try {
        const response = await fetch('/recipes.json');
        if (response.ok) {
            const recipes = await response.json();
            return recipes;
        }
    } catch (error) {
        console.error(error);
    }
};