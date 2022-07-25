import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Pokemon } from 'pokenode-ts';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<undefined | Pokemon >(undefined);

  const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

  const search = () => {
    axios.get(POKEMON_BASE_URL + "/pokemon/" + pokemonName).then((res) => {
      console.log(res.data);
      setPokemonInfo(res.data)
    });

  }
  return (
    <div className='p-6'>
      <h1 className="text-3xl font-bold my-3">
        Pokemon Search
      </h1>
      
      <div>
        <label className=''>Pokemon Name</label>

        <br/>
        <input 
          type="text" 
          id="pokemon-name" 
          name="pokemon-name" 
          className='border-[1px] border-black px-2 my-2'
          onChange={e => setPokemonName(e.target.value)}
          />
        <br/>

        <button className='border-[1px] border-black my-2' onClick={search}>
        Search
        </button>
      </div>

      <p>
        You have entered {pokemonName}
      </p>

      {pokemonInfo === undefined ? (
        <p></p>
      ) : (
        <div id="pokemon-result">
          <p>Name: {pokemonInfo.name}</p>
          <p>Height: {pokemonInfo.height}</p>
          <p>Weight: {pokemonInfo.weight}</p>
          {pokemonInfo?.sprites.other.dream_world.front_default ? <img src={pokemonInfo.sprites.other.dream_world.front_default} alt="" /> : <p>Cannot find image</p>}
        </div>
      )}

    </div>
  );
}

export default App;
