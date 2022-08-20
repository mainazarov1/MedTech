import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, Input, InputAdornment, Stack, styled, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import styles from "./InputApp.module.scss";

const CssTextField = styled(TextField)({
	"& .MuiOutlinedInput-root": {
		// height: '44px',
		"& fieldset": {
			borderColor: "#F1F0F3",
		},
		"&:hover fieldset": {
			borderWidth: "1px",
			borderColor: "#68B7EC",
		},
		"&.Mui-focused fieldset": {
			borderWidth: "1px",
			borderColor: "#68B7EC",
		},
	},
	"& .Mui-disabled": {
		"& input:disabled": {
			'WebkitTextFillColor': 'rgb(0,0,0)'
		},
	},
});

export const InputApp = ({
	label,
	field,
	errors,
	inputProps,
	...props
}) => {
	return (
		<Stack
			className={styles.input__container}
		>
			<label className={styles.label}>{label}</label>
			<CssTextField
				className={styles.input}
				hover={"true"}
				InputProps={inputProps}
				{...field}
				{...props}
				classes={{
					disabled: styles.disabled
				}}
			/>
			<div className={styles.input__message}
				style={{ ...props.errStyle }}
			>{errors?.[field.name]?.message}</div>
		</Stack>
	);
};
