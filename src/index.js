import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadTrainer, loadPokemon } from './store'
import Nav from './Nav'
import { HashRouter, Route } from 'react-router-dom'
import Trainers from './Trainers'
import Pokemons from './Pokemons';

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
                <h1>Pokemon trainers and their pals</h1>
                <Nav />
                <Trainers />
                <Pokemons />
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