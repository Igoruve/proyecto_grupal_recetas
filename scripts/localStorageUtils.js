import { fetchMealById } from "./functions.js";

export const getFavArray = () => {
    if(JSON.parse(localStorage.getItem("favs"))==null){
      return [];
    }else{
      return JSON.parse(localStorage.getItem("favs"));
    }
  }
  
  export const addToFavArray = (element) => {
    const currentArray = getFavArray();
    currentArray.push(element);
    localStorage.setItem("favs", JSON.stringify(currentArray));
  }
  
  export const removeFromFavArray = (element) => {
    const currentArray = getFavArray();
    const newArray = currentArray.filter((id)=>{
      return id!=element
    })
    localStorage.setItem("favs", JSON.stringify(newArray))
  }
  
  export const checkIfInFavArray = (element) => {
    const currentArray = getFavArray();
    return (currentArray.indexOf(element) != -1)
  }

  export const toggleFavorite = (id, button) => {
    console.log("Happwns");
    if (checkIfInFavArray(id)) {
      removeFromFavArray(id);
    } else {
      addToFavArray(id);
    }
    button.textContent = checkIfInFavArray(id) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites";
    button.classList.toggle("favorited", checkIfInFavArray(id));
  }

  export const getFavRecipes = async () =>{
    const favList = getFavArray();
    console.log("La lista de favs es", favList);
    if (favList.length==0){
      return [];
    }else{
      const favRecipes = await Promise.all(favList.map(async(id)=> {
        return fetchMealById(id);
      }));
      console.log("Las recetas en si son: ", favRecipes);
      return favRecipes;
    }
  }

  // export async function fetchMealById(mealId) {
  //   try {
  //     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  //     const data = await res.json();
  //     return data.meals ? data.meals[0] : null;
  //   } catch (error) {
  //     console.error('Error obteniendo receta:', error);
  //     return null;
  //   }
  // }