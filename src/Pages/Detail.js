import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./Home";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

export default function Detail() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL + `/${params.id}`).then((res) => {
      console.log(res);
      setPokemon(res.data);
      setIsLoading(false);
    });
    const pokemonStats = document.querySelectorAll(".pokemon-stat");

    pokemonStats.forEach((item) => {
      setTimeout(() => {
        item.style.width = item.getAttribute("data-width");
      }, 100);
      console.log(item.getAttribute("data-width"));
    });
  });

  return (
    <Layout>
      {isLoading && (
        <div className="relative md:flex items-center justify-center h-[80vh]">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div>
          <p className="text-[42px] font-bold mb-10 mt-10">{pokemon.name}</p>
          <div className="md:grid grid-cols-2">
            <div>
              <div className="max-w-[345px]">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt=""
                  className="w-[80%] mb-3 md:w-full"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold text-xl">Stats</p>
              {pokemon.stats.map((stat) => {
                return (
                  <div className="grid grid-cols-[141px_1fr] mt-5 mb-3">
                    <p className="text-[#252525] opacity-50 text-xl capitalize">
                      {stat.stat.name == "special-attack"
                        ? "Sp. Attack"
                        : stat.stat.name == "special-defense"
                        ? "Sp. Defence"
                        : stat.stat.name}
                    </p>
                    <div className="flex items-center">
                      <p className="text-xl mr-4">{stat.base_stat}</p>
                      <div className="bar rounded-full bg-[#D1D1D1] w-full h-[10px]">
                        <span
                          data-width={`${stat.base_stat}%`}
                          className="bar-inner block h-full rounded-full bg-[#777777] pokemon-stat"
                        ></span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <p className="font-semibold text-xl mt-5 mb-4">Sprites</p>
              <div className="flex space-x-4">
                <div className="w-[100px] h-[100px] bg-white shadow rounded-lg flex items-center justify-center">
                  <img src={pokemon.sprites.front_default} alt="" />
                </div>
                <div className="w-[100px] h-[100px] bg-white shadow rounded-lg flex items-center justify-center">
                  <img src={pokemon.sprites.back_default} alt="" />
                </div>

                <div className="w-[100px] h-[100px] bg-white shadow rounded-lg flex items-center justify-center">
                  <img src={pokemon.sprites.front_shiny} alt="" />
                </div>
                <div className="w-[100px] h-[100px] bg-white shadow rounded-lg flex items-center justify-center">
                  <img src={pokemon.sprites.back_shiny} alt="" />
                </div>
              </div>
            </div>
          </div>
          <table className="mb-10">
            <tr>
              <td className="font-semibold">Type:</td>
              <td>
                {pokemon.types.map((type) => {
                  return (
                    <span
                      key="index"
                      className={`px-3 py-1 inline-block rounded-lg mr-1 mb-2 capitalize bg-types-${type.type.name}`}
                    >
                      {type.type.name}
                    </span>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Height:</td>
              <td>{pokemon.height}"</td>
            </tr>
            <tr>
              <td className="font-semibold">Weight:</td>
              <td>{pokemon.weight} lbs</td>
            </tr>
            <tr>
              <td className="font-semibold">Abilities:</td>
              <td>
                {pokemon.abilities.map((ability) => {
                  return (
                    <span className="mr-1 capitalize">
                      {ability.ability.name},
                    </span>
                  );
                })}
              </td>
            </tr>
          </table>
        </div>
      )}
    </Layout>
  );
}
