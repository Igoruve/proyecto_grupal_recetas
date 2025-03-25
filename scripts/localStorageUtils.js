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
    button.textContent = checkIfInFavArray(id) ? "★ Remove from Favorites" : "☆ Add to Favorites";
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

  const getUserFavArray = (username) => {
    const userArray = JSON.parse(localStorage.getItem("favs")) || [];
    const user = userArray.find((userInfo) => userInfo.name === username);
    return user ? user.favs : [];
  }

  const addToUserFavArray = (username, element) => {
    const currentArray = getUserFavArray(username);
    currentArray.favs.push(element);
    const totalArray = JSON.parse(localStorage.getItem("favs"));
    const newArray = totalArray.map((favs)=>{
      if(favs.name == username){
        return ({
          name:username,
          favs:currentArray
        })
      }
    })
    localStorage.setItem("favs", JSON.stringify(newArray));
  }

  const setFavUserArray = (username, favArray) => {
    const currentArray = getFavArray();
    const newArray = currentArray.map((favs)=>{
      if(favs.name == username){
        return ({
          name:username,
          favs:favArray
        })
      }
    })
    localStorage.setItem("favs", JSON.stringify(newArray));
  }

  const addUserFavArray = (username) =>{
    const currentArray = getFavArray();
    if(currentArray.find((favs)=>{favs.name==username})){
      console.log("User already exists");
      return;
    }else{
      currentArray.push({name:usernane, favs:[]});
    }
    localStorage.setItem("favs", JSON.stringify(currentArray));
  }

  const removeFavFromUser = (username, element) => {
    const currentArray = getUserFavArray(username);
    const newArray = currentArray.map((favs)=>{
      if(favs.name==username && favs.favs.includes(element)){
        const newFavs = favs.favs.filter((element)=>element!=favs);
        return({
          name:username,
          favs:newFavs
        })
      }
    })
    localStorage.setItem("favs", JSON.stringify(newArray));
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