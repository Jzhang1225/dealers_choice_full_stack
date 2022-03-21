import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import axios from 'axios'

const LOAD_TRAINERS = 'LOAD_TRAINERS';
const LOAD_POKEMON = 'LOAD_POKEMON';
const DESTROY_TRAINER = 'DESTROY_TRAINER';

const pokemonReducer = ( state = [], action) =>{
    if (action.type === LOAD_POKEMON){
        state = action.pokemons
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

const loadPokemons =()=>{
    return async (dispatch) =>{
        const pokemons = (await axios.get('/api/pokemons')).data
        dispatch({
            type: LOAD_POKEMON,
            pokemons
        })
    }
};

const store = createStore(Reducer, applyMiddleware(thunk))
export default store;
export {
    loadTrainers,
    loadPokemons,
    destroyTrainer
}