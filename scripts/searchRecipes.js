//test term
//const term = 'egg yolk';

const recipes = []; // array to hold recipes

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
	if (recipes.length === 0) {
		console.log('no matches');
	}

	for (let i = 0; i < recipes.length; i++) {
		let li = document.createElement('li');
		li.innerText = recipes[i];
		recipeList.appendChild(li);
	}
}
