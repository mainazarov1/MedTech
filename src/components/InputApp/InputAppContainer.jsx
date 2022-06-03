import { Stack } from "@mui/material";
import { useState } from "react";
import { InputApp } from "./InputApp";
import style from "./InputApp.module.css";
export const InputAppContainer = ({ label, type, icon, ...props }) => {
	const [passwordShow, setPasswordShow] = useState(false)
	const handleClick = (e) => {
		e.preventDefault();
		setPasswordShow(!passwordShow);

	}
  return (
    <Stack spacing="6px">
      <label className={style.label}>{label}</label>
      <InputApp type={passwordShow ? 'password' : 'text'} icon={icon} showPassword={passwordShow} handleClick={handleClick} props={props} />
    </Stack>
  );
};
