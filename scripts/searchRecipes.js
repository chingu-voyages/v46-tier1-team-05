//test term
//const term = 'egg yolk';

const recipes = []; // array to hold recipes

//enter key
const element = document.getElementById('term');
element.addEventListener('keydown', function (button) {
	if (button.key === 'Enter' && element.value < 0 ) {
		recipes.length = 0; //reset array
		display();
		getJson(element.value);
	}
});

function searchRecipe(){
	if(element.value > 0 ){
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
