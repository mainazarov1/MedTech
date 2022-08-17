import React from 'react'

function Ellipse({ props }) {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={props.style}>
			<circle cx="5" cy="5" r="5" fill={props.color} />
		</svg>
	)
}

export default Ellipse