import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadTrainer, loadPokemon } from './store'
import Nav from './Nav'
import { HashRouter, Route } from 'react-router-dom'

class _App extends Component {
    async componentDidMount(){
        const { loadTrainer, loadPokemon } = this.props
        loadTrainer();
        loadPokemon();
    }

    render(){
        const { trainers, pokemons } = this.props
        console.log(trainers, pokemons)
        return (
            <div>
                <Nav />
                <div>
                    {trainers.map(trainer =>{
                        return(
                            <div key = {trainer.id}>
                                {trainer.name}
                            </div>
                        )
                    })}
                </div>
                <div>
                {pokemons.map(pokemon =>{
                    return(
                        <div key = {pokemon.id}>
                            {pokemon.name}
                        </div>
                    )
                })}
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        loadTrainer: ()=>{
            dispatch(loadTrainer())
        },
        loadPokemon: ()=>{
            dispatch(loadPokemon())
        },
    }
}

const App = connect(state => state, mapDispatchToProps)(_App);

render(<Provider store = { store }> 
    <HashRouter>
        <App /> 
    </HashRouter>
</Provider>, document.querySelector('#root'));