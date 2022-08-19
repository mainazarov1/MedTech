import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputAdornment, Stack, Typography } from '@mui/material'
import IconDownload from '../../../assets/icons/IconDownload'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
import { TableCustom } from '../../../components/TableCustom/TableCustom'
import mainStyles from './../../../styles/index.module.css'
import styles from './Patients.module.css'
import { showShortName } from '../../../api/helperFunctions'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { InputApp } from '../../../components/InputApp/InputApp'
import IconScope from '../../../assets/icons/IconScope'
import achivateService from '../../../services/archiveService'
import { setSwitch } from '../../../redux/features/patient/patientSlice'
import { getAllPatient } from '../../../redux/features/patient/patientAction'
import axios from 'axios'
const Patients = () => {
	const { user } = useSelector((state) => state.auth);
	const { patient } = useSelector(state => state.patient)
	const dispatch = useDispatch()
	// const roles = (user?.role === 'superadmin')
	// 	? ["Супер администратор", "Администратор", "Врач", "Пациент"]
	// 	: ["Пациент"]
	const columns = [
		{ id: "number", label: "№", width: 35 },
		{
			id: "patient", label: "ФИО пациента", minWidth: '180px',
			width: 'fit-content'
		},
		{
			id: "phone",
			label: "Номер телефона",
			minWidth: '130px',
			width: 'fit-content'
			// format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "email",
			label: "Электронная почта",
			minWidth: '130px',
			width: 'fit-content'
			// format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "week",
			label: "Срок бер-ти",
			minWidth: '80px',
			width: 'fit-content'
		},
		{
			id: 'address',
			label: 'Адрес прописки',
			minWidth: '100px',
			width: 'fit-content'
		},
		{
			id: 'option',
			label: '',
			width: 20,
		}
	];
	const [patients, setPatients] = useState([])
	const [search, setSearch] = useState('')
	const [achivate, setAchivate] = useState('')
	const navigate = useNavigate()
	const handleAchivate = (row) => {
		setAchivate(row)
		dispatch(setSwitch(row.id));
	}
	const addPatient = () => {
		navigate('/patients/new')
	}
	const formatData = (arr) => {
		return arr.map(({ id, last_name, name, patronymic, phone, email, week, address, active, role }, i) => {
			return {
				id: id,
				number: `00${i + 1}`,
				patient: <Link to={`${id}`}>{showShortName({ last_name, name, patronymic })}</Link>,
				role: role,
				phone: <a href={`tel:${phone}`}>{phone}</a>,
				email: <a href={`mailto:${email}`} target='_blank' rel={'noreferrer'}>{email}</a>,
				week: week + ' неделя',
				address: address,
				active
			}
		})
	}
	useEffect(() => {
		// dispatch(getAllPatient())
		if (achivate) {
			const achivateAsyncFunc = async () => {
				await achivateService.achivateUser({ id: achivate.id, role: achivate.role }).then(res => res.data)
			}
			achivateAsyncFunc()
			setAchivate('')
		}
		function getData() {
			if (patient !== null) {
				if (search) {
					const searchFilter = () => {
						return patient.filter((pat) => {
							const fullName = `${pat.last_name}${pat.name}${pat.patronymic}`.toLowerCase();
							const reversedFullName = `${pat.last_name}${pat.name}${pat.patronymic}`.toLowerCase();
							const trimmedSearchValue = search.replace(/\s+/g, '').toLowerCase();
							return fullName.includes(trimmedSearchValue) || reversedFullName.includes(trimmedSearchValue)
						})
					}
					setPatients(formatData(searchFilter()))
				}
				// else if (user?.role === 'doctor') {
				// 	const patientDoc = () => {
				// 		return patient.filter((pat) => {
				// 			return pat.doctor.id === user.id
				// 		})
				// 	}
				// 	setPatients(formatData(patientDoc()))
				// }
				else {
					setPatients(formatData(patient))
				}
			}
		}
		getData()
	}, [search, patient, achivate])
	const handleDownloadPatients = async () => {
		try {
			const response = await axios.create({
				baseURL: 'https://med-tech.herokuapp.com/',
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.jwt_token}`,
					'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				},
				responseType: 'arraybuffer'
			})(
				`/patient/download/excel`
			);
			const url = URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `patients.xlsx`); //or any other extension
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (err) {
			console.log(err);
		}
	};
	const rows = patients
	return (
		<section className={styles.patients}>
			<Typography
				className={mainStyles.subtitle}
				component={"h3"}
				children={"Список пациентов"}
			/>
			<Stack
				direction="row"
				gap='20px'
				margin={"20px 0 35px"}
				height={'44px'}
				justifyContent='space-between'
			>
				<InputApp
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
						marginTop: '-9px',
					}}
				/>
				{/* <SelectBtn label={"Врач"} values={doctor} /> */}
				<Stack direction='row' gap='40px' justifyContent='flex-end'>
					{user?.role === 'superadmin'
						? < ButtonApp
							title='Скачать список'
							variant='outlined'
							endIcon={<IconDownload props='#68B7EC' />}
							style={{
								width: "fit-content",
								minWidth: 'fit-content',
								color: '#68B7EC'
							}}
							handleClick={handleDownloadPatients}
						/>
						: null
					}
					<ButtonApp title={"Добавить пациента"} variant={'contained'} handleClick={addPatient} />
				</Stack>
			</Stack>
			<Stack className={styles.patients__table}>
				<TableCustom columns={columns} rows={rows} radio={true} handleClick={handleAchivate} />
			</Stack>
		</section>
	)
}
export default Patients