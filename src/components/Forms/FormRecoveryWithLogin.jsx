import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { InputAppContainer } from "../InputApp/InputAppContainer";
import IconArrow from "../../assets/icons/IconArrow";
export const FormRecoveryWithLogin = ({prevStep, nextStep}) => {
  return (
		<Box
			position='relative'
			maxWidth="400px"
			height='450px'
      width="calc(100% - 50px)"
      m="auto"
      p="25px"
			component="form"
			onSubmit={nextStep}
    >
			<Stack
				position='absolute'
				top='-100px'
        mt={"24px"}
        children={
          <ButtonApp
						variant="text"
						colorText='black'
						startIcon={true}
            icon={<IconArrow props='#4C464B'/>}
						title="Назад"
						hover={false}
						prevStep={prevStep}
						style={{
							color: '#4C464B'
						}}
          />
        }
      />
      <Typography variant="h3" pb="40px">
        Восстоновление пароля
      </Typography>
      <Stack direction="column" spacing="20px" pb="60px">
        <InputAppContainer
          label="Логин"
          type="email"
          // {...register("email")}
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
