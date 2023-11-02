//test term
//const term = 'egg yolk';

const recipes = []; // array to hold recipes
let recipeList = document.getElementById('list');
const element = document.getElementById('term');
let elementNoSpace;

//enter key
element.addEventListener('keydown', function (button) {
	if (button.key === 'Enter') {
		elementNoSpace = element.value.replace(/ /g, '');
		if (elementNoSpace !== '') {
			console.log('no space ' + elementNoSpace);
			console.log('enter');
			recipes.length = 0; //reset array
			display();
			getJson(element.value);
		} else {
			console.log('empty search');
		}
	}
});

//search button
function searchRecipe() {
	elementNoSpace = element.value.replace(/ /g, '');
	if (elementNoSpace !== '') {
		console.log(element.value);
		recipes.length = 0; //reset array
		getJson(element.value);
	} else {
		console.log('empty search');
	}
}
// retrieve json data
function getJson(term) {
	console.log('term:' + term);
	fetch('assets/recipes.json')
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

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
			for (let k = 0; k < data.results[i].sections[j].components.length;k++) {
				if (data.results[i].sections[j].components[k].ingredient.name.includes(term)) {
					recipes.push(data.results[i]);
				}
			}
		}
	}
  console.log('These are the recipes: ', recipes);
	display();
}

//displays list
// function display() {


	recipeList.innerHTML = ''; //reset list
	if (recipes.length === 0) {
		console.log('no matches');
	}


// 	for (let i = 0; i < recipes.length; i++) {
// 		let div = document.createElement('div');
// 		div.innerText = recipes[i];
// 		recipeList.appendChild(div);
// 	}
// }

function display(){
	let recipeCard = '';
	recipeCard.innerHTML = ''; //reset list

  for(let i = 0; i < recipes.length; i++){
    
    console.log(recipes[i].name);

    recipeCard += `
      
        <div class="recipe-card-div card h-100 m-2 p-0 text-black col-sm-3 shadow">
         
          <img src=${recipes[i].beauty_url ? recipes[i].beauty_url:recipes[i].thumbnail_url} class="card-img-top overflow-hidden ratio ratio-1x1" alt="" width="240" height="240" >
          
          <div class="card-body h-100">

            <h5 class="card-title recipe-card-title">${recipes[i].name}</h5>
						<div class="d-flex flex-row justify-content-between">
							<p class="card-text">${(recipes[i].user_ratings.score*5).toFixed(1) + '⭐'}</p>
							<p class="card-text">${recipes[i].tags[0].display_name}</p>
						</div>
            <a href="#" class="btn btn-success">View Recipe</a>
          
          </div>

        </div>
    `;
  }
  recipeList.innerHTML = recipeCard;
}


//making recipes clickable
function recipeClick() {
    recipe = display.recipeList.addEventListener(button)
    if recipes === (href)
    .then 
}

//display recipe details
function details() {
    getJson();
        if 
}

// Get a reference to the recipe name element
const viewRecipe = document.getElementById('btn btn-success'); 

// Add a click event listener to the recipe name
viewRecipe.addEventListener('click', () => {
	modal.style.display = 'block'; // show the modal
})

function closeModal() {
	modal.style.display = 'none'; // hide the modal
}

// Fetch JSON data when the recipe name is clicked
  fetch("./assets/recipes.json") 
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


//***********************************************************************
// //! name of dish
// console.log('name of dish: ', data.results[1].name);

// //! image of dish
// console.log('image: ', data.results[1].beauty_url);


// //! description of the dish
// console.log('Description: ',data.results[1].description);

// //! Ingredients
// console.log('ingredients:');
// console.log(data.results[1].sections[0].components[0].measurements[0].quantity);
// console.log(data.results[1].sections[0].components[0].measurements[0].unit.abbreviation);
//console.log(data.results[1].sections[0].components.length);
// for(let i = 0; i < data.results[1].sections[0].components.length; i++){
//   console.log(data.results[1].sections[0].components[i].ingredient.name);
// }
//console.log(data.results[1].sections[0].components[0].ingredient.name); //*** 
//console.log(data.results[1].sections[0].components[0].ingredient.display_singular);
//console.log(data.results[1].sections[0].components[0].ingredient.display_plural);
// console.log(data.results[1].sections[0].components[0].extra_comment);

// //! Number of servings
//console.log(data.results[1].num_servings);
// console.log(data.results[1].yields);

// //! Step by step instructions
// console.log('Step ', data.results[1].instructions[0].position);
// console.log(data.results[1].instructions[0].display_text);
// console.log('Step ', data.results[1].instructions[1].position);
// console.log(data.results[1].instructions[1].display_text);
// console.log('Step ', data.results[1].instructions[2].position);
// console.log(data.results[1].instructions[2].display_text);
// console.log('Step ', data.results[1].instructions[3].position);
// console.log(data.results[1].instructions[3].display_text);
// console.log('Step ', data.results[1].instructions[4].position);
// console.log(data.results[1].instructions[4].display_text);
// console.log('Step ', data.results[1].instructions[5].position);
// console.log(data.results[1].instructions[5].display_text);
// console.log('Step ', data.results[1].instructions[6].position);
// console.log(data.results[1].instructions[6].display_text);
// console.log('Step ', data.results[1].instructions[7].position);
// console.log(data.results[1].instructions[7].display_text);
// console.log('Step ', data.results[1].instructions[8].position);
// console.log(data.results[1].instructions[8].display_text);


// //! nutrition facts
// console.log('Calories: ', data.results[1].nutrition.calories);
// console.log('Carbs: ', data.results[1].nutrition.carbohydrates);
// console.log('Fiber: ', data.results[1].nutrition.fiber);
// console.log('Protein: ', data.results[1].nutrition.protein);
// console.log('Fat: ', data.results[1].nutrition.fat);
// console.log('Sugar: ', data.results[1].nutrition.sugar);

// //! Video of how to prepare
// console.log('Video: ', data.results[1].original_video_url);

// //! Difficulty Easy, Medium, Hard
// console.log('Difficulty: ', data.results[1].topics[0].name);

// //! Meal Time Type Breakfast, Lunch, Dinner
// console.log('Meal Time: ', data.results[1].topics[3].name);

// //! Cook time
// console.log('Cook Time: ', data.results[1].total_time_tier
// .display_tier);

// //! User Rating out of 100%
// console.log('User Rating: ', data.results[1].user_ratings.score);