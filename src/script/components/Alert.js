import React, { Component } from 'react';
import {clearAlert} from '../State';


const Alert = ({text,headline,special}) => {
	const dog = (special=="dog")?<img src="dog.jpg" />:null;
	if (!text) return null;
	return <div className="alert">
    <button className="alert-close" onClick={clearAlert}>
      <svg class="alert-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="#ffffff" fill-rule="evenodd" d="M1.53 9.01L6 11.42l-2.41 4.47c-.74 1.487-.164 3.292 1.298 4.08 1.462.788 3.285.274 4.12-1.16l2.41-4.47 4.47 2.41c1.498.805 3.364.245 4.17-1.25.807-1.497.247-3.364-1.25-4.17l-4.47-2.41 2.41-4.47c.74-1.488.165-3.293-1.297-4.08-1.46-.79-3.284-.275-4.12 1.16L8.92 6 4.45 3.59C2.96 2.85 1.156 3.425.37 4.887-.42 6.35.094 8.173 1.53 9.008z"/></svg>
    </button>
    <p>{headline}</p>
    <p className="alert-text">{text}</p>
    {dog}
    </div>;
}
export default Alert;
