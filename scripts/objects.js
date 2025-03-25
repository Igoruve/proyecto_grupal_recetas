import { checkIfInFavArray, toggleFavorite } from './localStorageUtils.js'

// Card (Object Master Class, Reduced Card Version)
class Card {
  constructor({ idMeal, strMeal, strMealThumb }) {
    this.id = idMeal;
    this.name = strMeal;
    this.thumbnail = strMealThumb;
  }

  render() {
    const cardElement = document.createElement('section');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-id', this.id);

    cardElement.innerHTML = `
      <img src="${this.thumbnail}" alt="${this.name}" />
      <h3>${this.name}</h3>
    `;

    // EventListener to open the card in its extended version
    cardElement.addEventListener('click', () => {
      const event = new CustomEvent('cardSelected', { detail: this.id });
      document.dispatchEvent(event);
    });

    return cardElement;
  }
}

// Card extended inherits from Card
class CardExtended extends Card {
  constructor(mealData) {
    super(mealData);
    this.instructions = mealData.strInstructions;
    this.area = mealData.strArea;
    this.category = mealData.strCategory;
    this.ingredients = this.getIngredients(mealData);
    this.id = mealData.idMeal;
  }

  getIngredients(mealData) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  }

  render() {
    const extendedElement = document.createElement('div');
    extendedElement.classList.add('card-extended');

    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favorite-btn");
    favoriteButton.textContent = checkIfInFavArray(this.id) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites";
    if (checkIfInFavArray(this.id)) favoriteButton.classList.add("favorited");

    // Add event listener to toggle favorite state
    favoriteButton.addEventListener("click", () => toggleFavorite(this.id, favoriteButton));

    extendedElement.innerHTML = `
      <img src="${this.thumbnail}" alt="${this.name}" />
      <h2>${this.name}</h2>
      <p><strong>Type of food:</strong> ${this.area}</p>
      <p><strong>Category:</strong> ${this.category}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${this.ingredients.map(ing => `<li><p>${ing}</p></li>`).join('')}
      </ul>
      <h3>Instructions:</h3>
      <p>${this.instructions}</p>

    `;

    extendedElement.appendChild(favoriteButton);
    return extendedElement;
  }
}
export { Card, CardExtended };
