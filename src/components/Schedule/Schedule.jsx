import { Label } from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { SelectBtn } from "../Select/Select";
import { TableCustom } from "../TableCustom/TableCustom";
import style from './Schedule.module.css'
export const Schedule = () => {
	const names = [
		'Махмудходжаева. Д',
		'Паненко. Н',
		'Фралова А.Г',
		'Паненко. Н',
		'Пешнограй К. Р',
	]
  return (
    <section className={style.schedule}>
      <Typography
        component={"h3"}
        children={"Список запланированных встреч"}
        sx={{
          fontSize: "24px",
        }}
      />
      <Stack direction={'row'} gap={'20px'} marginBottom={'35px'} >
				<SelectBtn label={'Врач'} names={names} />
				<SelectBtn label={'Пациент'} names={names} />
      </Stack>
      <TableCustom />
    </section>
  );
};
