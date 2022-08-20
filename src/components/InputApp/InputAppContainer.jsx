import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { InputApp } from "./InputApp";
import styles from "./InputApp.module.css";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
export const InputAppContainer = ({ type, ...props }) => {
	const [passwordShow, setPasswordShow] = useState(false)
	const togglePassword = (e) => {
		e.preventDefault();
		setPasswordShow(!passwordShow);
	}
	return (
		<>
			<InputApp
				type={passwordShow ? 'text' : 'password'}
				inputProps={{
					endAdornment: (
						<InputAdornment onClick={togglePassword} position='end' >
							<IconButton
								className={styles.icon}
								aria-label="toggle password visibility"
								edge="end"
							>
								{passwordShow
									? <VisibilityOutlined />
									: <VisibilityOffOutlined />}
							</IconButton>
						</InputAdornment>
					)
				}}
				{...props} />
		</>
	);
};
