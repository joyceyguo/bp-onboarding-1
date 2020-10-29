import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {
  //API authentication things from EDAMAM
  const APP_ID = "d1b01914";
  const APP_KEY = "02b7f93c25e936d6f2ba18462d3cc9ed";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  //want to only fetch data when search button is clicked
  const [query, setQuery] = useState('chicken'); //default

  useEffect(() => {
    getRecipes();
    console.log('use effect running');
  }, [query]); 
  // adding [] as a second arg makes sure effect is only run once
  // can also add state in this arg, only when counter changes this useEffect runs

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  };

  const updateSearch = e => {
    setSearch(e.target.value); // value of the input
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault(); //stops auto page refresh
    setQuery(search);
    setSearch(''); //clear search after search
  };

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          className = "search-bar" 
          type="text" 
          value={search} 
          onChange={updateSearch} />
        <button 
          className = "search-button" 
          type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={Math.round(recipe.recipe.calories)}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}




export default App;
