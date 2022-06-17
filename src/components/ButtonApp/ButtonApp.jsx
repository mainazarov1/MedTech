import React from "react";
import { Button, styled } from "@mui/material";
// import { style } from "@mui/system";
// import styles from './ButtonApp.module.css';

export const ButtonApp = (
  {
    title,
    type,
    variant,
    icon,
    disabled,
    colorText,
    hover,
    prevStep,
    nextStep,
		style,
		iconWidth,
		fullWidth
  }
) => {
	// const { height } = style; 
  const CssButton = styled(Button)({
    textTransform: "capitalize",
    // height: height || "50px",
    // maxWidth: "400px",
    // width: "100%",
		minWidth: 'fit-content',
		textDecoration: 'none',
    "&.MuiButton-contained": {
      background: "#68B7EC",
      boxShadow: "none",
      "&:disabled": {
        background: "#A8A8A8",
      },
      "&:hover": {
        opacity: 0.9,
      },
    },
    "&.MuiButton-text": {
      color: colorText || "#68B7EC",
      background: "transparent",
      "&:active": {
        background: "transparent",
      },
      // '&:hover': {
      // 	background: 'transparent',
      // 	border: '1px solid #68B7EC'
      // }
    },
    "&.Mui-focusVisible": {
      opacity: 0.9,
    },
  });

	return (
		<CssButton
			type={type}
			variant={variant}
			fullWidth={true}
			// height="50px"
			disabled={disabled}
			startIcon={
				icon && <img src={icon} width={iconWidth} />
			}
      hover={hover}
			onClick={prevStep || nextStep}
			style={{
				...style
			}}
			// onClick={}
    >
      {title}
    </CssButton>
  );
};
