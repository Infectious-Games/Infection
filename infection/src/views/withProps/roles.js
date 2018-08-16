import React from 'react';
import Scientist from '../noProps/scientist';
import Infiltrator from '../withProps/infiltrator';

const Roles = ({ infiltrator }) => 
  infiltrator
    ? <Infiltrator></Infiltrator>
    : <Scientist></Scientist>


  export default Roles;