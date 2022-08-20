import React from "react";
import { Button, styled } from "@mui/material";
// import { style } from "@mui/system";
import styles from './ButtonApp.module.css';

export const ButtonApp = (
	{
		className = '',
		title,
		startIcon = false,
		endIcon = false,
		style,
		handleClick,
		...props
	}
) => {
	return (
		<Button
			className={styles.btn + ' ' + className}
			fullWidth={true}
			startIcon={startIcon}
			endIcon={endIcon}
			onClick={handleClick}
			style={{
				...style
			}}
			{...props}
		>
			{title}
		</Button>
	);
};
