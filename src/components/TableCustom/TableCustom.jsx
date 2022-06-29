import {
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import { icons } from "../../assets/icons";
import { images } from "../../assets/images";
import styles from './TableCustom.module.css'
export const TableCustom = ({columns,rows}) => {
	
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
				maxHeight: calcHeight(360),
				"&::-webkit-scrollbar": {
					width: 8,
					height: '10vh',
				},
				"&::-webkit-scrollbar-track": {
					backgroundColor: "#F1F0F3",
					borderRadius: 12,
					height: '10vh'
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#CDC5CB",
					borderRadius: 12,
					height: '10vh'
				}
			}}
		>
			<Table
				stickyHeader aria-label="sticky table"
				sx={{
					// height: calcHeight(500),
					height: 'max-content',
					paddingRight: '24px',
					overflowY: 'auto'
				}}
			>
				<TableHead width={"100%"}>
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
				<TableBody
					style={{
						// width: '100%',
						// background: rows.length === 0 ? `url(${images.list}) center center no-repeat` : 'none',
						// backgroundSize: 'cover'
						overflowY: 'scroll',

					}}
					rows={1}
					columns={1}
				>
					{
						rows.length !== 0
							?
							rows.map((row) => {
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
													{column.id === 'option' ? <button className={styles.tableBtn} onClick={() => alert('clicked option button')}><img src={icons.dots} alt={column.id} /></button> : null}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
							: <TableRow key={1}
							>
								<TableCell
									colSpan='5'
									style={{
										border: 0,
										background: rows.length === 0 ? `url(${images.list}) center center no-repeat` : 'none',
									}}
									height='300px'
								>
									{/* <img src={images.list} alt='s' style={{
										height: '100%',
										width: 'auto',
										// background: 'red',
										top: '0',
										left: '-50%',
										transform: 'translate(50%,30%)',
									}} /> */}
								</TableCell>
							</TableRow>
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
