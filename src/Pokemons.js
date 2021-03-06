import React from "react";
import { connect } from 'react-redux';
import { destroyPokemon } from './store';
import CreatePokemon from './CreatePokemon';
import { Route, Link } from 'react-router-dom'

const Pokemons = ({ pokemons, destroyPokemon }) => {
    return (
        <div>
            <h2>List of all Pokemon currently available</h2>
            <Route component = { CreatePokemon } />
            {pokemons.map(pokemon =>{
                return(
                    <div key = {pokemon.id}>
                        A level {pokemon.level} <Link to= {`/pokemons/${pokemon.id}`}>{pokemon.name}</Link>
                        <span> </span>
                        <button onClick={ () => destroyPokemon(pokemon.id) }>Release Pokemon</button>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(state => state, (dispatch)=>{
    return {
        destroyPokemon: (id) =>{
            dispatch(destroyPokemon(id))
        }
    }
})(Pokemons);