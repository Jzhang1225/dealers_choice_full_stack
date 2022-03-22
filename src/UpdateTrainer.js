import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateTrainer } from './store';

class UpdateTrainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.trainer ? this.props.trainer.name : '',
            age: this.props.trainer ? this.props.trainer.age : '',
        }
    }

    componentDidUpdate(prevProps){
        if(!prevProps.trainer && this.props.trainer){
            this.setState({ 
                name: this.props.trainer.name, 
                age: this.props.trainer.age,
            })
        }
    }

    render(){
        const { name, age } = this.state
        const { updateTrainer, history } = this.props
        if (!name || !age) return null
        return(
            <form onSubmit={ev => {
                ev.preventDefault();
                const trainer = { name, age }
                updateTrainer(this.props.trainer.id, trainer, history)
            }}>
                <input onChange= {ev => this.setState({ name: ev.target.value })} name = 'name' placeholder="Trainer Name" value = { name }/>
                <input onChange= {ev => this.setState({ age: ev.target.value })}type = 'number' name = 'age' placeholder="Trainer Age" value = { name }/>
                <button disabled = { !name || !age }> Update trainer info </button>
            </form>
        )
    }
}



export default connect((state, otherProps) => {
    const trainer = state.trainers.find(trainer => trainer.id === otherProps.match.params.id)
    return {
        trainer
    }
}, (dispatch) =>{
    return {
        updateTrainer: (trainerId, trainer, history) =>{
            dispatch(updateTrainer(trainerId, trainer, history))
        }
    }
})(UpdateTrainer);