import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadTrainer } from './store'

class _App extends Component {
    async componentDidMount(){
        const { loadTrainer } = this.props
        loadTrainer()
    }

    render(){
        const { trainers } = this.props
        console.log(trainers)
        return (
            <div>
                {trainers.map(trainer =>{
                    return(
                        <div key = {trainer.id}>
                            {trainer.name}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        loadTrainer: ()=>{
            dispatch(loadTrainer())
        },
    }
}

const App = connect(state => state, mapDispatchToProps)(_App);

render(<Provider store = { store }> <App /> </Provider>, document.querySelector('#root'));