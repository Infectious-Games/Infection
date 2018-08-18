import React from 'react';
import Scientist from './scientist';
import Infiltrator from './infiltrator';

const Roles = ({ infiltrator }) => 
  infiltrator
    ? <Infiltrator></Infiltrator>
    : <Scientist></Scientist>


  export default Roles;