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
const Profile = () => {
	const { id: userId } = useParams()
	const location = useLocation()
	const { user } = useSelector(state => state.auth)
	const { isLoading } = useSelector(state => state.doctor)

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
	const [checkedUser, setCheckedUser] = useState('')

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
			last_name: '',
			name: '',
			patronymic: '',
			patients_num: '',
			phone: '',
			email: '',
		},
		mode: 'onChange'
	});

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
	const imageAva = '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'
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
						{/* <ButtonApp title={edit ? 'Сохранить' : 'Редактировать'} variant={'contained'} style={{ width: 'fit-content' }} handleClick={edit ? saveFunc : editFunc}
							type={edit ? 'submit' : 'button'}
						/> */}
					</Stack>
					{isLoading
						? <Stack display={'block'} position={'relative'} width={'100px'} height={'100px'}>
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
										<img className={styles.profile__avatar} src={'http://res.cloudinary.com/medtech3/image/upload/v1659270299/pawpunb1c9gydznpfkhq.png'} alt='avatar' />

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
									style={{
										pointerEvent: 'none'
									}} 
									children={
										<Controller name='last_name' control={control}
											render={({ field }) => (
												<InputApp field={field} value={checkedUser?.last_name} label='Фамилия' />
											)} />
									}
								/>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='name' control={control}
											render={({ field }) => (
												<InputApp
													field={field}
													value={checkedUser?.name || ''}
													label='Имя'
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
													field={field} value={checkedUser?.patronymic} label='Отчество' errors={errors} />
											)} />
									}
								/>
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='patients_num' control={control}
											render={({ field }) => (
												<InputApp field={field} label='Количество пациентов' value={checkedUser?.patients_num} errors={errors} />
											)} />
									} />
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='email' control={control}
											render={({ field }) => (
												<InputApp field={field} value={checkedUser?.email} label='Email' errors={errors} />
											)} />
									} />
								<Stack
									className={formStyles.form__inputWrap}
									children={
										<Controller name='phone' control={control}
											render={({ field }) => (
												<InputApp field={field} value={checkedUser?.phone} label='Номер телефона' errors={errors} />
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
			{/* {location.pathname === `/employees/${userId}` ?
				< ListOfPatient /> : null
			} */}
			{/* {location.pathname === `/patients/${userId}`
				? <CheckList />
				: <MedCard />
			} */}
		</section>

	)
}

export default Profile