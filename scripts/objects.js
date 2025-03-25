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

  generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(this.name, 10, 10);
    doc.setFontSize(12);
    doc.text(`Área: ${this.area}`, 10, 20);
    doc.text(`Categoría: ${this.category}`, 10, 30);
    
    doc.text('Ingredientes:', 10, 40);
    this.ingredients.forEach((ing, index) => {
      doc.text(`- ${ing}`, 10, 50 + index * 10);
    });
    
    doc.text('Instrucciones:', 10, 60 + this.ingredients.length * 10);
    doc.text(this.instructions, 10, 70 + this.ingredients.length * 10, { maxWidth: 180 });
    
    // Get the image for the PDF recipe
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = this.thumbnail;
    // Optional image render
    // img.onload = () => {
    //   const canvas = document.createElement('canvas');
    //   const ctx = canvas.getContext('2d');
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   ctx.drawImage(img, 0, 0);
    //   const imgData = canvas.toDataURL('image/png');
    //   doc.addImage(imgData, 'PNG', 10, 80 + this.ingredients.length * 10, 100, 100);
    // };
    doc.save(`${this.name}.pdf`);
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
      <p><strong>Área:</strong> ${this.area}</p>
      <p><strong>Categoría:</strong> ${this.category}</p>
      <h3>Ingredientes:</h3>
      <ul>
        ${this.ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
      <h3>Instrucciones:</h3>
      <p>${this.instructions}</p>
      <button class="download-pdf">📄 Descargar Receta</button>
    `;

    extendedElement.querySelector('.download-pdf').addEventListener('click', () => this.generatePDF());
    extendedElement.appendChild(favoriteButton);
    return extendedElement;
  }
}

export { Card, CardExtended };


//INTENTANDO la descarga en PDF de la receta, si no funciona, volver a la versión comentada

/*class CardExtended extends Card {
  constructor(mealData) {
    super(mealData);
    this.instructions = mealData.strInstructions;
    this.area = mealData.strArea;
    this.category = mealData.strCategory;
    this.ingredients = this.getIngredients(mealData);
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
export { Card, CardExtended };*/
