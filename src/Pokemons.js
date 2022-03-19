import React from "react";
import { connect } from 'react-redux';

const Pokemons = ({ pokemons }) => {
    return (
        <div>
            {pokemons.map(pokemon =>{
                return(
                    <div key = {pokemon.id}>
                        {pokemon.name}
                    </div>
                )
            })}
        </div>
    )
}

export default connect(state => state)(Pokemons);