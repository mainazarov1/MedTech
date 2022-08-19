import { Stack } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { InputApp } from '../../InputApp/InputApp'

const CreateAdmin = ({ control, errors }) => {
	return (
		<Stack
			direction={'row'} flexWrap={'wrap'} gap={'20px'} >
			{Object.entries({ last_name: 'Фамилия', name: 'Имя', patronymic: 'Отчество', phone: 'Номер телефона', email: 'Email' }).map(([key, item], i) => {
				return <Stack key={i}
					sx={{
						width: 'calc((100% - 20px) / 2)'
					}}
				>
					<Controller
							name={key}
							control={control}
							render={({ field: { value, onChange, name, onBlur } }) => (
								<InputApp
									field={{ value, onChange, name, onBlur }}
									label={item}
									value={value}
									errors={errors}
								/>
							)} />
				</Stack>
			})}
		</Stack>
	)
}

export default CreateAdmin