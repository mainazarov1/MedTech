import { InputAdornment, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import IconDownload from '../../../assets/icons/IconDownload'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
import { SelectBtn } from '../../../components/Select/Select'
import { TableCustom } from '../../../components/TableCustom/TableCustom'
import styles from './Employees.module.scss'
import mainStyles from './../../../styles/index.module.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { addListNumber, showShortName } from '../../../api/helperFunctions'
import { InputApp } from '../../../components/InputApp/InputApp'
import IconScope from '../../../assets/icons/IconScope'
import ModalDoctorInfo from '../../../components/Modals/ModalDoctorInfo/ModalDoctorInfo'
const Employees = () => {
	const { user } = useSelector((state) => state.auth);
	const roles = (user?.role === 'superadmin')
		? [{title: "Супер администратор", role: 'superadmin'}, {title: "Администратор", role: 'admin'}, {title: "Врач", role: 'doctor'},{title: "Пациент", role: 'patient'} ]
		: ["Пациент"]
	const columns = [
		{ id: "number", label: "№", width: 35 },
		{
			id: "doctor", label: "ФИО врача", minWidth: '180px',
			width: 'fit-content'
		},
		{
			id: "phone",
			label: "Номер телефона",
			minWidth: '130px',
			width: 'fit-content'
		},
		{
			id: "email",
			label: "Электронная почта",
			minWidth: '130px',
			width: 'fit-content'
		},
		{
			id: "patients",
			label: "Пациенты",
			minWidth: '80px',
			width: 'fit-content'
		},
		{
			id: 'doctorworkshift',
			label: 'График работы',
			minWidth: '100px',
			width: 'fit-content'
		},
		{
			id: 'option',
			label: '',
			width: 20,
		}
	];

	const selectClick = (item) => {
		return alert(`Add New ${item}`)
	}
	
	const { doctor } = useSelector((state) => state.doctor)
	const [search, setSearch] = useState('')
	const [doctors, setDoctors] = useState([])
	const days = useRef(['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'])
	const [modalDoctorInfo, setModalDoctorInfo] = useState(false)
	const [checkedUser,setCheckedUser] = useState()
	const handleClick = (e) => {
		console.log(e);
		setCheckedUser(...doctor.filter(doc=>doc.id === e))
		setModalDoctorInfo(!modalDoctorInfo)
	}
	const formatData = (arr) => {
		return arr.map(({ id, last_name, name, patronymic, phone, email, patients_num, doctorworkshift, active }, i) => (
			{
				id: id,
				number: addListNumber(i),
				doctor: <span onClick={()=>handleClick(id)}>{showShortName({ last_name, name, patronymic })}</span>,
				// doctor: <Link to={`${id}`}>{showShortName({ last_name, name, patronymic })}</Link>,
				phone: <a href={`tel:${phone}`}>{phone}</a>,
				email: <a href={`mailto:${email}`} target='_blank' rel="noreferrer" >{email}</a>,
				patients: patients_num,
				doctorworkshift: doctorworkshift?.map(({ weekday }) => days.current[weekday]).join(' '),
				active
			}
		))
	}

	useEffect(() => {
		function getData() {
			if (doctor !== null) {
				if (search) {
					const searchFilter = () => {
						return doctor.filter((doc, i) => {
							const fullName = `${doc.last_name}${doc.name}${doc.patronymic}`.toLowerCase();
							const reversedFullName = `${doc.last_name}${doc.name}${doc.patronymic}`.toLowerCase();
							const trimmedSearchValue = search.replace(/\s+/g, '').toLowerCase();
							return fullName.includes(trimmedSearchValue) || reversedFullName.includes(trimmedSearchValue)
						})
					}
					setDoctors(formatData(searchFilter()))
				} else {
					setDoctors(formatData(doctor))
				}
			}
		}
		getData()
	}, [search, doctor])
	const rows = doctors
	return (
		<section className={styles.employees}>
			{modalDoctorInfo
				?
				<Stack
					className={mainStyles.modal__view_background}
				>
					<ModalDoctorInfo handleClick={handleClick} checkedUser={checkedUser} />
				</Stack>
				: null
			}
			<Typography
				className={mainStyles.subtitle}
				component={"h3"}
				children={"Список пользователей"}
			/>
			<Stack
				direction="row"
				gap='20px'
				margin={"20px 0 35px"}
				justifyContent='space-between'
				// style={{
				// 	height: '44px',
				// }}
			>
				<InputApp
					title='Скачать список'
					variant='outlined'
					onChange={(e) => setSearch(e.target.value)}
					InputProps={{
						startAdornment:
							<InputAdornment position="start">
								<IconScope /></InputAdornment>
					}}
					style={{
						minWidth: 'fit-content',
						color: '#68B7EC',
						marginTop: '-6px',
						'& input': {
							height: '34px',

						}
					}}
				/>
				{/* <SelectBtn label={"Врач"} values={doctor} getDoctorId={setDoctorId} /> */}
				<Stack direction='row' gap='40px' justifyContent='flex-end'>
					<ButtonApp
						title='Скачать список'
						variant='outlined'
						endIcon={<IconDownload props='#68B7EC' />}
						style={{
							width: "fit-content",
							color: '#68B7EC'
						}}
					/>
					{user?.role === 'superadmin'
						? <SelectBtn label={"Добавить пользователя"} values={roles} radio={true} handleClick={selectClick} />
						:	null
				}
				</Stack>
			</Stack>
			<Stack
				className={styles.employees__table}
			>
				<TableCustom columns={columns} rows={rows} radio={true} handleClick={handleClick} />
			</Stack>
		</section>
	)
}

export default Employees