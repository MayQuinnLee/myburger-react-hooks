import React from 'react';
import classes from './Spinner.module.css';
import Aux from '../../../hoc/Aux/Aux';

const spinner = () => (
  <Aux>
    <div>Loading...</div>
    <div className={classes.Loader}> </div>
  </Aux>
);

export default spinner;