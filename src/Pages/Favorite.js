import React, { useState } from "react";
import Layout from "../components/Layout";
import PokemonCard from "../components/PokemonCard";

export default function Favorite() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  function handleFavorite(e, id) {
    let filtered = JSON.parse(localStorage.getItem("favorites")).filter(
      (item) => item.id != id
    );
    setFavorites(filtered);
    localStorage.setItem("favorites", JSON.stringify(filtered));
  }
  return (
    <Layout>
      {favorites.length === 0 && (
        <div>
          <img
            className="w-full max-w-[300px] mx-auto"
            src="https://pngimg.com/uploads/pokemon/pokemon_PNG98.png"
            alt=""
          />
          <p className="text-center mt-4 text-2xl">
            No Favorite Pokemon added...
          </p>
        </div>
      )}
      <div className="pokemon-cards mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[20px] mb-10">
        {favorites.length > 0 &&
          favorites.map((pokemon, index) => {
            return (
              <PokemonCard
                key={index}
                name={pokemon.name}
                id={pokemon.id}
                handleFavorite={handleFavorite}
                types={pokemon?.detail?.types}
                isFavorite={pokemon.isFavorite}
              />
            );
          })}
      </div>
    </Layout>
  );
}
