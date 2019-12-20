import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const AppId = "166a45a";
  const AppKey = "4170d76c73162759a28b6d64bbb00ba0";

  const [recipes, setRecipes] = useState([]);
  const [serch, setSerch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${AppId}&app_key=${AppKey}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSerch = e => {
    setSerch(e.target.value);
  };

  const getSerch = e => {
    e.preventDefault();
    setQuery(serch);
    setSerch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSerch} className="serch-form">
        <input
          className="serch-bar"
          type="text"
          value={serch}
          onChange={updateSerch}
        />
        <button className="serch-button" type="submit">
          Serch
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipes => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
