import { CircularProgress, Input, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconDownload from '../../../assets/icons/IconDownload'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
import styles from './Profile.module.css'
import mainStyles from './../../../styles/index.module.css'
import { addListNumber } from '../../../api/helperFunctions'

import axios from 'axios'
import { InputApp } from '../../../components/InputApp/InputApp'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const columns = [
	{ id: "number", label: "№", width: 35 },
	{ id: "analysis", label: "Анализ/Жалоба", minWidth: 'fit-content' },
	{
		id: "indicators",
		label: "Показатели",
		minWidth: '130px',
		width: 'fit-content'
	},
	{
		id: "description",
		label: "Описание",
		width: 200,
		minWidth: 'fit-content',
	},
];

export const CheckList = ({ checkListNumber, checkedUser }) => {
	// const [number, setNumber] = useState()
	const newDefaultValues = () => {
		// console.log(checkedUser?.checklist?.id === [checkListId])
		// console.log(checkListNumber);
	}
	newDefaultValues()
	// React-Hook-Form
	const { register, handleSubmit, control,
		formState: {
			errors,
			isDirty,
			isValid
		},
	} = useForm({
		// resolver: yupResolver(schema),
		defaultValues: {
			
		},
		mode: 'onChange'
	});
	const {user}=useSelector(state=>state.auth)
	const formatData = (arr) => {
		return arr?.map(({ question, answer, description }, i) => {
			return {
				number: addListNumber(i),
				analysis: question,
				indicators: answer,
				description: description,
			}
		})
	}

	// console.log(checkedUser?.checklist?.['0'])
	const [checkListId, setCheckListId] = useState()
	const [checkList, setCheckList] = useState([])
	useEffect(() => {
		const checkRow = checkedUser?.checklist?.[`${checkListNumber}`]
		const checkListArr = []
		for (let index = 0; index < checkRow?.question?.question?.length; index++) {
			checkListArr.push({
				question: checkRow?.question?.question[index]?.[`question${[index + 1]}`],
				answer: checkRow?.answer?.answer[index]?.[`answer${[index + 1]}`],
				description: checkRow?.answer?.answer[index]?.[`description${[index + 1]}`]
			})
			// console.log(checkRow?.question?.question[index]);
		}
		setCheckListId(checkedUser?.checklist?.[`${checkListNumber}`]?.id)
		setCheckList(formatData(checkListArr))
		// checkedUser?.checklist?.['0'].
	}, [checkedUser, checkListNumber])


	// const [data, setData] = useState([])
	const handleDownloadcheckList = async (id) => {
		try {
			const response = await axios.create({
				baseURL: 'https://med-tech.herokuapp.com/',
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.jwt_token}`,
					'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				},
				responseType: 'arraybuffer'
			})(
				`checklist/download/${checkListId}`
			);
			const url = URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${checkedUser?.last_name}-checklist.xlsx`); //or any other extension
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Stack
			className={styles.profile__content}
		>
			<Stack
				className={styles.profile__info_header}
				direction={'row'}
				justifyContent={'space-between'}
			>
				<Typography className={mainStyles.subtitle} component={'h3'} children={'Чек-лист'} />
				<Stack direction='row' gap='40px' justifyContent='flex-end'>
					<ButtonApp
						title='Скачать чек-лист'
						variant='outlined'
						endIcon={<IconDownload props='#68B7EC' />}
						style={{
							width: "fit-content",
							minWidth: 'fit-content',
							color: '#68B7EC'
						}}
						handleClick={() => handleDownloadcheckList(checkListId)}
					/>
					<ButtonApp title={"Сохранить"} variant={'contained'}
						style={{
							width: "fit-content",
							minWidth: '140px',
						}}
					/>
				</Stack>
			</Stack>
			{!checkedUser
				? <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={'100%'} height={'580px'}>
					<CircularProgress />
				</Stack>
				:
				<Stack className={styles.profile__table}>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table"
							sx={{
								height: 'max-content',
								paddingRight: '24px',
								overflowY: 'auto',
								borderCollapse: 'separate',
								borderSpacing: '0 1em',
							}}>
							<TableHead>
								<TableRow>
									{columns.map((column, i) => (
										<TableCell
											key={i}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody
								rows={1}
								columns={1}
								sx={{
									gap: '10px',
									borderCollapse: 'separate',
									borderSpacing: '1em',
								}}
							>
								{
									checkList?.length !== 0
										? checkList?.map((row, i) => (
											<TableRow key={i}
												sx={{
													borderCollapse: 'separate',
													borderSpacing: '1em',
												}}
											>
												{columns.map((column) => {
													const value = row[column.id]
													return (
														<TableCell key={column.id}
															sx={{
																width: '32%',
																background: '#F7F3F7',
																verticalAlign: 'baseline',
																':first-child': {
																	width: '4%',
																	borderTopLeftRadius: '10px',
																	borderBottomLeftRadius: '10px',
																},
																':last-child': {
																	maxWidth: '300px',
																	borderTopRightRadius: '10px',
																	borderBottomRightRadius: '10px',
																}
															}}
														>
															{/* number: addListNumber(i),
				analysis: question,
				indicators: answer,
				description: description */}
															{(user?.role === 'superadmin') && column.id !== 'number'
																?	
																// <input
																// 	{...register("First name")}
																// 	register={"question"}
																// 	defaultValue={value}
																// 	value={onChange}
																// 	// onChange={(e) => onChange(e.target.value)}
																// />
																<Controller
																name='question'
																control={control}
																render={({ field }) => (
																	<Input
																		variant={'standart'}
																		field={field}
																		value={value}
																		errors={errors}
																		/>
																)} />
																: (user?.role === 'doctor') && (column.id !== 'number')
																?	
																// <input
																// 	{...register("First name")}
																// 	register={"question"}
																// 	defaultValue={value}
																// 	value={onChange}
																// 	// onChange={(e) => onChange(e.target.value)}
																// />
																<Controller
																name='question'
																control={control}
																render={({ field }) => (
																	<Input
																		variant={'standart'}
																		field={field}
																		value={value}
																		errors={errors}
																		/>
																)} />
																: value}
														</TableCell>
													)
												})}
											</TableRow>
										))
										: null
								}
							</TableBody>
						</Table>
					</TableContainer>
				</Stack>
			}
		</Stack>
	)
}
