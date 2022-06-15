import { padding } from '@mui/system'
import React from 'react'

export const MyButton = ({title, width, height}) => {
	return (
		<button
			style={{
				width: width,
				height: height || "100px",
				background: '#aaa',
				border: 'none',
				borderRadius: '4px',
			}}
		>
			{title}</button>
	)
}
