import React from 'react';
import ReactDOM from 'react-dom';
import Singup from './signup';
import formStructure from './formStructure';

ReactDOM.render(
    <React.StrictMode>
        <Singup structure={formStructure[0]} />
    </React.StrictMode>,
    document.getElementById("root")
);