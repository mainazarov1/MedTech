import { Stack, Typography } from '@mui/material'
import React from 'react'
import IconDownload from '../../assets/icons/IconDownload'
import { ButtonApp } from '../../components/ButtonApp/ButtonApp'
import { SelectBtn } from '../../components/Select/Select'
import { TableCustom } from '../../components/TableCustom/TableCustom'

const Users = () => {
	const roles = [
		"Администратор",
		"Супер администратор",
		"Пациент",
		"Врач",
	];
	const names = [
    "Махмудходжаева. Д",
    "Паненко. Н",
    "Фралова А.Г",
    "Паненко. Н",
    "Пешнограй К. Р",
	];	const columns = [
		{ id: "number", label: "№", width: 35 },
		{ id: "doctor", label: "ФИО врача", minWidth: 150 },
		{
			id: "patient",
			label: "ФИО пациента",
			minWidth: 150,
			format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "date",
			label: "Дата",
			minWidth: 100,
			format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "time",
			label: "Время",
			width: 100,
			format: (value) => value.toFixed(2),
		},
		{
			id: 'option',
			label: '',
			width: 20,
		}
	];
	function createData(number, doctor, patient, date, time) {
		return { number, doctor, patient, date, time };
	}
	const rows = [
		createData("001", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
		createData(
			"002",
			"Махмудходжаева. Д",
			"Мансурова А.П",
			"13.05.2022",
			"09:50"
		),
		createData("003", "Паненко. Н", "Мансурова А.П", "13.05.2022", "09:50"),
		createData("004", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
		createData(
			"005",
			"Махмудходжаева. Д",
			"Мансурова А.П",
			"13.05.2022",
			"09:50",
		),
		createData("006", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
		createData("001", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
		createData(
			"002",
			"Махмудходжаева. Д",
			"Мансурова А.П",
			"13.05.2022",
			"09:50"
		),
		createData("003", "Паненко. Н", "Мансурова А.П", "13.05.2022", "09:50"),
		createData("004", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
		createData(
			"005",
			"Махмудходжаева. Д",
			"Мансурова А.П",
			"13.05.2022",
			"09:50",
		),
		createData("006", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
	];
	return (
		<section>
			{/* <Stack direction={{ xs: 'column', lg: 'row' }} gap="20px"> */}
			<Stack
				flexBasis={'100%'}
				// flexShrink={1}
				sx={{
					background: "#FFFFFF",
					padding: '30px 25px',
					borderRadius: '10px',
					border: '1px solid #F1F0F3',
				}}
			>
				<Typography
					component={"h3"}
					children={"Список запланированных встреч"}
					sx={{
						fontSize: "24px",
					}}
				/>
				<Stack
					direction="row"
					gap='20px'
					marginBottom='35px'
					justifyContent='space-between'
				>
					<SelectBtn label={"Врач"} values={names} />
					<Stack direction='row' gap='40px' justifyContent='flex-end'>
						<ButtonApp
							title='Скачать список'
							variant='outlined'
							endIcon={true}
							icon={<IconDownload props='#68B7EC' />}

							iconWidth="22px"
							hover={""}
							fullWidth={false}
							style={{
								width: "fit-content",
								height: "44px",
								color: '#68B7EC'
							}}
						/>
						<SelectBtn label={"Пациент"} values={roles} width='fit-content' />
					</Stack>
				</Stack>
				<TableCustom columns={columns} rows={rows} radio={true} />
			</Stack>
			{/* </Stack> */}
		</section>
	)
}

export default Users