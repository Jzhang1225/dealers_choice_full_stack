import React from "react";
import { connect } from 'react-redux';

const Trainers = ({ trainers }) => {
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

export default connect(state => state)(Trainers);