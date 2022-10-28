import React from "react";
import { Link } from "react-router-dom";

export default function PokemonCard({
  name,
  id,
  handleFavorite,
  types,
  isFavorite,
}) {
  return (
    <div className="relative z-30 pokemon-card w-[80%] md:w-[233px] mx-auto bg-white rounded-[10px] p-[14px] relative">
      <Link to={`/detail/${id}`}>
        <div className="rounded-[10px] bg-[#F2F2F2] p-[17px] text-center h-[150px] md:h-[200px] flex items-center justify-center">
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
            className="w-[80%] max-w-[117px] md:w-[80%]"
            alt=""
          />
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <p className="font-semibold my-3 text-md md:text-[24px]">
          <Link to={`/detail/${id}`}>{name}</Link>
        </p>
        <button onClick={(e) => handleFavorite(e, id)}>
          <img
            src={
              isFavorite
                ? "/assets/favorite.svg"
                : "/assets/favorite-secondary.svg"
            }
            alt=""
          />
        </button>
      </div>
      <div className="text-left">
        {types.map((type, index) => {
          return (
            <span
              key={index}
              className={`bg-gray-200 bg-types-${type.type.name} px-3 py-1 text-sm md:text-normal inline-block rounded-lg mr-1 mb-2 capitalize`}
            >
              {type.type.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
