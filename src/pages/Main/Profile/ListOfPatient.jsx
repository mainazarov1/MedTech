
import { CircularProgress, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addListNumber, showShortName } from '../../../api/helperFunctions'
import { TableCustom } from '../../../components/TableCustom/TableCustom'
import styles from './Profile.module.css'
export const ListOfPatient = () => {
	const columns = [
		{ id: "number", label: "№", width: 35 },
		{ id: "patient", label: "ФИО пациента", minWidth: 'fit-content' },
		{
			id: "phone",
			label: "Номер телефона",
			minWidth: '130px',
			width: 'fit-content'
		},
		{
			id: "email",
			label: "Электронная почта",
			width: 200,
			minWidth: 'fit-content',
		},
	];

	const { patient } = useSelector(state => state.patient)
	const { id: userId } = useParams()
	const { user } = useSelector(state => state.auth)
	const [rowsData, setRowsData] = useState([])
	const formatData = (arr) => {
		return arr?.map(({ id, last_name, name, patronymic, phone, email }, i) => {
			return {
				number: addListNumber(i),
				patient: <Link to={`/patients/${id}`}>{showShortName({ last_name, name, patronymic })}</Link>,
				phone: <a href={`tel:${phone}`}>{phone}</a>,
				email: <a href={`mailto:${email}`} target='_blank' rel={'noreferrer'}>{email}</a>,
			}
		})
	}
	useEffect(() => {
		function getData() {
			if (patient !== null) {
				if (user?.role === 'doctor') {
					const filteredPatient = () => {
						return patient.filter(el => el?.doctor?.id === user?.id)
					}
					return filteredPatient()
				}
				if (['admin', 'superadmin'].includes(user?.role)) {
					const filteredPatient = () => {
						return patient.filter(el => el?.doctor?.id == userId)
					}
					console.log(filteredPatient());
					return filteredPatient()
				}
			}
		}
		console.log(getData());
		console.log(userId);
		setRowsData(formatData(getData()))
	}, [patient, user, userId])

	const rows = rowsData || []
	return (
		<Stack
			className={styles.profile__content}
		>
			<Typography children={'Список пациентов'} />
			{!patient && !rowsData
				? <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={'100%'} height={'650px'}>
					<CircularProgress />
				</Stack>
				:
				<Stack className={styles.profile__table}>
					<TableCustom rows={rows} columns={columns} />
				</Stack>}
		</Stack>
	)
}
