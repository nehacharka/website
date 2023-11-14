// const appId = "c325db64";
// const appKey = "74b66725287211e53e7457973b57e1d5";
// const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=c325db64&app_key=74b66725287211e53e7457973b57e1d5` ;

const appId = "984f4117";
const appKey = "9ea1a22e7eec0a7366f85848729e1469";
const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=984f4117&app_key=9ea1a22e7eec0a7366f85848729e1469` ;

const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");
const loadingEle= document.querySelector("#loading");

btnFind.addEventListener("click", () => loadRecipies(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
     const inputVal = txtSearch.value;
      if(e.keyCode === 13) {
          loadRecipies(inputVal);
      }
 });

 const toggleLoad = (element, isShow) => {
    element.classList.toggle( "hide", isShow );
 };
 
 const setScrollPosition = () => {
    recipeContainer.scrollTo ({ top: 0, behavior: "smooth" });
 };


function loadRecipies(type = "chicken") {
    toggleLoad(loadingEle, false);
    const url = baseURL + `&q=${type}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
    renderRecipies(data.hits);
    toggleLoad(loadingEle, true);
    })
    .catch((error) => toggleLoad(loadingEle, true))
    .finally(() => setScrollPosition());
}
loadRecipies();

const getRecipeStepsStr = (ingredientLines = []) => {
    let str = "";
  for (var step of ingredientLines) {
    str = str + `<li>${step}</li>`
  }
  return str;
};

const renderRecipies = (recipeList = [] ) => {
    recipeContainer.innerHTML = "";
    recipeList.forEach(recipeObj => {
        const { 
            label : recipeTitle, 
            ingredientLines, 
            image:recipeImage, 
        }  = recipeObj.recipe;
        const recipeStepStr = getRecipeStepsStr(ingredientLines);
        const htmlStr = `<div class="recipe">
        <div class="recipe-title">${recipeTitle} </div>
        <div class="recipe-image">
            <img src= "${recipeImage}" />
        </div>
        <div class="recipe-text">
            <ul>
            ${recipeStepStr}
            </ul>
        </div>
    </div>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);

    });
};
