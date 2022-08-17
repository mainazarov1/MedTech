import {
	CircularProgress,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import IconInfo from "../../assets/icons/IconInfo";
import { images } from "../../assets/images";
import styles from './TableCustom.module.css'
export const TableCustom = ({ columns, rows, handleClick, getData, radio }) => {
	const [data, setData] = useState([])
	const { user } = useSelector((state) => state.auth);
	const { isLoading } = useSelector(state => state.appointment)
	const clickAppointment = (value) => {
		handleClick(value);
		getData(value)
	}
	useEffect(() => {
		setData(rows)
	}, [rows])
	function getRowsData() {
		return data?.map((row, i) => (
			<TableRow key={i}
				style={{
					height: 'max-content'
				}}
			>
				{columns.map((column) => {
					const value = row[column.id];
					return (
						<TableCell
							className={styles.table__row}
							key={column.id}
							style={{
								width: column?.width,
								minWidth: column?.minWidth,
								maxWidth: column?.maxWidth,
							}}
						>
							{value}
							{column.id === 'option'
									? <button className={styles.table__btn}
										onClick={radio ? () => handleClick(row) : () => clickAppointment(row)}>
										{radio
												? <Switch checked={row.active} disabled={user?.role === 'doctor'} />
												: <IconInfo />}</button>
									: null}
						</TableCell>
					);
				})}
			</TableRow>
		))
	}
	function emptyData() {
		return (<TableRow key={1}
			style={{
				height: '100%',
				width: '100%'
			}}>
			<TableCell
				colSpan={columns.length - 1}
				style={{
					border: 0,
					background: data?.length === 0 ? `url(${images.list}) center center no-repeat` : 'none',
					backgroundSize: '500px'
				}}
			>
			</TableCell>
		</TableRow>
		)
	}
	return (
		<TableContainer
			className={styles.table__container}
		>
			<Table
				stickyHeader aria-label="sticky table"
				sx={{
					height: (data.length !== 0) ? 'max-content' : '100%',
					paddingRight: '24px',
					overflowY: 'auto'
				}}
			>
				<TableHead width={"100%"}>
					<TableRow width={"100%"}>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								style={{
									padding: "15px 10px",
									width: column.width,
									minWidth: column.minWidth,
									maxWidth: column.maxWidth,
									borderBottom: '1px solid #4C464B',
								}}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody
					style={{
						overflowY: 'scroll',
						height: '100%',
					}}
					rows={1}
					columns={1}
				>
					{
						isLoading
							?
							<TableRow>
								<TableCell
									colSpan={columns.length - 1}
									style={{
										border: "0",
										height: '100%'
									}}
								>
									<CircularProgress style={{
										display: 'block',
										position: 'realtive',
										margin: 'auto'
									}} />
								</TableCell>
							</TableRow>
							: data.length !== 0
								? getRowsData()
								: emptyData()
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
