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