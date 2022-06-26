import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import { icons } from "../../assets/icons";
import styles from './TableCustom.module.css'
export const TableCustom = () => {
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
	const calcHeight = (px) => {
		const windowHeight = window.innerHeight;
		const height = windowHeight - px;
		console.log(height)
		return height
	}
	return (
		<TableContainer
			className={styles.tableContainer}
			sx={{
				height: calcHeight(360),
			}}
		>
			<Table
				stickyHeader aria-label="sticky table"
				sx={{
					height: calcHeight(500),
					paddingRight: '24px'
				}}
			>
				<TableHead width={"100%"}

				>
					{/* <TableRow>
            <TableCell>№</TableCell>
            <TableCell>ФИО врача</TableCell>
            <TableCell>ФИО пациента</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Время</TableCell>
					</TableRow> */}
					<TableRow width={"100%"}>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								// align={column.align}
								style={{
									// top: 57,
									padding: "15px 10px",
									width: column.width,
									minWidth: column.minWidth,
									maxWidth: column.maxWidth,
									borderBottom: '1px solid #4C464B'
								}}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
						return (
							<TableRow key={row.number}>
								{columns.map((column) => {
									const value = row[column.id];
									return (
										<TableCell
											key={column.id}
											style={{
												// top: 57,
												padding: "15px 10px",
												width: column.width,
												minWidth: column.minWidth,
												maxWidth: column.maxWidth,
												borderBottom: 'none'
											}}
										>
											{value}
											{column.id === 'option' ? <button className={styles.tableBtn} onClick={()=>alert('clicked option button')}><img src={icons.dots} alt={column.id} /></button> : null}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
