import { CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconDownload from '../../../assets/icons/IconDownload'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
import styles from './Profile.module.css'
import mainStyles from './../../../styles/index.module.css'
import { addListNumber } from '../../../api/helperFunctions'

import axios from 'axios'

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
				? <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={'100%'} height={'600px'}>
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
									checkList.length !== 0
										? checkList.map((row, i) => (
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
															{value ? value : 'Введите показатели'}
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
