import { Stack, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { icons } from '../../../assets/icons'
import { weekdays } from '../../../utils/mock'
import { ButtonApp } from '../../ButtonApp/ButtonApp'
import { InputApp } from '../../InputApp/InputApp'
import styles from './../ModalDoctorInfo/ModalDoctorInfo.module.scss'
const CreateDoctor = ({ control, errors }) => {
	return (
		<Stack>
			<img className={styles.modal__avatar} src={icons.avatar} alt="" srcSet="" />
			<Stack
				direction={'row'} flexWrap={'wrap'} gap={'20px'} >
				{Object.entries({ last_name: 'Фамилия', name: 'Имя', patronymic: 'Отчество', address: 'Место жительства', phone: 'Номер телефона', email: 'Email' }).map(([key, item], i) => {
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
			{/* <Stack marginTop={'25px'} gap={'6px'}>
				<p className={styles.modal__label} children={'Рабочие дни недели'} />
				<Stack direction={'row'} gap={'10px'} width='410px'>
					{weekdays.map((el, i) => {
						return <ButtonApp key={i} title={el} variant={'contained'} style={{ minWidth: 'calc((100% - 120px)/7)', height: '40px' }} />
					})}
				</Stack>
			</Stack> */}
			{/* <Stack marginTop={'25px'} gap={'6px'}>
				<p className={styles.modal__label} children={'Часы работы'} />
				<Stack direction={'row'} gap={'10px'} width='410px'>
					<Stack gap={'10px'}>
						<Stack direction={'row'} gap={'10px'}>
							<Stack direction={'row'} alignItems={'center'} gap={'4px'}>
								<Typography children={'с'} marginTop={'6px'} />
								<InputApp placeholder={'00:00'} type={'time'} />
							</Stack>
							<Stack direction={'row'} alignItems={'center'} gap={'4px'}>
								<Typography children={'до'} marginTop={'6px'} />
								<InputApp placeholder={'00:00'} type={'time'} />
							</Stack>
						</Stack>
						<Stack direction={'row'} gap={'10px'}>
							<Stack direction={'row'} alignItems={'center'} gap={'4px'}>
								<Typography children={'с'} marginTop={'6px'} />
								<InputApp placeholder={'00:00'} type={'time'} />
							</Stack>
							<Stack direction={'row'} alignItems={'center'} gap={'4px'}>
								<Typography children={'до'} marginTop={'6px'} />
								<InputApp placeholder={'00:00'} type={'time'} />
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack> */}
		</Stack>
	)
}

export default CreateDoctor