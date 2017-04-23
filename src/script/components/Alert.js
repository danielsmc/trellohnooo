import React, { Component } from 'react';
import {clearAlert} from '../State';


const Alert = ({text}) => {
	if (!text) return null;
	return <div className="alert"><button onClick={clearAlert}>x</button>{text}</div>;
}

export default Alert;