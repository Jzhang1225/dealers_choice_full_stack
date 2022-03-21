import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import axios from 'axios'

const LOAD_TRAINERS = 'LOAD_TRAINERS';
const LOAD_POKEMON = 'LOAD_POKEMON';
const DESTROY_TRAINER = 'DESTROY_TRAINER';
const CREATE_TRAINER = 'CREATE_TRAINER';
const DESTROY_POKEMON = 'DESTROY_POKEMON';
const CREATE_POKEMON = 'CREATE_POKEMON';

const pokemonReducer = ( state = [], action) =>{
    if (action.type === LOAD_POKEMON){
        return action.pokemons
    };
    if (action.type === DESTROY_POKEMON){
        return state.filter(pokemon => pokemon.id !== action.pokemon.id)
    };
    if (action.type === CREATE_POKEMON){
        return [...state, action.pokemon]
    };
    return state
}
const trainerReducer = ( state = [], action ) =>{
    if (action.type === LOAD_TRAINERS){
        return action.trainers
    };
    if (action.type === DESTROY_TRAINER){
        return state.filter(trainer => trainer.id !== action.trainer.id)
    };
    if (action.type === CREATE_TRAINER){
        return [...state, action.trainer]
    };
    return state
}

const Reducer = combineReducers({
    trainers: trainerReducer,
    pokemons: pokemonReducer,
})

const loadTrainers =()=>{
    return async (dispatch) =>{
        const trainers = (await axios.get('/api/trainers')).data
        dispatch({
            type: LOAD_TRAINERS,
            trainers
        })
    }
};

const destroyTrainer =(trainerId)=>{
    return async (dispatch) =>{
        const trainer = (await axios.delete(`/api/trainers/${trainerId}`)).data
        dispatch({
            type: DESTROY_TRAINER,
            trainer
        })
    }
};

const createTrainer =(newTrainer, history)=>{
    return async (dispatch) =>{
        const trainer = (await axios.post(`/api/trainers/`, newTrainer)).data
        dispatch({
            type: CREATE_TRAINER,
            trainer
        });
        history.push(`/trainers/${trainer.id}`)
    }
};

const loadPokemons =()=>{
    return async (dispatch) =>{
        const pokemons = (await axios.get('/api/pokemons')).data
        dispatch({
            type: LOAD_POKEMON,
            pokemons
        })
    }
};

const destroyPokemon =(pokemonId)=>{
    return async (dispatch) =>{
        const pokemon = (await axios.delete(`/api/pokemons/${pokemonId}`)).data
        dispatch({
            type: DESTROY_POKEMON,
            pokemon
        })
    }
};

const createPokemon =(newPokemon, history, trainers)=>{
    return async (dispatch) =>{
        const pokemon = (await axios.post(`/api/pokemons/`, newPokemon)).data
        const trainer = trainers.find(trainer => trainer.id === pokemon.trainerId)
        dispatch({
            type: CREATE_POKEMON,
            pokemon
        });
        history.push(`/trainers/${trainer.id}`)
    }
};

const store = createStore(Reducer, applyMiddleware(thunk))
export default store;
export {
    loadTrainers,
    loadPokemons,
    destroyTrainer,
    createTrainer,
    destroyPokemon,
    createPokemon,
}