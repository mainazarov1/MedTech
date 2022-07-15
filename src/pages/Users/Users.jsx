import { Stack, Typography } from '@mui/material'
import React from 'react'
import IconDownload from '../../assets/icons/IconDownload'
import { ButtonApp } from '../../components/ButtonApp/ButtonApp'
import { SelectBtn } from '../../components/Select/Select'
import { TableCustom } from '../../components/TableCustom/TableCustom'
import styles from './Users.module.scss'
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
		{ id: "doctor", label: "ФИО врача", minWidth: 200 },
		{
			id: "phone",
			label: "Номер телефона",
			minWidth: 200,
			// format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "email",
			label: "Электронная почта",
			minWidth: 250,
			// format: (value) => value.toLocaleString("en-US"),
		},
		{
			id: "patients",
			label: "Пациенты",
			width: 150,
			format: (value) => value.toFixed(2),
		},
		{
			id: 'workshift',
			label: 'График работы',
			width: 100,
		},
		{
			id: 'option',
			label: '',
			width: 20,
		}
	];
	function createData(number, doctor, phone, email, patients, workshift, option) {
		return { number, doctor, phone, email, patients, workshift, option };
	}
	const rows = [
		createData("001", "Сабиров Ш.И", '+996 707 073 306', "sabirov@gmail.com", "30 пациетов", "Пн Вт Ср Чт Пт"),
		createData("002", "Махмудходжаева. Д", '+996 707 073 306', "dilara12@gmail.com", "23 пациетов", "Пн Вт Ср Чт Пт"),
		createData("003", "Мансурова А.П", '+996 707 073 306', "mansurov.kg@gmail.com", "13 пациетов", "Пн Вт Ср Чт Пт"),
		createData("004", "Паненко. Н", '+996 707 073 306', "panenko.n@gmail.com", "33 пациетов", "Пн Вт Ср Чт Пт"),
		createData("005", "Сабиров Ш.И", '+996 707 073 306', "sabirov@gmail.com", "30 пациетов", "Пн Вт Ср Чт Пт"),
		createData("006", "Махмудходжаева. Д", '+996 707 073 306', "dilara12@gmail.com", "23 пациетов", "Пн Вт Ср Чт Пт"),
		createData("007", "Мансурова А.П", '+996 707 073 306', "mansurov.kg@gmail.com", "13 пациетов", "Пн Вт Ср Чт Пт"),
		createData("008", "Паненко. Н", '+996 707 073 306', "panenko.n@gmail.com", "33 пациетов", "Пн Вт Ср Чт Пт"),
		createData("009", "Сабиров Ш.И", '+996 707 073 306', "sabirov@gmail.com", "30 пациетов", "Пн Вт Ср Чт Пт"),
		createData("010", "Махмудходжаева. Д", '+996 707 073 306', "dilara12@gmail.com", "23 пациетов", "Пн Вт Ср Чт Пт"),
		createData("011", "Мансурова А.П", '+996 707 073 306', "mansurov.kg@gmail.com", "13 пациетов", "Пн Вт Ср Чт Пт"),
		createData("012", "Паненко. Н", '+996 707 073 306', "panenko.n@gmail.com", "33 пациетов", "Пн Вт Ср Чт Пт"),
	];
	return (
		<section className={styles.users}>
			{/* <Stack direction={{ xs: 'column', lg: 'row' }} gap="20px"> */}
			<Stack
				className={styles.users__wrapper}
				flexBasis={'100%'}
			>
				<Typography
					component={"h3"}
					children={"Список пользователей"}
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
						<SelectBtn label={"Добавить пользователя"} values={roles} radio={true} />
					</Stack>
				</Stack>
				<TableCustom columns={columns} rows={rows} radio={true} />
			</Stack>
			{/* </Stack> */}
		</section>
	)
}

export default Users