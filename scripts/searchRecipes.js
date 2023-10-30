//test term
//const term = 'egg yolk';

const recipes = []; // array to hold recipes

//enter key
const element = document.getElementById('term');
element.addEventListener('keydown', function (button) {
	if (button.key === 'Enter') {
		recipes.length = 0; //reset array
		display();
		getJson(element.value);
	}
});

function searchRecipe(){
	if(element.value !== ""){
		recipes.length = 0; //reset array
		display();
		getJson(element.value);
	}
}

// retrieve json data
function getJson(term) {
	console.log(term);
	fetch('assets/recipes.json')
		.then((res) => res.json())
		.then((data) => {
			//console.log(data);

			termSearch(data, term);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

//searches array of components and adds them to list
//calls display to output recipe names
function termSearch(data, term) {
	for (let i = 0; i < data.results.length; i++) {
		for (let j = 0; j < data.results[i].sections.length; j++) {
			for (
				let k = 0;
				k < data.results[i].sections[j].components.length;
				k++
			) {
				if (
					data.results[i].sections[j].components[
						k
					].ingredient.name.includes(term)
				) {
					recipes.push(data.results[i].name);
				}
			}
		}
	}

	display();
}

//displays list
function display() {
	let recipeList = document.getElementById('list');

	recipeList.innerHTML = ''; //reset list

	for (let i = 0; i < recipes.length; i++) {
		let li = document.createElement('li');
		li.innerText = recipes[i];
		recipeList.appendChild(li);
	}
}

//making recipes clickable
function recipeClick() {
	recipe = display.recipeList.addEventListener(button)
	if recipe === (href)
	.then 
}

//display recipe details
function details() {
	getJson();
		if 
}

// Get a reference to the recipe name element
const recipeName = document.getElementById('name'); 

// Add a click event listener to the recipe name
recipeName.addEventListener('click', () => {

  // Fetch JSON data when the recipe name is clicked
  fetch("assets/recipes.json") 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Create and display a modal with the recipe details
      const modal = document.createElement('div');
      modal.classList.add('modal');

      modal.innerHTML = `
        <h2>${data.name}</h2>
        <p>Category: ${data.type}</p>
        <p>Nutrition: ${data.nutrition}</p>
        <p>Instructions: ${data.instructions}</p>
        <p>Ingredients: ${data.components.join(', ')}</p>
        <button id="expand-recipe">Expand</button>
        <div id="recipe-content" style="display: none;">
          ${data.fullRecipe}
        </div>
        <button id="close-modal">X</button>
      `;

      document.body.appendChild(modal);

      // Add click event listeners for expanding and closing the modal
      const expandButton = document.getElementById('expand-recipe');
      const recipeContent = document.getElementById('recipe-content');
      const closeButton = document.getElementById('close-modal');

      expandButton.addEventListener('click', () => {
        recipeContent.style.display = 'block';
      });

      closeButton.addEventListener('click', () => {
        modal.remove();
      });
    })
	// Handle the error, e.g., display an error message to the user
    .catch(error => {
      console.error('Error:', error);
    });
});

