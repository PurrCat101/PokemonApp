import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Spin } from "antd";
import Logo from "./component/Logo";
import PokemonCard from "./component/PokemonCard";
import "./App.css";

function App() {
  const [arrayPokemons, setArrayPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonList = response.data.results;

        const pokemonWithDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
              id: detailsResponse.data.id,
              name: pokemon.name,
              imageUrl:
                detailsResponse.data.sprites.other["official-artwork"]
                  .front_default,
              hp: detailsResponse.data.stats[0].base_stat,
              attack: detailsResponse.data.stats[1].base_stat,
              defense: detailsResponse.data.stats[2].base_stat,
              type: detailsResponse.data.types[0].type.name,
            };
          })
        );
        setArrayPokemons(pokemonWithDetails);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getPokemon();
  }, []);

  const filteredPokemonList = arrayPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Logo />
      <div className="input-box">
        <Input
          style={{ width: 250 }}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search here"
        />
      </div>
      <div className="pokemon-list">
        {loading ? (
          <Spin size="large" />
        ) : (
          filteredPokemonList.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))
        )}
      </div>
    </>
  );
}

export default App;
