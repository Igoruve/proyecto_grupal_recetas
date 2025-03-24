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

    extendedElement.innerHTML = `
      <img src="${this.thumbnail}" alt="${this.name}" />
      <h2>${this.name}</h2>
      <p><strong>Área:</strong> ${this.area}</p>
      <p><strong>Categoría:</strong> ${this.category}</p>
      <h3>Ingredientes:</h3>
      <ul>
        ${this.ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
      <h3>Instrucciones:</h3>
      <p>${this.instructions}</p>
      <p id="${"favIcon"}">${"Heart"}</p>
    `;

    return extendedElement;
  }
}
export { Card, CardExtended };

/*// Card (Object Master Class, Reduced Card Version)
export class Card {
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
        // Load extended details
        console.log(`Seleccited${this.name} with id ${this.id}`);
        showExtendedCard(this.id); // for later definition
      });
  
      return cardElement;
    }
  }



  
  // Card extended 
  export class CardExtended extends Card {
    constructor(mealData) {
      super(mealData);
      this.area = mealData.strArea;
      this.category = mealData.strCategory;
      this.ingredients = this.getIngredients(mealData);
      this.instructions = mealData.strInstructions;
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
  
      extendedElement.innerHTML = `
        <img src="${this.thumbnail}" alt="${this.name}" />
        <h2>${this.name}</h2>
        <p><strong>Área:</strong> ${this.area}</p>
        <p><strong>Categoría:</strong> ${this.category}</p>
        <h3>Ingredientes:</h3>
        <ul>
          ${this.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h3>Instrucciones:</h3>
        <p>${this.instructions}</p>
      `;
  
      return extendedElement;
    }
  }
   */ 