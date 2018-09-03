import React from 'react';
import Scientist from './scientist';
import Infiltrator from './infiltrator/infiltrator';

const Roles = ({ infiltrator, infiltrators }) =>
  infiltrator ? <Infiltrator infiltrators={infiltrators} /> : <Scientist />;

export default Roles;
