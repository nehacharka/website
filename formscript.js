
const form = document.querySelector('form');
const recipeList = document.querySelector('#recipe-list');
const noRecipes = document.getElementById('no-recipes');
const searchBox = document.getElementById('search-box');


let recipes = [];


function handleSubmit(event) {
  // Prevent default form submission behavior
  event.preventDefault();
  
  
  const nameInput = document.querySelector('#recipe-name');
  const timeInput = document.querySelector('#time');
  const costInput = document.querySelector('#cost');
  const ingrInput = document.querySelector('#recipe-ingredients');
  const methodInput = document.querySelector('#recipe-method');
  const name = nameInput.value.trim();
  const time = timeInput.value;
  const cost = costInput.value;
  const ingredients = ingrInput.value.trim().split(',').map(i => i.trim());
  const method = methodInput.value.trim();
  
 
  if (name && time && cost && ingredients.length > 0 && method) {
   
    const newRecipe = { name, time, cost, ingredients, method };
    recipes.push(newRecipe);
    
    
    nameInput.value = '';
    timeInput.value = '';
    costInput.value = '';
    ingrInput.value = '';
    methodInput.value = '';
    
    
    displayRecipes();
  }
}


function displayRecipes() {
  recipeList.innerHTML = '';
  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
	
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Estimated time: ${recipe.time} minutes </strong></p>
      <p><strong>Estimated cost: $ ${recipe.cost}</strong></p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
      </ul>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <button class="delete-button" data-index="${index}">Delete</button>`;
    recipeDiv.classList.add('recipe');
    recipeList.appendChild(recipeDiv);
  });

  if (recipes.length > 0) {
	noRecipes.style.display = 'none';
  }
  else {
	noRecipes.style.display = 'flex';
  }
}


function handleDelete(event) {
  if (event.target.classList.contains('delete-button')) {
    const index = event.target.dataset.index;
    recipes.splice(index, 1);
    displayRecipes();
	searchBox.value = '';
  }
}


function search(query) {
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(query.toLowerCase());
  });
  recipeList.innerHTML = '';
  filteredRecipes.forEach(recipe => {
    const recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
      </ul>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <button class="delete-button" data-index="${recipes.indexOf(recipe)}">
		Delete
	  </button>`;
    recipeEl.classList.add('recipe');
    recipeList.appendChild(recipeEl);
  });
}


form.addEventListener('submit', handleSubmit);
recipeList.addEventListener('click', handleDelete);
searchBox.addEventListener('input', event => search(event.target.value));
