import { VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  createTheme,
  Input,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { InputAppContainer } from "../InputApp/InputAppContainer";

// theme.typography.h3 = {
//   fontSize: "1.2rem",
//   "@media (min-width:600px)": {
//     fontSize: "1.5rem",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "2.4rem",
//   },
// };
let theme = createTheme();
theme = responsiveFontSizes(theme);

export const FormSignIn = ({ nextStep }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   // formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);
  // console.log(errors);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
		nextStep();
  };
  return (
    <Box
      maxWidth="400px"
      width="calc(100% - 50px)"
      height="450px"
      m="auto"
      p="25px"
      component="form"
      onSubmit={nextStep}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <ThemeProvider theme={theme}>
        <Typography variant="h3" pb="40px">
          Вход
        </Typography>
      </ThemeProvider>
      <Stack direction="column" spacing="20px" pb="60px">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            <InputAppContainer
              {...field}

              // {...register("email")}
            />;
          }}
        ></Controller>
        {/* <Input /> */}
        <InputAppContainer
          label="Логин"
          type="email"
          required={true}
          // {...register("email")}
        />
        <InputAppContainer
          label="Пароль"
          type="password"
          // {...register("password")}
          icon={<VisibilityOutlined />}
        />
      </Stack>
      <Link
        to={"manual"}
        style={{
          textDecoration: "none",
        }}
      >
        <ButtonApp
          // className='auth__button'
          variant="contained"
          title="Войти"
          type="submit"
          fullWidth={true}
          disabled={false}
          width={"100%"}
          style={{
            height: "50px",
          }}
        />
      </Link>
      <Stack
				mt={"24px"}
				alignItems='center'
        children={
					<ButtonApp
            variant="text"
            title="Забыли пароль?"
            fullWidth="false"
            nextStep={nextStep}
          />
        }
      />
    </Box>
  );
};
