import React, { Component} from 'react';

import Loader from '../Loader/Loader';

const LoaderHOC = (Component) => (props) => (
  props.dataLoaded? 
    <Component {...props}/> :
    <Loader />
)


export default LoaderHOC;
