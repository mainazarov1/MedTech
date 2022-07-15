import {
	FormControl,
	FormControlLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
} from "@mui/material";
import React, { useState } from "react";
import styles from './Select.module.css';

export const SelectBtn = ({ label, values, radio = false }) => {
	const [name, setName] = useState("");
	const handleChange = (event) => {
		setName(event.target.value);
	};
	function handleClick(item) {
		return alert(`Add New ${item}`)
	}
	function showNames() {
		return values.map((el, i) => (
			<MenuItem key={i} value={el}
				onClick={radio && (() => { handleClick(el) })}
			>
				{radio
					? <><Radio />{el}</>
					: el
				}
			</MenuItem>
		))
	}
	// function showRoles() {
	// 	return (
	// 		<RadioGroup>
	// 			{values.map((el, i) => (
	// 					<FormControlLabel key={i} value={el} label={el} control={<Radio />} ></FormControlLabel>
	// 			))}
	// 		</RadioGroup>
	// 	)
	// }
	return (
		<FormControl>
			{/* {!name ? <InputLabel id="select-label">{label}</InputLabel> : ""} */}
			<Select
				className={styles.select}
				// placeholder={label}
				value={name}
				onChange={!radio && handleChange}
				displayEmpty
			// input={<InputApp/>}
			// inputProps={{ 'aria-label': 'Without label' }}
			// sx={{
			// 	background: "#F7F3F7",
			// 	width: "200px",
			// 	height: "44px",
			// 	border: "1px solid #F1F0F3",
			// 	borderRadius: "4px",
			// 	color: "black",
			// }}
			// IconComponent={<ArrowDownward/>}
			>
				<MenuItem value=''>{label}</MenuItem>
				{showNames()}
			</Select>
		</FormControl>
	);
};
