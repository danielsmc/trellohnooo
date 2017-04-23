import React, { Component } from 'react';

const Meter = ({name, filled, total}) => {
	const fillStyle = {
		width: `${100*Math.min(1,filled/total)}%`
	}
	return <div>{name}
		<div className="meter-outer"><div className="meter-inner" style={fillStyle}></div></div>
		</div>
}

export default Meter;