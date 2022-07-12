import { Stack } from "@mui/material";
import { useState } from "react";
import { InputApp } from "./InputApp";
import style from "./InputApp.module.css";
export const InputAppContainer = ({ label, type, icon, field, rules, ...props }) => {
	const [passwordShow, setPasswordShow] = useState(false)
	const handleClick = (e) => {
		e.preventDefault();
		setPasswordShow(!passwordShow);
	}
	console.log(field);
  return (
    <Stack spacing="6px">
      <label className={style.label}>{label}</label>
			<InputApp field={field}
				type={passwordShow ? 'password' : 'text'} icon={icon} showPassword={passwordShow} handleClick={handleClick} props={props} />
    </Stack>
  );
};
