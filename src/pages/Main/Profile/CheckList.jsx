import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconDownload from '../../../assets/icons/IconDownload'
import { ButtonApp } from '../../../components/ButtonApp/ButtonApp'
import { TableCustom } from '../../../components/TableCustom/TableCustom'
import styles from './Profile.module.css'
import mainStyles from './../../../styles/index.module.css'
import { addListNumber } from '../../../api/helperFunctions'
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
// const formatData = ({}) => {
// 	return {
// 		number: i,
// 		analysis: ,
// 		indicators: ,
// 		description: ,
// 	}
// }


export const CheckList = ({checkListNumber, checkedUser}) => {
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
	const [checkList, setcheckList] = useState([])
	useEffect(() => {
		const checkRow = checkedUser?.checklist?.[`${checkListNumber}`]
		const checkListArr = []
		for (let index = 0; index < checkRow?.question?.question?.length; index++) {
			checkListArr.push({
				question: checkRow?.question?.question[index]?.[`question${[index+1]}`],
				answer: checkRow?.answer?.answer[index]?.[`answer${[index + 1]}`],
				description: checkRow?.answer?.answer[index]?.[`description${[index + 1]}`]
			})
			// console.log(checkRow?.question?.question[index]);
		}
		setcheckList(formatData(checkListArr))
		// checkedUser?.checklist?.['0'].
	},[checkedUser, checkListNumber])
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
					/>
					<ButtonApp title={"Сохранить"} variant={'contained'}
						style={{
							width: "fit-content",
							minWidth: '140px',
						}}
					/>
				</Stack>
			</Stack>
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
		</Stack>
	)
}
