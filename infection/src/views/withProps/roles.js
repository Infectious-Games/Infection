import React from 'react';
import Scientist from '../noProps/scientist';
import Infiltrator from '../withProps/infiltrator';

const Roles = (props) => 
  props.infiltrator
    ? <Infiltrator></Infiltrator>
    : <Scientist></Scientist>


  export default Roles;