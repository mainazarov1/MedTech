import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ButtonApp } from '../../ButtonApp/ButtonApp'
import CloseIcon from '@mui/icons-material/Close';
import styles from './ModalDoctorInfo.module.scss'
import { InputApp } from '../../InputApp/InputApp';
import { weekdays } from '../../../utils/mock';
import IconPlus from '../../../assets/icons/IconPlus';
import mainStyles from './../../../styles/index.module.scss'
import { useSelector } from 'react-redux';
import IconUser from '../../../assets/icons/IconUser';
import {icons} from './../../../assets/icons/index.js'
let classNames = require('classnames')
const ModalDoctorInfo = ({ handleClick, checkedUser }) => {

	console.log(checkedUser);
	
	return (
		<Stack
			className={styles.modal}
		>
			{/* <ButtonApp
				sx={{
					marginBottom: '20px',
					'&.MuiButton-root': {
						padding: '0px',
						minWidth: '22px',
						maxWidth: '22px',
						marginLeft: 'auto',
						'&:hover': {
							color: 'red',
							'& span.MuiButton-startIcon': {
								marginRight: 0,
								'& svg': {
									'& path': {
										fill: 'red',
									}
								}
							}
						},
						'& span.MuiButton-startIcon': {
							marginRight: 0,
							'& svg': {
								'& path': {
									fill: '#4C464B',
								}
							}
						},
					}
				}}
				startIcon={<CloseIcon />}
				handleClick={handleClick}
			/> */}
			<Stack
				justifyContent={'flex-end'}
				alignItems="flex-end"
			>
				<span
				className={classNames(mainStyles.btn_close)}
				onClick={handleClick}>
				<CloseIcon/>
			</span>

			</Stack>
			<p
				className={styles.modal__title}
				children={'Страница пользователя'}
			/>
			<img className={styles.modal__avatar} src={checkedUser && checkedUser?.image !== null ? icons.avatar : 'https://memchik.ru/images/templates/chto_proishodit.jpg'} alt="" srcset="" />
			<Stack
				direction={'row'} flexWrap={'wrap'} gap={'20px'} >
				{Object.entries({ last_name: 'Фамилия',name: 'Имя',patronymic: 'Отчество',patients_num: 'Количество пациентов',phone: 'Номер телефона',email: 'Email' }).map(([key,item],i) => {
					return <Stack key={i}
						sx={{
							width: 'calc((100% - 20px) / 2)'
						}}
					><InputApp label={item} value={checkedUser?.[key]} disabled={true} /></Stack>
				})}
			</Stack>
			<Stack marginTop={'30px'} gap={'6px'}>
				<p className={styles.modal__label} children={'Рабочие дни недели'} />
				<Stack direction={'row'} gap={'10px'} width='410px'>
					{weekdays.map((el, i) => {
						return <ButtonApp key={i} title={el} variant={'contained'} style={{ minWidth: 'calc((100% - 120px)/7)', height: '40px' }} />
					})}
				</Stack>
			</Stack>
			<Stack marginTop={'30px'} gap={'6px'}>
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
			</Stack>
		</Stack>
	)
}

export default ModalDoctorInfo