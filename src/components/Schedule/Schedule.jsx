import { Typography } from '@mui/material'
import React from 'react'
import { Table } from '../Table/Table'

export const Schedule = () => {
	return (
		<div>
			<Typography
				component={'h3'}
				children={'Список запланированных встреч'}
				sx={{
					fontSize: '24px'
				}}
			/>
			<Table />
		</div>
	)
}
