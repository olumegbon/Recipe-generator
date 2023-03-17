
const API_KEY = "d88e3c5c678e4227916e0f19b1977c4c";
const apiUrl = "https://api.spoonacular.com/recipes/findByIngredients";
const apiInfoUrl = "https://api.spoonacular.com/recipes";
//const cuisine="african:nigeria";
const recipeForm = document.getElementById("recipeForm")
const recipeInput = document.getElementById("recipeInput");
const searchBtn = document.getElementById("searchBtn");
const recipeList = document.getElementById("recipeList");


recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const ingredients = recipeInput.value.split(",");
  const queryUrl = `${apiUrl}?apiKey=${API_KEY}&ingredients=${ingredients.join(",")}&cuisine=african`;
  const notFound=document.querySelector(".not-found")
  fetch(queryUrl)
    .then(response => response.json())
    .then(data => {

      recipeList.innerHTML = "";
      if( data.length === 0){
        html="sorry, we didn't find your meal";
        recipeList.classList.add('not-found');
     }
      recipeList.innerHTML=html;
      
      const grid = document.createElement("div");
      grid.className = "grid-container";
      data.forEach(recipe => {
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        const img = document.createElement("img");
        img.src = recipe.image;
        const title = document.createElement("h3");
        title.textContent = recipe.title;
        const instructionBtn = document.createElement("button");
        instructionBtn.textContent = "Get Instructions";
        instructionBtn.addEventListener("click", () => {
          fetch(`${apiInfoUrl}/${recipe.id}/analyzedInstructions?apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
 const instructions = data[0].steps.map(step => step.step);
              const instructionList = document.createElement("ul");
              instructions.forEach(instruction => {
                const li = document.createElement("li");
                li.textContent = instruction;
                instructionList.appendChild(li);
              });
              const modalContent = document.createElement("div");
              modalContent.appendChild(instructionList);
              const modal = createModal(modalContent);
              document.body.appendChild(modal);
            })
            .catch(error => console.log(error));
        });
        const videoBtn = document.createElement("button");
        videoBtn.textContent = "Watch Video";
        videoBtn.addEventListener("click", () => {
          window.open(`https://www.youtube.com/results?search_query=${recipe.title}`, "_blank");
        });
        gridItem.appendChild(img);
        gridItem.appendChild(title);
        gridItem.appendChild(instructionBtn);
        gridItem.appendChild(videoBtn);
        grid.appendChild(gridItem);
      });
      recipeList.appendChild(grid);
      recipeInput.value="";
    })
    .catch(error => console.log(error));
   //alert("meal not found")
   let html="";
});

function createModal(content) {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  const modal = document.createElement("div");
  modal.className = "modal";
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
  });
  modal.appendChild(content);
  modal.appendChild(closeBtn);
  modalOverlay.appendChild(modal);
  return modalOverlay;
}









