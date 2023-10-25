//test term
//const term = 'egg yolk';

const recipes = []; // array to hold recipes
let recipeList = document.getElementById('list');


// **************************************************
//enter key
const element = document.getElementById('term');
element.addEventListener('keydown', function (button) {
	if (button.key === 'Enter') {
		recipes.length = 0; //reset array
		display();
		getJson(element.value);
	}
});

//search button
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

// 	recipeList.innerHTML = ''; //reset list

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
      
        <div class="card h-100 m-3 text-black" col-sm-3 style="width: 15rem;">
         
          <img src=${recipes[i].beauty_url ? recipes[i].beauty_url:recipes[i].thumbnail_url} class="card-img-top" alt="" width="240" height="240" >
          
          <div class="card-body">

            <h6 class="card-title">${recipes[i].name}</h6>

						<p class="card-text">${(recipes[i].user_ratings.score*5).toFixed(1) + '⭐'}</p>
            <p class="card-text">${recipes[i].tags[0].display_name}</p>
						<p class="card-text">${recipes[i].tags[6].display_name}</p>

            <a href="#" class="btn btn-success">View Recipe</a>
          
          </div>

        </div>
    `;
  }
  recipeList.innerHTML = recipeCard;
}





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
// //console.log(data.results[1].sections[0].components.length);
// for(let i = 0; i < data.results[1].sections[0].components.length; i++){
//   console.log(data.results[1].sections[0].components[i].ingredient.name);
// }
// //console.log(data.results[1].sections[0].components[0].ingredient.name); //*** 
// //console.log(data.results[1].sections[0].components[0].ingredient.display_singular);
// //console.log(data.results[1].sections[0].components[0].ingredient.display_plural);
// console.log(data.results[1].sections[0].components[0].extra_comment);

// //! Number of servings
// //console.log(data.results[1].num_servings);
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