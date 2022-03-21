import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadTrainers, loadPokemons } from './store'
import Nav from './Nav'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Trainers from './Trainers';
import Pokemons from './Pokemons';
import Trainer from './Trainer';

class _App extends Component {
    componentDidMount(){
        const { loadTrainers, loadPokemons } = this.props
        loadTrainers();
        loadPokemons();
    }

    render(){
        return (
            <div>
                <h1>Pokemon trainers and their pals</h1>
                <Nav />
                <Switch>
                    <Route exact path= '/' component= { Trainers }/>
                    <Route exact path= '/trainers/:id' component= { Trainer }/>
                    <Route exact path= '/pokemons' component = { Pokemons } />
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        loadTrainers: ()=>{
            dispatch(loadTrainers())
        },
        loadPokemons: ()=>{
            dispatch(loadPokemons())
        },
    }
}

const App = connect(state => state, mapDispatchToProps)(_App);

render(<Provider store = { store }> 
    <HashRouter>
        <App /> 
    </HashRouter>
</Provider>, document.querySelector('#root'));