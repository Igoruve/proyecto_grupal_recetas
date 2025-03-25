const lexemeUrl = "https://www.themealdb.com/api/json/v1/1/";
import { Card, CardExtended } from './objects.js';
// FIRST STEPS: TEST API CALL TO GET AN IDEA OF THE RESPONSE.
const searchMealByName = async (mealName) => {
    try {
      const response = await fetch(lexemeUrl + `search.php?s=${mealName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.meals) {
        console.log("Found meals:", data.meals);
        data.meals.forEach(meal => {
          console.log(`🍽️ ${meal.strMeal}`);
          console.log(`👨‍🍳 ${meal.strCategory}`);
          console.log(`📝 Instructions: ${meal.strInstructions.substring(0, 100)}...`);
          console.log(`📸 Imagen: ${meal.strMealThumb}`);
          console.log('---------------------------');
        });
      } else {
        console.log("No meals with that name were found.");
      }
    } catch (error) {
      console.error("Error finding meals:", error);
    }
  };
searchMealByName("Arrabiata");

//Function to get Recipes by name from API 
export async function fetchMeals(searchTerm) {
  try {
    const res = await fetch(lexemeUrl + `search.php?s=${searchTerm}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error in searching:', error);
    return [];
  }
}

//Function to get Recipes by id from API 
export async function fetchMealById(mealId) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error obteniendo receta:', error);
    return null;
  }
}

//Function to get ramdom Recipes from API 
export async function fetchRandomMeal() {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error obteniendo receta aleatoria:', error);
    return null;
  }
}

// RENDERING IN GRIDS TO SHOW RECIPE CARDS
export function renderCards(meals, container) {
  container.innerHTML = ''; // resultsContainer.innerHTML = '';

  meals.forEach(meal => {
    const card = new Card(meal);
    const cardElement = card.render();
    container.appendChild(cardElement); //resultsContainer.appendChild(cardElement);
  });
}
export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
// SHOW EXTENDED CARD VERSION WHEN CLICK IN CARD
export async function showExtendedCard(mealId) {
  try {
    const res = await fetch(lexemeUrl + `lookup.php?i=${mealId}`);
    const data = await res.json();
    if (data.meals && data.meals.length > 0) {
      const extendedCard = new CardExtended(data.meals[0]);
      extendedView.innerHTML = '';
      extendedView.appendChild(extendedCard.render());
    }
  } catch (error) {
    console.error('Error showing details:', error);
  }
}