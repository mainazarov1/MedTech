import { CircularProgress, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { images } from '../../../assets/images'
import { InputApp } from '../../../components/InputApp/InputApp'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
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
import patientService from '../../../services/patientService'
import MedCard from './MedCard'
import { weekdays } from '../../../utils/mock'
import { icons } from './../../../assets/icons/index'
const Profile = () => {
	const { id: userId } = useParams()
	const location = useLocation()
	const { user } = useSelector(state => state.auth)
	const { isLoading } = useSelector(state => state.doctor)

	// Yup schema
	const schema = Yup.object().shape({
		last_name: Yup.string(),
		name: Yup.string(),
		patronymic: Yup.string(),
		phone: Yup.string()
			.min(10, 'Введите номер телефона')
		,
		email: Yup.string()
			.email('Неверно указана почта')
		,
	});
	const [checkedUser, setCheckedUser] = useState()
	// const defaultUserValues = Object?.keys({
	// 	last_name: '',
	// 	name: '',
	// 	patronymic: '',
	// 	patients_num: '',
	// 	phone: '',
	// 	email: '',
	// })?.reduce((acc, item) => {
	// 	acc[item] = ''
	// 	return acc;
	// }, {})
	// React-Hook-Form
	useEffect(() => {
		if (location.pathname === `/employees/${userId}`) {
			async function check() {
				const response = await doctorService.getDoctorById(userId)
				setCheckedUser(response)
			}
			check()
		} else if (location.pathname === `/patients/${userId}`) {
			async function check() {
				const response = await patientService.getPatientById(userId)
				setCheckedUser(response)
			}
			check()
		} else {
			setCheckedUser(user)
		}
	}, [userId, location, user])
	const [edit, setEdit] = useState(false)
	const { handleSubmit, control,
		formState: {
			errors,
		},
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: checkedUser
			? {
				last_name: checkedUser.last_name,
				name: checkedUser.name,
				patronymic: checkedUser.patronymic,
				patients_num: checkedUser.patients_num,
				phone: checkedUser.phone,
				email: checkedUser.email,
			}
			: {
				last_name: '',
				name: '',
				patronymic: '',
				patients_num: '',
				phone: '',
				email: '',
			},
		mode: 'onChange'
	});
	const editFunc = () => {
		setEdit(!edit)
	}
	const saveFunc = () => {
		setEdit(!edit)
	}
	const disableInput = () => {
		return edit === false;
	}
	const onSubmit = (data) => {
	}
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
						{/* {
							getMedcard
								? <ButtonApp title={'Зарегистрировать'} variant={'contained'} style={{ width: 'fit-content' }}
									// handleClick={ }
									type={'submit'} />
								: null
						} */}
						{
							user?.role === 'superadmin'
								? <ButtonApp title={edit ? 'Сохранить' : 'Редактировать'} variant={'contained'} style={{ width: 'fit-content' }} handleClick={edit ? saveFunc : editFunc}
									type={edit ? 'submit' : 'button'}
								/>
								: null
						}
					</Stack>
					{isLoading || !checkedUser
						? <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={'100%'} height={'600px'}>
							<CircularProgress />
						</Stack>
						: <Stack>
							<Stack alignItems={'center'}>
								<Stack
									className={formStyles.form__inputWrap}
								>
									<label htmlFor={'file-input'}
										style={{
											width: '120px',
											height: '120px',
											borderRadius: '50%',
										}}
									>
										{/* <img className={styles.profile__avatar} src={images.doctor} alt='avatar' /> */}
										{/* <img className={styles.profile__avatar} src={`data:image/png;base64,${imageAva}`}/> */}
										<img className={styles.profile__avatar} src={checkedUser?.image !== null ? checkedUser.image : icons.avatar} alt='avatar' />
									</label>
									<input id={'file-input'} type={'file'}
										style={{
											display: 'none'
										}}
										disabled
									/>
								</Stack>
							</Stack>
							<Stack gap={'20px'} marginBottom={'25px'}>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='last_name' control={control}
											render={({ field: { value, onChange, name, onBlur } }) => (
												<InputApp field={{ value, onChange, name, onBlur }} value={value} label='Фамилия' disabled={!edit} />
											)} />
									}
								/>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='name' control={control}
											// defaultValue={checkedUser.name}
											render={({ field: { value, onChange, name, onBlur } }) => (
												<InputApp
													// defaultValue={checkedUser?.name}
													field={{ value, onChange, name, onBlur }}
													value={value}
													label='Имя'
													errors={errors}
													disabled={!edit}
												/>
											)} />
									} />
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='patronymic' control={control}
											render={({ field: { value, onChange, name, onBlur } }) => (
												< InputApp
													field={{ value, onChange, name, onBlur }} value={edit ? value : checkedUser?.patronymic} label='Отчество' errors={errors} disabled={!edit} />
											)} />
									}
								/>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='patients_num' control={control}
											render={({ field: { value, onChange, name, onBlur } }) => (
												<InputApp field={{ value, onChange, name, onBlur }} label='Количество пациентов' value={checkedUser?.patients_num} errors={errors} disabled />
											)} />
									} />
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='email' control={control}
											render={({ field: { value, onChange, name, onBlur } }) => (
												<InputApp field={{ value, onChange, name, onBlur }} value={edit ? value : checkedUser?.email} label='Email' errors={errors} disabled={!edit} />
											)} />
									} />
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='phone' control={control}
											render={({ field: { value, onChange, name, onBlur } }) => (
												<InputApp field={{ value, onChange, name, onBlur }} value={edit ? value : checkedUser?.phone} label='Номер телефона' errors={errors} disabled={!edit} />
											)} />
									}
								/>
							</Stack>
							<Stack gap={'25px'}>
								<Stack gap={'10px'}>
									<Typography children={'Рабочие дни'} />
									<Stack direction={'row'} gap={'10px'}>
										{weekdays.map((el, i) => {
											return <ButtonApp key={i} title={el} variant={'contained'} style={{ minWidth: 'calc((100% - 120px)/7)', height: '40px' }} />
										})}
									</Stack>
								</Stack>
								<Stack gap={'10px'}>
									<Typography children={'Часы работы'} />
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
					}

				</Stack>
			</Stack>
			{location.pathname === `/profile` ?
				< ListOfPatient /> : null
			}
			{location.pathname === `/employees/${userId}` ?
				< ListOfPatient /> : null
			}
			{/* {location.pathname === `/patients/${userId}`
				? <CheckList />
				: <MedCard />
			} */}
		</section>

	)
}

export default Profile