import {
	FormControl,
	MenuItem,
	Radio,
	Select,
	styled,
} from "@mui/material";

import React, { useState } from "react";
import styles from './Select.module.css';
import './Select.module.css'
import { showShortName } from "../../api/helperFunctions";
const CssSelect = styled(Select)({
	"&.MuiOutlinedInput-root": {
		borderWidth: "1px",
		borderColor: "#F1F0F3",
		"&:hover fieldset": {
			borderWidth: "1px",
			borderColor: "#68B7EC",
		},
		"&.Mui-focused fieldset": {
			borderWidth: "1px",
			borderColor: "#68B7EC",
		},
	},
});
export const SelectBtn = ({ label = 'Врач', values, radio = false, handleClick, getDoctorId}) => {

	const [name, setName] = useState('')
	const handleChange = (event) => {
		const docName = showShortName(event.target.value)
		setName(values[docName.id])
		getDoctorId(event.target.value.id)
	};
	const handleClickRole = (role) => {
		handleClick(role)
	}
	function showNames() {
		if (values !== null) {
			return values.map((val,i) => {
				return <MenuItem
					key={val?.id || i}
					className={styles.select__item}
					value={val}
					onClick={radio ? ()=>handleClickRole(val.role) : null}
				>
					{radio
						? <><Radio />{val.title}</>
						: showShortName(val)
					}
				</MenuItem>
			})
		}
	}
	return (
		<FormControl>
			<CssSelect
				className={styles.select}
				onChange={!radio ? handleChange : null}
				displayEmpty
				defaultValue={''}
			>
				<MenuItem value=''>{label}</MenuItem>
				{showNames()}
			</CssSelect>
		</FormControl>
	);
};
