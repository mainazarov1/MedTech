import { ArrowDownward } from "@mui/icons-material";
import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Radio,
	Select,
	Typography,
} from "@mui/material";
import React, { useState } from "react";

export const SelectBtn = ({ label, values, radio = false }) => {
	const [name, setName] = useState("");
	const handleChange = (event) => {
		setName(event.target.value);
	};
	function showNames() {
		return values.map((el, i) => {
			return (
				<MenuItem key={i} value={el}>
					{radio
						? <Radio /> + el
						: el
					}
				</MenuItem>
			);
		});
	}
	return (
		<FormControl>
			{/* {!name ? <InputLabel id="select-label">{label}</InputLabel> : ""} */}
			<Select
				// placeholder={label}
				value={name}
				onChange={handleChange}
				displayEmpty
				inputProps={{ 'aria-label': 'Without label' }}
				sx={{
					background: "#F7F3F7",
					width: "200px",
					height: "44px",
					border: "1px solid #F1F0F3",
					borderRadius: "4px",
					color: "black",
				}}
			// IconComponent={<ArrowDownward/>}
			>
				<MenuItem value=''>{label}</MenuItem>
				{showNames()}
			</Select>
		</FormControl>
	);
};
