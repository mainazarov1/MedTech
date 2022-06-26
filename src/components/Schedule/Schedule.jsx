import { Stack, Typography } from "@mui/material";
import React from "react";
import { CalendarCustom } from "../Calendar/CalendarCustom";
import { SelectBtn } from "../Select/Select";
import { TableCustom } from "../TableCustom/TableCustom";
import style from "./Schedule.module.css";

export const Schedule = () => {
  const names = [
    "Махмудходжаева. Д",
    "Паненко. Н",
    "Фралова А.Г",
    "Паненко. Н",
    "Пешнограй К. Р",
	];
	
  return (
    <section className={style.schedule}>
      <Stack direction={{xs: 'column', lg: 'row'}} gap="20px">
				<Stack
					flexBasis={'100%'}
					flexShrink={1}
          sx={{
						background: "#FFFFFF",
						padding: '30px 25px',
						borderRadius: '10px',
						border: '1px solid #F1F0F3',
          }}
        >
          <Typography
            component={"h3"}
            children={"Список запланированных встреч"}
            sx={{
              fontSize: "24px",
            }}
          />
          <Stack direction="row" gap={"20px"} marginBottom={"35px"}>
            <SelectBtn label={"Врач"} names={names} />
            <SelectBtn label={"Пациент"} names={names} />
          </Stack>
          <TableCustom />
        </Stack>
				<Stack
					flexBasis={'400px'}
					flexGrow={'0'}
					flexShrink={'0'}
					direction={{xs: 'row', lg: 'column'}}
          sx={{
						background: "#FFFFFF",
						padding: '22px 20px',
						borderRadius: '10px',
						border: '1px solid #F1F0F3',
						gap: '50px 0',
          }}
        >
					<CalendarCustom />
					{/* <CalendarCustom /> */}
        </Stack>
      </Stack>
    </section>
  );
};
