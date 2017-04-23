import React, { Component } from 'react';
import {clearAlert} from '../State';


const Alert = ({text,headline,special}) => {
	const dog = (special=="dog")?<img src="dog.jpg" />:null;
	if (!text) return null;
	return <div className="alert"><button onClick={clearAlert}>x</button>{headline}{text}
	{dog}
	</div>;
}

export default Alert;