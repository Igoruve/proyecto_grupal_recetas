// Functions to fetch data (Api Calls)
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";


// Buscamos comidas por nombre
const searchMealByName = async (mealName) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
      
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
  
  // try
  searchMealByName("Arrabiata");
 
  
// class ApiRequest{}          //Con tipo de request y parametro
                            //Deberá de tener un método que de info para construir...Función para hacer la petición a la API
async function fetchMeals(searchTerm) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error in searching:', error);
    return [];
  }
}

// Render in grids
function renderCards(meals) {
  resultsContainer.innerHTML = '';

  meals.forEach(meal => {
    const card = new Card(meal);
    const cardElement = card.render();
    resultsContainer.appendChild(cardElement);
  });
}

// Show extended cards
async function showExtendedCard(mealId) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
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


async function getCards() {
    const url =  "Cards.json"
}    

async function getRecipes() {
    const url =  "Recipes.json"
}