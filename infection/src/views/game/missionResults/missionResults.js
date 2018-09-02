import React from 'react';

import Success from './success';
import Fail from './fail';

const MissionResults = ({ result }) =>
  result === 'success' ? <Success /> : <Fail />;

export default MissionResults;
