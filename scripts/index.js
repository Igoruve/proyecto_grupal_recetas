


class Receta{}              //Abstracta, de esta no se monta, lista los atributos y métodos a implementar
      

function addHTML()          //Una funcion que tomara el html resultante de una de las clases
                            //Y los incrustará en el HTML

function getInputText()     //Recoger el texto del input

// Selecting DOM elemnts
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const extendedView = document.getElementById('extendedView');

// Form EventListener
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (query === '') {
    alert('Type something...');
    return;
  }

  const meals = await fetchMeals(query);
  renderCards(meals);
});


//Random Recipe
const randomButton = document.getElementById('randomButton');
randomButton.addEventListener('click', async () => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await res.json();

  if (data.meals && data.meals.length > 0) {
    const extendedCard = new CardExtended(data.meals[0]);
    extendedView.innerHTML = '';
    extendedView.appendChild(extendedCard.render());
  }
});

