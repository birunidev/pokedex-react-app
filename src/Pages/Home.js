import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";
import InfiniteScroll from "react-infinite-scroller";
import Layout from "../components/Layout";

export const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const [isLoadingScroll, setIsLoadingScroll] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [fetching, setFetching] = useState(false);
  console.log("next", nextUrl);

  const fetchItems = useCallback(async () => {
    if (fetching) {
      return;
    }

    setFetching(true);

    try {
      const res = await getPokemon(BASE_URL + `?offset=${pageOffset}&limit=20`);
      setPokemons([...pokemons, ...res]);
    } finally {
      setFetching(false);
    }
  }, [pokemons, fetching, pageOffset]);

  useEffect(() => {
    getPokemon(BASE_URL).then((res) => {
      setPokemons(res);
      setIsLoading(false);
    });
  }, []);

  function handleFavorite(id) {
    const copy_pokemon = [...pokemons];
    const foundPokemon = copy_pokemon.find((item, index) => {
      if (item.id == id) {
        item.index = index;
        item.isFavorite = !item.isFavorite;
        return item;
      }
    });
    console.log(foundPokemon);
    copy_pokemon[foundPokemon.index] = foundPokemon;
    let filtered = copy_pokemon.filter((item) => item.isFavorite);
    localStorage.setItem("favorites", JSON.stringify(filtered));
    setPokemons(copy_pokemon);
  }

  async function getPokemon(url) {
    setIsLoadingScroll(true);
    setPageOffset(pageOffset + 20);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    let pokemon_data = res.data.results;
    const resDetail = await Promise.all(
      pokemon_data.map((pokemon) =>
        axios.get(pokemon.url).then((res) => res.data)
      )
    );

    pokemon_data.forEach(async (pokemon) => {
      pokemon.id = parseInt(pokemon.url.split("/")[6]);
      const favorite_data = JSON.parse(localStorage.getItem("favorites"));
      const isFound = favorite_data.find((item) => item.id == pokemon.id);
      pokemon.isFavorite = isFound ? true : false;
      let foundDetail = resDetail.find((item) => item.id == pokemon.id);
      if (foundDetail) {
        pokemon.detail = foundDetail;
      }
    });

    return pokemon_data;
  }

  return (
    <Layout>
      {isLoading ? (
        <div className="relative flex items-center justify-center h-[80vh]">
          <Loading key={"loading-1"} />
        </div>
      ) : (
        <InfiniteScroll
          loadMore={fetchItems}
          hasMore={true}
          loader={
            <div className="text-center">
              <Loading key={"loading-2"} />
            </div>
          }
        >
          <div class="pokemon-cards mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[20px] mb-10">
            {pokemons.map((pokemon, index) => {
              return (
                <PokemonCard
                  key={index}
                  name={pokemon.name}
                  id={pokemon.id}
                  handleFavorite={() => handleFavorite(pokemon.id)}
                  types={pokemon?.detail?.types}
                  isFavorite={pokemon.isFavorite}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      )}

      {/* <div className="text-center">
        {isLoadingScroll && !isLoading && <Loading />}
      </div> */}
    </Layout>
  );
}
