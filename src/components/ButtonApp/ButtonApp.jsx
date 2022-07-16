import React from "react";
import { Button, styled } from "@mui/material";
// import { style } from "@mui/system";
import styles from './ButtonApp.module.css';

export const ButtonApp = (
	{
		className,
		title,
		type,
		variant,
		startIcon,
		endIcon,
		icon,
		disabled,
		colorText,
		hover,
		step,
		toStep,
		style,
		iconWidth,
		fullWidth,
		isActive,
		handleClick
	}
) => {
	// const { height } = style; 
	// const CssButton = styled(Button)({
	//   textTransform: "capitalize",
	//   // height: height || "50px",
	//   // maxWidth: "400px",
	//   // width: "100%",
	// 	minWidth: 'fit-content',
	// 	textDecoration: 'none',
	//   "&.MuiButton-contained": {
	//     background: "#68B7EC",
	//     boxShadow: "none",
	//     "&:disabled": {
	//       background: "#A8A8A8",
	//     },
	//     "&:hover": {
	//       opacity: 0.9,
	//     },
	//   },
	//   "&.MuiButton-text": {
	//     color: colorText || "#68B7EC",
	//     background: "transparent",
	//     "&:active": {
	//       background: "transparent",
	//     },
	//     // '&:hover': {
	//     // 	background: 'transparent',
	//     // 	border: '1px solid #68B7EC'
	//     // }
	//   },
	//   "&.Mui-focusVisible": {
	//     opacity: 0.9,
	//   },
	// });
	// console.log('active: ', isActive)
	// console.log('icon: ',icon)

	return (
		<Button
			className={styles.btn + ' ' + className}
			type={type}
			variant={variant}
			fullWidth={true}
			disabled={disabled}
			startIcon={startIcon && icon
				// && <img src={icon} width={iconWidth}
				// 	style={{
				// 		fill: !isActive ? '#000' : '#fff'
				// 	}} />
			}
			endIcon={endIcon ? icon : null}
			hover={hover}
			onClick={(handleClick && (() => { handleClick(title) })) || (()=>toStep(step))}
			style={{
				...style
			}}
		// onClick={}
		>
			{title}
		</Button>
	);
};
