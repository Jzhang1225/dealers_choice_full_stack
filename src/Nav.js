import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const Nav = ({ pokemons, trainers })=> {
  return (
    <nav >
      <Link to = '/'> Trainers ({ trainers.length })</Link>
      <Link to = '/pokemons'> Pokemon ({ pokemons.length})</Link>
    </nav>
  );
};


export default connect(state => state )(Nav);