import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { destroyTrainer } from './store'

class Trainers extends Component {
    constructor(){
        super();

    }
    
    render (){
        const { pokemons, trainers, destroyTrainer } = this.props
        return (
            <div>
                <h2>Pokemon Trainers</h2>
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
}

export default connect(state => state, (dispatch)=>{
    return {
        destroyTrainer: (id) =>{
            dispatch(destroyTrainer(id))
        }
    }
})(Trainers);