import { Accordion, AccordionDetails, AccordionSummary, Stack, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './Profile.module.css'
import mainStyles from './../../../styles/index.module.css'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
import IconDownload from '../../../assets/icons/IconDownload'
import { InputApp } from '../../../components/InputApp/InputApp'
import './../../../index.css'
import { ExpandMore } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { labelsGroupArr, labelsObj } from '../../../utils/medcardMock'
import { useEffect } from 'react'
import medcardService from '../../../services/medcardService'
import api from '../../../api/api'
import axios from 'axios'

const schema = Yup.object().shape({
	// 'blood_group': Yup.string('sdad').required('Обязательное поле'),
	// RW_blood_1: "Кровь на RW",
	// "registration_date": "Дата взятия на учет",
	// "Rh_patient": "Резус-принадлежность беременной",
	// "RW_blood_2": "Кровь на RW 2",
	// "came_from": "Прибыла из другой мед. организации: ",
	// "Rh_partner": "Резус-принадлежность мужа/партнера",
	// "HIV_patient": "Кровь на ВИЧ",
	// "from": "Указать откуда",
	// "Rh_antibody_titer_28": "Титр резус-антител в 28 нед. беременности",
	// "HIV_partner": "Кровь на ВИЧ партнерa",
	'last_name': Yup.string('sdad').required('Обязательное поле'),
	'name': Yup.string('sdad').required('Обязательное поле'),
	'patronymic': Yup.string('sdad').required('Обязательное поле'),
	// "date_of_birth": "Число, месяц, год рождения",
	// "age": "Возраст",
	// "patient_category": "Категория пациента",
	// "insurance": "Территория страхования",
	// "social_security_card_number": "Номер удостоверения соц. защиты",
	// "phone": "Телефон",
	// "citizenship": "Гражданство",
	// "permanent_residence": "Постоянное место жительства",
	// "work": "Место работы",
	// "job_title": "Должность",
	// "work_phone": "Рабочий телефон",
	// "working_conditions": "Условия труда",
	// "work_or_not": "Работает ли теперь",
	// "education": "Образование",
	// "marital_status": "Семейное положение",
	// "holiday_from": "Дан отпуск по беременности с",
	// "holiday_to": "Дан отпуск по беременности до",
	// "last_name_partner": "Фамилия мужа",
	// "work_partner": "Место работы мужа/партнера",
	// "work_phone_partner": "Номер телефона мужа/партнера",
	// "gestational_age_period": "Срок беременности по последним месячным",
	// "gestational_age_ultrasound": "От УЗИ",
	// "estimated_date_of_birth": "Предполагаемая дата родов",
	// "pregnant_number": "Беременность (которая)",
	// "childbirth_number": "Роды (которые)",
	// "accounting_after_12_weeks": "Если взята на учет на сроке свыше 12нед.",
	// "date_of_inspection": "Дата осмотра",
	// "number_disability": "№ листка нетрудоспособности",
	// "complaints": "Жалобы при первичном осмотре",
	// "drug_tolerance": "Аллергия на препараты",
	// "diseases": "Перенесенные заболевания и операции",
	// "growth": "Рост",
	// "weigth": "Вес",
	// "skin": "Кожные покровы и слизистые",
	// "thyroid": "Щитовидная железа:",
	// "breast": "Молочные железы",
	// "peripheral_lymph_nodes": "Периферические лимфатические узлы",
	// "respiratory_system": "Дыхательная система",
	// "cardiovascular_system": "Сердечно-сосудистая система",
	// "blood_pressure": "Артериальное давление",
	// "digestive_system": "Пищеварительная система:",
	// "urinary_system": "Мочевыделительная система",
	// "edema": "Отеки",
	// "bone_pelvis": "Костный таз",
	// "uterine_fundus_height": "Высота дна матки",
	// "fetal_heartbeat": "Сердцебиение плода",
	// "external_genitalia": "Наружные половые органы",
	// "cervical_examination": "Осмотр шейки матки в зеркалах",
	// "bimanual_study": "Бимануальное исследование",
	// "vaginal_discharge": "Выделения из влагалища",
	// "preliminary_diagnosis": "Предварительный диагноз",
	// "blood_test_hemoglobin": "Анализ крови на гемоглобин",
	// "blood_type_Rh_factor": "Группа крови и резус фактор",
	// "urinalysis_protein": "Анализ мочи на белок",
	// "pretest_HIV": "Проведено дотестовое консультирование по ВИЧ",
	// "according_to_testing": "Согласно на тестирование",
	// "HIV_blood_test": "Анализ крови на ВИЧ",
	// "blood_test_syphilis": "Анализ крови на сифилис",
	// "bacteriological_culture": "Бактериологический посев мочи",
	// "ultrasound_18": "УЗИ (в 18 недель)",
	// "folic_acid": "Фолиевая кислота",
	// "potassium_iodide": "Калия йодид"
}).required('Обязательное полdddddе')
const requiredLabels = [
	'blood_group',
	// 'Rh_patient', 'Rh_partner', 'Rh_antibody_titer_28', 'RW_blood_1', 'RW_blood_2', 
	// 'HIV_patient', 'HIV_partner', 'registration_date', 'came_from', 'last_name', 'name', 'patronymic', 'date_of_birth',
	// 'age', 'insurance', 'social_security_card_number', 'citizenship', 'patient_category', 'permanent_residence', 'phone', 
	// 'marital_status', 'education'
]
const MedCard = ({ checkedUser, setCheckedUser, setMedcard }) => {

	const medcardId = checkedUser?.medcard?.id
	const newUserDefaultValues = Object?.keys(labelsObj)?.reduce((acc, item) => {
		acc[item] = ''
		return acc;
	}, {})
	// React-Hook-Form
	const { handleSubmit, control,
		formState: {
			errors,
			isDirty,
			isValid
		}
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: checkedUser ? { ...checkedUser?.medcard } : newUserDefaultValues,
		mode: 'onChange'
	});
	const onSubmit = (data) => {
		const req = async () => {
			const response = checkedUser
				? await api.patch(`med-card/update/${checkedUser.medcard.id}`, data).then(res => res.data)
				: await api.post(`med-card`, data).then(res => res.data)
			console.log(response);
			setCheckedUser(response)
			setMedcard(true)
		}
		req()
		// const response = await api.post(`med-card`, data
		// ).then(res => res.data)
		// console.log(response);
		// console.log(data);

	}
	// useEffect(() => {
	// 	const req = async (data) => {
	// 	}
	// })
	const handleDownloadMedcard = async (id) => {
		try {
			const response = await axios.create({
				baseURL: 'https://med-tech.herokuapp.com/',
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.jwt_token}`,
					'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				},
				responseType: 'arraybuffer'
			})(
				`/med-card/download/${medcardId}`
			);
			const url = URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${checkedUser?.last_name}-medcard.xlsx`); //or any other extension
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (err) {
			console.log(err);
		}
	};
	const showMedcard = () => {
		return Object.entries(labelsGroupArr)?.map(([groupKey, groupObj], i) => {
			return <Accordion key={i}>
				<AccordionSummary
					direction={"column"}
					expandIcon={<ExpandMore />}
					xs={{ height: '100px' }}
				>
					<Typography>{groupKey}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack
						className='panel'
						direction={'row'}
						flexWrap={'wrap'}
						overflow={'scroll'}
						gap={'15px'}
						component={'div'}
					>
						{Object.entries(groupObj).map(([key, label], idx) => {
							return <Stack
								key={idx}
								width={'calc((100% - 30px) / 3)'}
								children={
									<Controller
										// rules={{ required: requiredLabels.includes(el[0]) ? true : false}}
										name={key}
										control={control}
										render={({ field: { value, onChange, name, onBlur } }) => (
											<InputApp
												field={{ value, onChange, name, onBlur }}
												label={label}
												
												// defaultValues={checkedUser ? checkedUser?.medcard?.[el[0]] : ''}
												value={value}
												errors={errors}
											/>
										)}
									/>
								} />
						})}
					</Stack>
				</AccordionDetails>
			</Accordion>

		})
	}
	return (
		<Stack
			className={styles.profile__content}
			component={'form'}
			// defaultValues={newUserDefaultValues}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack overflow={'scroll'}>
				<Stack direction='row' gap='40px' justifyContent='flex-end'>
					<ButtonApp
						title='Скачать мед-карту'
						variant='outlined'
						endIcon={<IconDownload props='#68B7EC' />}
						style={{
							width: "fit-content",
							minWidth: 'fit-content',
							color: '#68B7EC'
						}}
						handleClick={()=>handleDownloadMedcard(medcardId)}
					/>
					<ButtonApp title={"Сохранить"} variant={'contained'}
						type={'submit'}
						style={{
							width: "fit-content",
							minWidth: '140px',
						}}
					/>
				</Stack>
				<Stack justifyContent={'center'} direction={'row'} marginTop={'50px'}>
					<Typography className={mainStyles.subtitle} component={'h3'} children={'МЕДИЦИНСКАЯ ДОКУМЕНТАЦИЯ'} />
				</Stack>
				{showMedcard()}
				{/* <Accordion>
					<AccordionSummary
						direction={"column"}
						expandIcon={<ExpandMore />}
						xs={{ height: '100px' }}
					>
						<Typography>Анализ крови</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack
							className='panel'
							direction={'row'}
							flexWrap={'wrap'}
							overflow={'scroll'}
							gap={'15px'}
							component={'div'}
						>
							{Object.entries(labels).slice(0, 11).map(([key, label], i) => {
								// console.log(el);
								return <Stack
									key={key}
									width={'calc((100% - 30px) / 3)'}
									children={
										<Controller
											// rules={{ required: requiredLabels.includes(el[0]) ? true : false}}
											name={key}
											control={control}
											render={({ field: { value, onChange, name, onBlur } }) => (
												<InputApp
													field={{ value, onChange, name, onBlur }}
													label={label}
													// defaultValues={checkedUser ? checkedUser?.medcard?.[el[0]] : ''}
													value={value}
													errors={errors}
												/>
											)}
										/>
									} />
							})}
						</Stack>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						direction={"column"}
						expandIcon={<ExpandMore />}
						xs={{ height: '100px' }}
					>
						<Typography>Данные о пациенте</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack
							className='panel'
							direction={'row'}
							flexWrap={'wrap'}
							overflow={'scroll'}
							gap={'15px'}
							component={'div'}
						>
							{Object.entries(labels).slice(11, 22).map((el, i) => {
								return <Stack
									key={el[0]}
									width={'calc((100% - 30px) / 3)'}
									children={
										<InputApp
											label={el[1]}
											value={checkedUser?.medcard?.[el[0]]}
										/>
									} />
							})}
						</Stack>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						direction={"column"}
						expandIcon={<ExpandMore />}
						xs={{ height: '100px' }}
					>
						<Typography>Трудовая деятельность и образование</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack
							className='panel'
							direction={'row'}
							flexWrap={'wrap'}
							overflow={'scroll'}
							gap={'15px'}
							component={'div'}
						>
							{Object.entries(labels).slice(22, 42).map((el, i) => {
								return <Stack
									key={el[0]}
									width={'calc((100% - 30px) / 3)'}
									children={
										<InputApp
											label={el[1]}
											value={checkedUser?.medcard?.[el[0]]}
										/>
									} />
							})}
						</Stack>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						direction={"column"}
						expandIcon={<ExpandMore />}
						xs={{ height: '100px' }}
					>
						<Typography>Жалобы при первичном осмотре</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack
							className='panel'
							direction={'row'}
							flexWrap={'wrap'}
							overflow={'scroll'}
							gap={'15px'}
							component={'div'}
						>
							{Object.entries(labels).slice(42, 45).map((el, i) => {
								return <Stack
									key={el[0]}
									width={'calc((100% - 30px) / 3)'}
								>
									<label>{el[1]}</label>
									<TextareaAutosize
										aria-label="minimum height"
										minRows={5}
										placeholder="Прописать через запятую"
										value={checkedUser?.medcard?.[el[0]]}
										style={{
											width: '100%',
											border: '1px solid #F1F0F3',
											background: '#F7F3F7',
											resize: 'none',
											padding: '14px',
										}}
									/>
								</Stack>
							})}
						</Stack>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						direction={"column"}
						expandIcon={<ExpandMore />}
						xs={{ height: '100px' }}
					>
						<Typography>Первое обследование беременной</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack
							className='panel'
							direction={'row'}
							flexWrap={'wrap'}
							overflow={'scroll'}
							gap={'15px'}
							component={'div'}
						>
							{Object.entries(labels).slice(45, 65).map((el, i) => {
								return <Stack
									key={el[0]}
									width={'calc((100% - 30px) / 3)'}
									children={
										<InputApp
											label={el[1]}
											value={checkedUser?.medcard?.[el[0]]}
										/>
									} />
							})}
						</Stack>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						direction={"column"}
						expandIcon={<ExpandMore />}
						xs={{ height: '100px' }}
					>
						<Typography>Назначения</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack
							className='panel'
							direction={'row'}
							flexWrap={'wrap'}
							overflow={'scroll'}
							gap={'15px'}
							component={'div'}
						>
							{Object.entries(labels).slice(65).map((el, i) => {
								return <Stack
									key={el[0]}
									width={'calc((100% - 30px) / 3)'}
									children={
										<InputApp
											label={el[1]}
											value={checkedUser?.medcard?.[el[0]]}
										/>
									} />
							})}
						</Stack>
					</AccordionDetails>
				</Accordion> */}
			</Stack>
		</Stack>
	)
}

export default MedCard