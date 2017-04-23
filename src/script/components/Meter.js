import React, { Component } from 'react';

const Meter = ({filled, total}) => {
	const fillStyle = {
		width: `${100*Math.min(1,Math.max(0,filled/total))}%`
	}
	return <div className="meter-outer"><div className="meter-inner" style={fillStyle}></div></div>;
}

export default Meter;