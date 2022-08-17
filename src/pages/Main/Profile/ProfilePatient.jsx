import { CircularProgress, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { images } from '../../../assets/images'
import { InputApp } from '../../../components/InputApp/InputApp'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
import { TableCustom } from '../../../components/TableCustom/TableCustom'
import styles from './Profile.module.css'
import mainStyles from './../../../styles/index.module.css'
import { ListOfPatient } from './ListOfPatient'
import { CheckList } from './CheckList'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import formStyles from './../../Auth/Forms/Forms.module.css'
import { useLocation, useParams } from 'react-router-dom'
import doctorService from '../../../services/doctorService'
import { useEffect } from 'react'
import api from '../../../api/api'
import { getDoctorById } from '../../../redux/features/doctor/doctorAction'
import MedCard from './MedCard'
import patientService from '../../../services/patientService'
import IconList from '../../../assets/icons/IconList'
import IconPlus from '../../../assets/icons/IconPlus'
import checklistService from '../../../services/checklistService'
import { addListNumber } from '../../../api/helperFunctions'
import { SelectBtn } from '../../../components/Select/Select'
const ProfilePatient = () => {
	const { id: userId } = useParams()
	const location = useLocation()
	const { user } = useSelector(state => state.auth)
	const { isLoading } = useSelector(state => state.doctor)
	const dispatch = useDispatch()
	const [checkedUser, setCheckedUser] = useState()
	const { doctor } = useSelector(state => state.doctor)
	const [doctorId, setDoctorId] = useState()
	const [getMedcard, setMedcard] = useState()
	// Yup schema
	const schema = Yup.object().shape({
		last_name: Yup.string().required('Введите Вашу фамилию'),
		name: Yup.string().required('Введите Вашe имя'),
		patronymic: Yup.string().required('Введите Вашe отчество'),
		phone: Yup.string()
			.min(10, 'Введите номер телефона')
			.required('Введите Ваш номер телефона'),
		email: Yup.string()
			.email('Неверно указана почта')
			.required('Введите Вашу почту'),
	}).required();
	console.log(checkedUser);
	const defaultUserValues = {
		last_name: checkedUser ? checkedUser.last_name : '',
		name: checkedUser ? checkedUser.name : '',
		patronymic: checkedUser ? checkedUser.patronymic : '',
		phone: checkedUser ? checkedUser.phone : '',
		email: checkedUser ? checkedUser.email : '',
		doctor: checkedUser ? checkedUser.doctor : ''
	}
	// React-Hook-Form
	const { handleSubmit, control,
		formState: {
			errors,
			isDirty,
			isValid
		},
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			defaultUserValues
		},
		mode: 'onChange'
	});
	// checkedUser ? { ...checkedUser?.medcard } : newUserDefaultValues,



	useEffect(() => {
		if (location.pathname === `/patients/${userId}`) {
			async function check() {
				const response = await patientService.getPatientById(userId)
				setCheckedUser(response)
			}
			check()
			console.log(location);
		} else {
			setCheckedUser(user)
		}
	}, [userId, location, user, setCheckedUser])
	const [checkLists, setCheckLists] = useState([])
	const [rightView, setRightView] = useState(checkLists?.length !== 0)
	const [checkListNumber, setCheckListNumber] = useState(0)
	const onSubmit = (data) => {
		console.log(data);
		const req = async () => {
			const registerData = {
				...data,
				medcard: checkedUser?.id,
				address: checkedUser?.permanent_residence,
				doctor: parseInt(doctorId)
			}
			console.log(registerData);

			const response = await api.post(`patient/register`, registerData
			).then(res => res.data)
			console.log(response);
			setCheckedUser(response)
			// setMedcard(true)
		}
		req()
	}
	const addCheckList = async () => {
		console.log(new Date().toISOString());
		await checklistService.createCheckList({ question: 1, answer: 1, patient: checkedUser?.id, date: new Date().toISOString() })
	}
	const showCheckList = () => {
		return checkLists?.map((item, i) => {
			return <ButtonApp key={i}
				handleClick={() => {
					setCheckListNumber(i)
					setRightView(false)
				}}
				id={item.id} title={`Чек-лист №${i + 1}`} variant='contained' type='button' startIcon={<IconList />} style={{ justifyContent: 'flex-start' }} />
		})
	}
	useEffect(() => {
		setCheckLists(checkedUser?.checklist)
	}, [checkedUser, setCheckLists])

	return (
		<section
			className={styles.profile}
		>
			<Stack
				className={styles.profile__employees}
				component={'form'}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Stack
					className={styles.profile__info}
				>
					<Stack
						className={styles.profile__info_header}
						direction={'row'} justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography className={mainStyles.subtitle}
							component={"h3"}
							children={'Профиль'} />
						{
							getMedcard
								? <ButtonApp title={'Зарегистрировать'} variant={'contained'} style={{ width: 'fit-content' }}
									// handleClick={ }
									type={'submit'} />
								: null
						}
					</Stack>
					{isLoading
						? <Stack display={'block'} position={'relative'} width={'100px'} height={'100px'}>
							<CircularProgress />
						</Stack>
						: <Stack>
							<Stack alignItems={'flex-start'} marginBottom={'10px'}>
								<img className={styles.profile__avatar} src={images.doctor} alt='avatar' />
							</Stack>
							<Stack gap={'20px'} marginBottom={'25px'}>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller
											name='last_name'
											control={control}
											render={({ field }) => (
												<InputApp
													field={field}
													label='Фамилия'
													disabled
													value={checkedUser?.last_name}
													errors={errors}
													style={{ color: 'red' }} />
											)} />
										// <InputApp value={checkedUser?.last_name} label='Фамилия' style={{ color: 'red' }} readOnly />
									}
								/>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='name' control={control}
											render={({ field }) => (
												<InputApp
													field={field}
													value={checkedUser?.name}
													label='Имя'
													disabled
													errors={errors}
												/>
											)} />
									} />
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='patronymic' control={control}
											render={({ field }) => (
												< InputApp
													defaultValue={''}
													field={field} value={checkedUser?.patronymic} label='Отчество' disabled errors={errors} />
											)} />
									}
								/>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='phone' control={control}
											render={({ field }) => (
												<InputApp field={field} value={checkedUser?.phone} label='Номер телефона' disabled errors={errors} />
											)} />
									}
								/>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='email' control={control}
											render={({ field }) => (
												<InputApp field={field} value={checkedUser?.email} label='Email'
												disabled={location.pathname === `/patients/new` ? false : true}
												errors={errors} />
											)} />
									} />
								<Stack
									className={formStyles.form__inputWrap}
									children={
										checkedUser && location.pathname !== '/patients/new'
											? <Controller name='doctor' control={control}
												render={({ field }) => (
													<InputApp field={field} value={checkedUser?.doctor?.name} label='Гинеколог' disabled errors={errors} />
												)} />
											: <SelectBtn label={"Врач"} name='doctor' values={doctor} getDoctorId={setDoctorId} />
									} />
							</Stack>
							<Stack gap='2px' marginBottom='10px'>
								<Typography children={'Медицинская карта'} />
								<ButtonApp
									handleClick={() => setRightView(true)}
									title={'Мед карта'} variant='contained' type='button' startIcon={<IconList />} style={{ justifyContent: 'flex-start' }} />
							</Stack>
							<Stack gap='2px'>
								<Typography children={'Чек-лист'} />
								{showCheckList()}
								<ButtonApp
									handleClick={addCheckList}
									title={'Добавить чек-лист'} variant='text' type='button' startIcon={<IconPlus />} style={{ justifyContent: 'flex-start', color: 'black' }} />
							</Stack>
						</Stack>
					}
				</Stack>
			</Stack>
			{/* {location.pathname === `/profile` ?
				< ListOfPatient /> : null
			} */}
			{/* {location.pathname === `/employees/${userId}` ?
				< ListOfPatient /> : null
			} */}
			{location.pathname === `/patients/new`
				? <MedCard setCheckedUser={setCheckedUser} setMedcard={setMedcard} />
				: location.pathname === `/patients/${userId}` && rightView
					? <MedCard checkedUser={checkedUser} />
					: <CheckList checkListNumber={checkListNumber} checkedUser={checkedUser} />
			}
		</section>

	)
}

export default ProfilePatient