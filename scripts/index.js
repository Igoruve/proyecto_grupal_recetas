import { Card, CardExtended } from './objects.js';
import {
  fetchMeals,
  fetchMealById,
  fetchRandomMeal,
  renderCards,
  debounce
} from './functions.js';

// Selecting DOM elemnts
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const randomButton = document.getElementById('randomButton');
const resultsContainer = document.getElementById('results');
const extendedView = document.getElementById('extendedView');

const resultsTab = document.getElementById("resultsTab");
const detailsTab = document.getElementById("detailsTab");
const resultsView = document.getElementById("results");
const detailedView = document.getElementById("extendedView");

// Form EventListener
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (query === '') {
    alert('Type something...');
    return;
  }

  const meals = await fetchMeals(query);
  renderCards(meals); //renderCards(meals, resultsContainer);
});

// card selection eventListener
document.addEventListener('cardSelected', async (e) => {
  const mealId = e.detail;
  const mealData = await fetchMealById(mealId);

  if (mealData) {
    const extendedCard = new CardExtended(mealData);
    extendedView.innerHTML = ''; // cleaner
    extendedView.appendChild(extendedCard.render());
    detailsTab.click();
    detailsTab.textContent=mealData.strMeal;
  } else {
    extendedView.innerHTML = '<p>No se encontró la receta.</p>';
  }
});

//Random Recipe
randomButton.addEventListener('click', async () => {
  const mealData = await fetchRandomMeal();

  if (mealData) {
    const extendedCard = new CardExtended(mealData);
    extendedView.innerHTML = '';
    extendedView.appendChild(extendedCard.render());
    detailsTab.click();
  }
});
randomButton.click();
// Live Search (optional, uncomment to try)
input.addEventListener('input', debounce(async () => {
  const query = input.value.trim();

  if (query.length < 1) {
    resultsContainer.innerHTML = '';
    return;
  }

  const meals = await fetchMeals(query);
  renderCards(meals, resultsContainer);
  resultsTab.click();
}, 500));

// Input focus visual (optional)
input.addEventListener('focus', () => {
  document.body.classList.add('dimmed');
});
input.addEventListener('blur', () => {
  document.body.classList.remove('dimmed');
});

//Result selectors
function viewToggler(viewToShow, viewToHide) {
  return function() {
    if (viewToShow.classList.contains('resultHidden')) {
      viewToShow.classList.remove('resultHidden');
    }
    if (!viewToHide.classList.contains('resultHidden')) {
      viewToHide.classList.add('resultHidden');
    }
  };
}
detailsTab.addEventListener('click', viewToggler(detailedView, resultsView));
resultsTab.addEventListener('click', viewToggler(resultsView, detailedView));
