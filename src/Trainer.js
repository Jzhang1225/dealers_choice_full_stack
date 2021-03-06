import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const Trainer = ({ trainers, match, pokemons }) => {
    const trainer = trainers.find(trainer => trainer.id === match.params.id)
    const party = pokemons.filter(pokemon => pokemon.trainerId === trainer?.id)
    return (
        <div>
            <h2>{trainer?.name} has {party.length} pokemon </h2>
            <Link to= {`/trainers/${trainer?.id}/update`}>Update trainer info </Link>
            {party.map(pokemon =>{
                return (
                    <div key = {pokemon.id}>
                        A level {pokemon?.level} {pokemon?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default connect(state => state)(Trainer);