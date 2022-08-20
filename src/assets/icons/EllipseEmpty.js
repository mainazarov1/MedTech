import React from 'react'

function EllipseEmpty({ props }) {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={props.style}>
			<circle cx="5" cy="5" r="4.5" stroke={props.color} />
		</svg>
	)
}

export default EllipseEmpty