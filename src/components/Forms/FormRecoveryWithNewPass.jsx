import { VisibilityOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { InputAppContainer } from "../InputApp/InputAppContainer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { icons } from "../../assets/icons";
import { Link } from "react-router-dom";
export const FormRecoveryWithNewPass = ({ prevStep }) => {
  return (
    <Box
      position="relative"
      maxWidth="400px"
      height="450px"
      width="calc(100% - 50px)"
      m="auto"
      p="25px"
      component="form"
      // onSubmit={nextStep}

      // onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        position="absolute"
        top="-100px"
        mt={"24px"}
        children={
          <ButtonApp
            variant="text"
            colorText="black"
            icon={icons.arrow}
            title="Назад"
            hover={false}
            prevStep={prevStep}
          />
        }
      />
      <Typography variant="h3" pb="40px">
        Восстоновление пароля
      </Typography>
      <Stack direction="column" spacing="20px" pb="60px">
        <InputAppContainer
          label="Новый пароль"
          type="password"
          // {...register("password")}
          icon={<VisibilityOutlined />}
        />
        <InputAppContainer
          label="Повторите новый пароль"
          type="password"
          // {...register("password")}
          icon={<VisibilityOutlined />}
        />
      </Stack>
		
        <ButtonApp
          // className='auth__button'
          variant="contained"
          title="Продолжить"
          type="submit"
					disabled={false}
					style={{
						height: '50px',
					}}
          // fullWidth={true}
        />
      
    </Box>
  );
};
