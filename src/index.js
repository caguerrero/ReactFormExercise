import React from 'react';
import ReactDOM from 'react-dom';
import Singup from './signup';
import formStructure from './formStructure';

ReactDOM.render(
    <Singup structure={formStructure[0]} />,
    document.getElementById("root")
);