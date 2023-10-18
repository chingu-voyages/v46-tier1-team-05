/**
 * 1st function to retrieve content from json
 * 2nd function search nested keys in json
 * another function to display them
 */



//test term
const term = "egg yolk";


// retrieve json data
function getJson(){
    fetch('recipes.json')
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        console.log("get Json");
        termSearch(data, term);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const recipes = []; // list to hold recipe

//searches array of components and adds them to list
//calls display to output recipe names
function termSearch(data, term){
    for(let i = 0; i< data.results.length;i++){

        for(let j= 0; j < data.results[i].sections.length;j++){

            for(let k = 0; k < data.results[i].sections[j].components.length;k++){

                if(data.results[i].sections[j].components[k].ingredient.name.includes(term)){
                    recipes.push(data.results[i].name);
                }
            }
        }
    }

    display();
}
//displays list
function display(){
    for (let i = 0; i < recipes.length; i++) {
        console.log(recipes[i]); 
      }
}

