const recipeList = document.querySelector('#recipe-list');
const form = document.querySelector('form');
let recipes = [];

function handleSubmit(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    
    // Get recipe name, ingredients, and method input values
    const nameInput = document.querySelector('#recipe-name');
    const quantityInput = document.querySelector('#quantity');
    const timeInput = document.querySelector('#time');
    const costInput = document.querySelector('#cost');
    const mealtypeInput = document.querySelector('#mealtype');
    const cuisineInput = document.querySelector('#cuisine');
    const ingrInput = document.querySelector('#recipe-ingredients');
    const methodInput = document.querySelector('#recipe-method');

    const name = nameInput.value.trim();
    const quantity = quantityInput.value;
    const time = timeInput.value;
    const cost = costInput.value;
    const mealtype = mealtypeInput.value;
    const cuisine = cuisineInput.value;
    const ingredients = ingrInput.value.trim().split(',').map(i => i.trim());
    const method = methodInput.value.trim();

    if (name && ingredients.length > 0 && method) {
        const newRecipe = { name, ingredients, method };
        recipes.push(newRecipe);
    }

    nameInput.value = '';
    ingrInput.value = '';
    methodInput.value = '';

}

function displayRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
      const recipeDiv = document.createElement('div');
    });
}

form.addEventListener('submit', handleSubmit);
