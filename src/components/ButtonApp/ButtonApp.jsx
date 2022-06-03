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
}) => {
  const CssButton = styled(Button)({
    textTransform: "capitalize",
    height: "50px",
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
      background: "red",
    },
  });

  return (
    <CssButton
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      height="50px"
      disabled={disabled}
      startIcon={icon}
      hover={hover}
      onClick={prevStep || nextStep}
    >
      {title}
    </CssButton>
  );
};
