import React from "react";
import { Button, styled } from "@mui/material";
// import styles from './ButtonApp.module.css';

export const ButtonApp = ({
  title,
  type,
  variant,
  icon,
  disabled,
  colorText,
  hover,
	prevStep,
	nextStep,
	fullWidth = true,
	style
}) => {
  const CssButton = styled(Button)({
    textTransform: "capitalize",
		height: "50px",
		maxWidth: '400px',
		width: '100%',
    "&.MuiButton-contained": {
      background: "#68B7EC",
      boxShadow: "none",
      "&:disabled": {
        background: "#A8A8A8",
      },
      "&:hover": {
        opacity: .9,
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
			opacity: .9
    },
  });

  return (
    <CssButton
      type={type}
      variant={variant}
      fullWidth={true}
      height="50px"
      disabled={disabled}
      startIcon={icon}
      hover={hover}
			onClick={prevStep || nextStep}
			// sx={{ style }}
			
    >
      {title}
    </CssButton>
  );
};
