import React, { Component } from "react";
import { connect } from 'react-redux';
import { createTrainer } from './store';

class CreateTrainer extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            age: '',
        }
    }
    render(){
        const { name, age } = this.state
        const { createTrainer, history } = this.props
        return(
            <form onSubmit={ev => {
                ev.preventDefault();
                const trainer = { name, age }
                createTrainer(trainer, history)
            }}>
                <input onChange= {ev => this.setState({ name: ev.target.value })} name = 'name' placeholder="Trainer Name" value = { name }/>
                <input onChange= {ev => this.setState({ age: ev.target.value })}type = 'number' name = 'age' placeholder="Trainer Age" value = { age }/>
                <button disabled = { !name || !age }> Create a trainer </button>
            </form>
        )
    }
}



export default connect(state => state, (dispatch) =>{
    return {
        createTrainer: (trainer, history) =>{
            dispatch(createTrainer(trainer, history))
        }
    }
})(CreateTrainer);