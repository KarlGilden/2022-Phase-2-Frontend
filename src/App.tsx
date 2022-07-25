import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';

function App() {
  const [cocktailData, setCocktailData] = useState<undefined | any >(undefined);
  const [alcoholType, setAlcoholType] = useState("undefined");
  const [searchQuery, setSearchQuery] = useState("");


  const COCKTAILDB_BASEURL = "https://www.thecocktaildb.com/api/json/v1/1/";

  const search = () => {
    axios.get(COCKTAILDB_BASEURL + "search.php?s=" + searchQuery).then((res) => {
      console.log(res.data);
      setCocktailData(res.data)
    });

  }
  return (
    <div className='p-6 '>
      <h1 className="text-3xl font-bold my-3">
        The Cocktail Bar
      </h1>
      
      <div>
        <input 
          type="text" 
          className='border-[1px] border-black my-2'
          onChange={(e)=>setSearchQuery(e.target.value)}
        />

        <button className='border-[1px] border-black my-2' onClick={search}>
        Search
        </button>
      </div>

      {cocktailData === undefined ? (
        <p></p>
      ) : (
        <div className=''>
          {cocktailData.drinks.map((value:any)=>{
            return(
              <div key={value.idDrink} className='p-3 mb-[50px] w-full max-w-[800px]'>
                <div className='flex flex-col md:flex-row justify-between items-start mb-[25px]'>
                  <div className='mr-3'>
                    <h1 className='text-5xl'>{value.strDrink}</h1>
                    <br />
                    <p className='italic'>{value.strIngredient1}</p>
                    <p className='italic'>{value.strIngredient2}</p>
                    <p className='italic'>{value.strIngredient3}</p>
                    <p className='italic'>{value.strIngredient4}</p>
                    <br />
                  </div>
                  <img className='w-full sm:w-[50%] md:w-[25%]' src={value.strDrinkThumb} alt="" />
                </div>
                <p>{value.strInstructions}</p>

              </div>
            )
          })}
        </div>
      )}

    </div>
  );
}

export default App;
