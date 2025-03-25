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