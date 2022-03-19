import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import axios from 'axios'

const LOAD_TRAINERS = 'LOAD_TRAINERS';
const LOAD_POKEMON = 'LOAD_POKEMON';

const pokemonReducer = ( state = [], action) =>{
    if (action.type === LOAD_POKEMON){
        state = action.pokemon
    };
    return state
}
const trainerReducer = ( state = [], action ) =>{
    if (action.type === LOAD_TRAINERS){
        state = action.trainers
    };
    return state
}

const Reducer = combineReducers({
    trainers: trainerReducer,
    pokemons: pokemonReducer,
})

const loadTrainer =()=>{
    return async (dispatch) =>{
        const trainers = (await axios.get('/api/trainers')).data
        dispatch({
            type: LOAD_TRAINERS,
            trainers
        })
    }
};

const store = createStore(Reducer, applyMiddleware(thunk))
export default store;
export {
    loadTrainer,
}