import React from "react";
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import CreateTrainer from "./CreateTrainer";
import { destroyTrainer } from './store'

const Trainers = ({ pokemons, trainers, destroyTrainer }) => {
    return (
        <div>
            <h2>Pokemon Trainers</h2>
            <Route component = { CreateTrainer } />
            {trainers.map(trainer =>{
                const party = pokemons.filter(pokemon =>{
                    return pokemon.trainerId === trainer.id
                })
                return(
                    <div key = {trainer.id}>
                        <div>
                        <Link to = {`/trainers/${trainer.id}`}>{trainer.name}</Link> is a {trainer.age} year old trainer with { party.length } pokemon.
                        <button onClick={ () => destroyTrainer(trainer.id) }> Delete Trainer </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(state => state, (dispatch)=>{
    return {
        destroyTrainer: (id) =>{
            dispatch(destroyTrainer(id))
        }
    }
})(Trainers);