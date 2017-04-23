import React, { Component } from 'react';

const Meter = ({filled, total}) => {
	const fillStyle = {
		width: `${100*Math.min(1,filled/total)}%`
	}
	return <div className="meter-outer"><div className="meter-inner" style={fillStyle}></div></div>;
}

export default Meter;