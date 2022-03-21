import React, { Component } from "react";
import { connect } from 'react-redux';
import { createPokemon } from './store';

class CreatePokemon extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            level: '',
            trainerId: '',
        }
    }
    render(){
        const { name, level, trainerId } = this.state
        const { createPokemon, history, trainers } = this.props
        return(
            <form onSubmit={ev => {
                ev.preventDefault();
                const pokemon = { name, level, trainerId }
                createPokemon(pokemon, history, trainers)
            }}>
                <input onChange= {ev => this.setState({ name: ev.target.value })} name = 'name' placeholder="Pokemon Name" value = { name }/>
                <input onChange= {ev => this.setState({ level: ev.target.value })}type = 'number' name = 'level' placeholder="Pokemon level" value = { level }/>
                <select onChange= {ev => this.setState({ trainerId: ev.target.value })} name = 'trainerId' value = { trainerId }>
                    <option value = ''> select a trainer </option>
                    {
                        trainers.map(trainer =>{
                            return (
                                <option value = {trainer.id} key= {trainer.id}> {trainer.name} </option>
                            )
                        })
                    }
                </select>
                <button disabled = { !name || !level || !trainerId }> Create a pokemon </button>
            </form>
        )
    }
}



export default connect(state => state, (dispatch) =>{
    return {
        createPokemon: (pokemon, history, trainers) =>{
            dispatch(createPokemon(pokemon, history, trainers))
        }
    }
})(CreatePokemon);