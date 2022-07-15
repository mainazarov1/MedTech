import { Stack, Typography } from "@mui/material";
import React from "react";
import { CalendarCustom } from "../Calendar/CalendarCustom";
import { SelectBtn } from "../Select/Select";
import { TableCustom } from "../TableCustom/TableCustom";
import style from "./Schedule.module.css";

export const Schedule = () => {
	const names = [
		"Махмудходжаева. Д",
		"Паненко. Н",
		"Фралова А.Г",
		"Паненко. Н",
		"Пешнограй К. Р",
	];

	const columns = [
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
		createData("007", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
		createData(
			"008",
			"Махмудходжаева. Д",
			"Мансурова А.П",
			"13.05.2022",
			"09:50"
		),
		createData("009", "Паненко. Н", "Мансурова А.П", "13.05.2022", "09:50"),
		createData("010", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
		createData(
			"011",
			"Махмудходжаева. Д",
			"Мансурова А.П",
			"13.05.2022",
			"09:50",
		),
		createData("012", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
	];
	return (
		<section className={style.schedule}>
			<Stack direction={{ xs: 'column', lg: 'row' }} gap="20px">
				<Stack
					flexBasis={'100%'}
					flexShrink={1}
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
					<Stack direction="row" gap={"20px"} marginBottom={"35px"}>

						<SelectBtn label={"Врач"} values={names} />
						<SelectBtn label={"Пациент"} values={names} />
					</Stack>
					<TableCustom columns={columns} rows={rows} />
				</Stack>
				<Stack
					flexBasis={'400px'}
					flexGrow={'0'}
					flexShrink={'0'}
					direction={{ xs: 'row', lg: 'column' }}
					sx={{
						background: "#FFFFFF",
						padding: '22px 20px',
						borderRadius: '10px',
						border: '1px solid #F1F0F3',
						gap: '50px 0',
					}}
				>
					<CalendarCustom />
				</Stack>
			</Stack>
		</section>
	);
};
