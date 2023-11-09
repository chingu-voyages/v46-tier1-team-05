//test term
//const term = 'egg yolk';
const body = document.getElementsByTagName('body')[0];
const header = document.getElementById('header');
var recipes = []; // array to hold recipes
let recipeList = document.getElementById('list');
const element = document.getElementById('term');
let elementNoSpace;

//dark mode
function theme(){

  console.log(body.getAttribute("data-bs-theme"));
  if(body.getAttribute("data-bs-theme","dark") === "dark"){
    body.setAttribute("data-bs-theme","light");
    localStorage.setItem("theme-mode", "light");

  }else{
    body.setAttribute("data-bs-theme","dark");
    localStorage.setItem("theme-mode", "dark");

  }  

  header.classList.toggle("darkmode-h1");
  header.classList.toggle("page-header");
  //header.classList.toggle("darkmode-h1");
  
}
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});


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
			//reset and clear array
			console.log('empty search ');
			recipes.length = 0;
			display();
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
	}
}

// retrieve json data
function getJson(term) {
	console.log('term: ' + term);
	fetch('assets/recipes.json')
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			termSearch(data, term);
       element.value='';
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
					recipes.push(data.results[i]);
				}
			}
		}
	}
	recipes = Array.from(new Set(recipes));
	console.log('These are the recipes: ', recipes);
	display();
}

//displays list of recipes as cards
  function display(){
  if (recipes.length === 0) {
    console.log('no matches');
  }
  
	let recipeCard = '';
  for(let i = 0; i < recipes.length; i++){
    
    console.log(recipes[i].name);

    recipeCard += `
        <div class="recipe-card-div card h-100 m-2 p-0 col-sm-3 shadow">
          <img src=${recipes[i].beauty_url ? recipes[i].beauty_url:recipes[i].thumbnail_url} class="card-img-top overflow-hidden ratio ratio-1x1" alt="" width="240" height="240" >
          <div class="card-body h-100">
            <h5 class="card-title recipe-card-title">${recipes[i].name}</h5>
            <div class="d-flex flex-row justify-content-between">
              <p class="card-text fw-bold">${(recipes[i].user_ratings.score*5).toFixed(1) + '⭐'}</p>
              <p class="card-text fw-bold">${recipes[i].tags[0].display_name}</p>
            </div>
            <button class="btn btn-success" onclick="showModal(${i})">View Recipe</button>
          </div>      
        </div>
      `;
  }
  recipeList.innerHTML = recipeCard;
}
const modal = document.createElement('div');

// Access JSON data from array when the recipe button is clicked
function showModal(id){
  
  // Create the modal to display the recipe details
  modal.classList.add('modal', 'custom-modal-style');  //give it a class of 'modal'
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-hidden', 'true');
  //traverses the array of ingredients and concatenates them within li
  let ingredients = '';
  for(let ing=0; ing < recipes[id].sections[0].components.length; ing++){
    if(recipes[id].sections[0].components[ing].raw_text !== "n/a"){
      ingredients += `<li>${recipes[id].sections[0].components[ing].raw_text}</li>`;

    } else {
      ingredients += `<li>${recipes[id].sections[0].components[ing].ingredient.name}</li>`;
    }
  }

  //concatenates steps within li elements
  let stepsList = '';
  for (let stps=0; stps < recipes[id].instructions.length; stps++){
    stepsList += `<li>${recipes[id].instructions[stps].display_text}</li>`;
  }

  //structure the html in the modal
  modal.innerHTML = `   
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <!-- Row 1 -->
            <h1 class="modal-title fs-4 text-center">${recipes[id].name}</h1>

            <button type="button" class="btn-close" onclick="closeModal()" aria-label="Close"></button>
          </div>         
                <div class="modal-body p-5">
          
                    <div class="container-fluid ">
                        <!-- Row 2 -->
                        <div class="row">
                            <div class="col-md-4 text-center fw-bold">${recipes[id].tags[0].display_name}</div>
                            <div class="col-md-4 text-center fw-bold">${recipes[id].yields}</div>
                            <div class="col-md-4 text-center fw-bold">${(recipes[id].user_ratings.score*5).toFixed(1) + '⭐'}</div>
                        </div>

                        <!-- Row 3 -->
                        <div class="row my-2">
                            <div class="col">${recipes[id].description}</div>
                        </div>

                        <!-- Row 4 -->
                        <div class="row">
                            <div class="col-lg-10 m-auto my-4"> 
                              <img src=${recipes[id].beauty_url ? recipes[id].beauty_url:recipes[id].thumbnail_url} class="card-img-top m-auto rounded" alt="Freshly cooked ${recipes[id].name}." />
                            </div>
                        </div>

                        <div class="row">
                            
                            <!-- Row 5 LEFT col-->
                            <div class="col-md-8">  

                                <div class="row">
                                    <div class="col"> 
                                    <h4 class="fw-bold">Ingredients:</h4>   
                                    <ul>
                                      ${ingredients}
                                    </ul>
                                    
                                    </div>
                                </div>                                
                            </div>                           
                            <!-- Row 5 RIGHT col -->
                            <div class="col-md-4">
                                <div class="row my-2">
                                    <h5  class="fw-bold">Category:</h5>
                                    <p>${recipes[id].topics[0].name} </p>
                                </div>
                                <div class="row my-2">
                                    <h5 class="fw-bold">Cook Time:</h5>
                                    <p>${recipes[id].total_time_tier.display_tier}</p>
                                </div>
                                <div class="row">
                                    <h5 class="fw-bold">Nutrition Facts: </h5>
                                    <ul class="list-group list-group-flush">
                                      <li class="px-2" style="list-style-type: none">Calories: ${recipes[id].nutrition.calories}</li>
                                      <li class="px-2" style="list-style-type: none">Carbs: ${recipes[id].nutrition.carbohydrates}</li>
                                      <li class="px-2" style="list-style-type: none">Fat: ${recipes[id].nutrition.fat}</li>
                                      <li class="px-2" style="list-style-type: none">Fiber: ${recipes[id].nutrition.fiber}</li>
                                      <li class="px-2" style="list-style-type: none">Protein: ${recipes[id].nutrition.protein}</li>
                                      <li class="px-2" style="list-style-type: none">Sugar: ${recipes[id].nutrition.sugar}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                                          
                        <!-- Row 6 -->
                        <div class="row mt-5">
                            <div class="col"> 
                                <h4 class="fw-bold">Steps:</h4>  
                                <ol>${stepsList}</ol>   
                            </div>
                        </div>

                        <!-- Row 7 -->
                        <div class="row d-flex m-auto my-5">
                            <div class="col d-flex m-auto justify-content-center"> 
                              <video controls width="600" class="recipe-video">
                                <source src=${recipes[id].original_video_url} type="video/mp4" />                         
                              </video>
                            </div>
                        </div>             
                        
                    </div>
                </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" onclick="closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  document.body.appendChild(modal);  //add to DOM
  modal.style.display = 'block';  //show the modal
}
// close modal
function closeModal() {
  //modal.style.display = 'none'; // hide the modal
  modal.remove(); // hide the modal
}