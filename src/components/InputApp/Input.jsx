import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, Input, InputAdornment, Stack, styled, TextField } from "@mui/material";
import styles from "./InputApp.module.css";

// const CssTextField = styled(TextField)({
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
// 			borderColor: "#F1F0F3",
//     },
//     "&:hover fieldset": {
//       borderWidth: "1px",
//       borderColor: "#68B7EC",
//     },
//     "&.Mui-focused fieldset": {
//       borderWidth: "1px",
//       borderColor: "#68B7EC",
//     },
//   },
// });

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
			<input
				className={styles.input}
				hover={"true"}
				// InputProps={inputProps} 
				
				{...field}
				{...props}
			/>
			<div className={styles.input__message}
				style={{...props.errStyle}}
			>{errors?.[field.name]?.message}</div>
		</Stack>
	);
};
