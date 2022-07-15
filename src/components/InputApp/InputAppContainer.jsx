import { Stack } from "@mui/material";
import { useState } from "react";
import { InputApp } from "./InputApp";
import styles from "./InputApp.module.css";
export const InputAppContainer = ({ label, type, icon, field, rules,errors, ...props }) => {
	const [passwordShow, setPasswordShow] = useState(false)
	const handleClick = (e) => {
		e.preventDefault();
		setPasswordShow(!passwordShow);
	}
	return (
		<Stack
			className={styles.input__container}
			spacing="6px">
			<label className={styles.label}>{label}</label>
			<InputApp field={field}
				type={passwordShow ? 'password' : 'text'} icon={icon} showPassword={passwordShow} handleClick={handleClick} props={props} />
			<div className={styles.input__message}
			>{errors?.[field.name]?.message}</div>
		</Stack>
	);
};
